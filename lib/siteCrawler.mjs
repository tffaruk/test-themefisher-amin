import axios from "axios";
import dotnenv from "dotenv";
import fs from "fs";
import puppeteer from "puppeteer";
dotnenv.config();
const Token = process.env.NEXT_PUBLIC_TOKEN;
const crawlerLogPath = "./crawler-log.json";

// Check if the log file exists
fs.access(crawlerLogPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(crawlerLogPath, JSON.stringify([]), "utf8", (err) => {
      if (err) {
        console.error("Error creating file:", err);
        return;
      }
    });
  }
});

// main funtion delayed 1s for creating crawler log
setTimeout(() => {
  const Axios = axios.create({
    baseURL: "https://gethugothemes-backend.vercel.app/",
    // "https://test-db-sl6v.vercel.app/",
    // "http://localhost:4000/",
    headers: {
      authorization: `Bearer ${Token}`,
      "Accept-Encoding": "gzip,deflate,compress",
      "Content-Type": "application/json",
    },
  });

  // read crawler logs
  const crawlerLog = fs.readFileSync(crawlerLogPath, "utf8");
  console.log("Skipping:", crawlerLog);

  const getShowcase = async () => {
    const data = await Axios.get("showcase");
    const { result } = data.data;

    return result.filter((item) => !crawlerLog.includes(item.website));
  };

  //insert and delete showcase
  const postDeletedShowcase = (url, generator, theme, status) => {
    Axios.post("deleted-showcase", {
      website: url,
      generator: generator,
      theme: theme,
      status: status,
    });
  };

  const getMetaData = async (url, theme) => {
    try {
      const browser = await puppeteer.launch({
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      });

      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 0,
      });

      try {
        const generator = await page.evaluate(() => {
          return document
            .querySelector('meta[name="generator"]')
            .getAttribute("content");
        });

        if (generator.includes("Hugo") || generator.includes("Academia")) {
          console.log("Found:", url, "--by:", theme);

          // Read the crawler log file
          fs.readFile(crawlerLogPath, "utf8", (err, result) => {
            if (err) {
              console.log("Error reading file from disk:", err);
              return;
            }
            try {
              const logs = JSON.parse(result);
              logs.push(url);
              const stringifyLogs = JSON.stringify(logs);

              // Write the crawler log to the file
              fs.writeFile(crawlerLogPath, stringifyLogs, "utf8", (err) => {
                if (err) {
                  console.error("Error writing file:", err);
                  return;
                }
              });
            } catch (err) {
              console.log("Error parsing JSON string:", err);
            }
          });
        } else {
          console.log("Other Generator Found:", url, "--by:", theme);
          postDeletedShowcase(url, generator, theme, "moved");
        }
      } catch (error) {
        console.log("No Generator Found:", url, "--by:", theme);
        postDeletedShowcase(url, "custom", theme, "moved");
      }

      await browser.close();
    } catch {
      console.log("Not Exist:", url, "--by:", theme);
      postDeletedShowcase(url, "", theme, "not exist");
      return false;
    }
  };

  const getAllMetaData = async () => {
    const showcaseData = await getShowcase();

    for (const showcase of showcaseData) {
      await getMetaData(showcase.website, showcase.theme);
    }
  };

  getAllMetaData();
}, 1000);
