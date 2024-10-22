import { chromium } from "playwright";

const main = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const resumeUrl = "http://localhost:5173";

  await page.goto(resumeUrl, { waitUntil: "networkidle" });

  await page.emulateMedia({ media: "screen" });

  await page.pdf({
    path: "static/resume.pdf",
    printBackground: false,
  });

  return browser.close();
};

main();