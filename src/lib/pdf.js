import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export const getPdf = async (url) => {

	const options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    };
	const browser = await puppeteer.launch(options);

	const page = await browser.newPage();

	await page.goto(url, { waitUntil: 'networkidle2', timeout: 8000 });

	await page.evaluate(async () => {
		await new Promise((resolve) => {
			let totalHeight = 0
			const distance = 100
			const timer = setInterval(() => {
				const scrollHeight = document.body.scrollHeight
				window.scrollBy(0, distance)
				totalHeight += distance

				if (totalHeight >= scrollHeight) {
					clearInterval(timer)
					resolve()
				}
			}, 5)
		})
	});

	await page.emulateMediaType('screen');
	const buffer = await page.pdf({
		format: 'A4',
		displayHeaderFooter: false,
		printBackground: true
	});

	await browser.close();

	return buffer;
}