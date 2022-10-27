const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe("paragraph text", () => {
  it("should have underlined text", async () => {
    const title = await page.$("u");
    expect(title).not.toBeNull();
  });
});

describe("paragraph text", () => {
  it("should have emphasized text", async () => {
    const heading = await page.$("em");
    expect(heading).not.toBeNull();
  });
});

describe("paragraph text", () => {
  it("should have text that has been stuck through", async () => {
    const paragraph = await page.$("s");
    expect(paragraph).not.toBeNull();
  });
});

describe("paragraph text", () => {
  it("should have bold text", async () => {
    const paragraph = await page.$("strong");
    expect(paragraph).not.toBeNull();
  });
});
