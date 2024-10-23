import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const getPdf = async (url) => {

	chromium.setHeadlessMode = true;
  	chromium.setGraphicsMode = false;

	const options = {
        args: chromium.args,
		defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        ignoreHTTPSErrors: true,
		headless: chromium.headless,
    };
	try {
		const browser = await puppeteer.launch(options);

		const page = await browser.newPage();

		await page.goto(url, { waitUntil: 'networkidle2', timeout: 8000 });

		await page.emulateMediaType('screen');

		await page.evaluate((selector) => {
			var elements = document.querySelectorAll(selector);
			for(var i=0; i< elements.length; i++){
				elements[i].parentNode.removeChild(elements[i]);
			}
		}, 'button');

		const buffer = await page.pdf({
			format: 'A4',
			displayHeaderFooter: false,
			printBackground: true
		});

		await browser.close();

		return buffer;
	} catch (error) {
		console.error(error);
	}
}