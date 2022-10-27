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

describe("the webpage", () => {
  it("should contain a table", async () => {
    const tables = await page.$$("table");
    expect(tables.length).toBe(1);
  });
});

describe("the table", () => {
  it("should contain a header row with three columns", async () => {
    const headerRows = await page.$$("tr > th");
    expect(headerRows.length).toBe(3);
  });
  it("should contain two rows of data", async () => {
    const headerRows = await page.$$("tr > td");
    expect(headerRows.length).toBe(6);
  });
});
