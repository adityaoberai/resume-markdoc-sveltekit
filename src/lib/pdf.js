import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const getPdf = async (url) => {

	chromium.setHeadlessMode = true;
  	chromium.setGraphicsMode = false;

	const chromeArgs = [
		'--font-render-hinting=none', // Improves font-rendering quality and spacing
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--disable-gpu',
		'--disable-dev-shm-usage',
		'--disable-accelerated-2d-canvas',
		'--disable-animations',
		'--disable-background-timer-throttling',
		'--disable-restore-session-state'
	];

	const options = {
        args: chromeArgs,
        executablePath: await chromium.executablePath(),
        ignoreHTTPSErrors: true,
		headless: true,
    };
	try {
		const browser = await puppeteer.launch(options);

		const page = await browser.newPage();

		await page.goto(url, { waitUntil: 'networkidle2', timeout: 8000 });

		await page.emulateMediaType('screen');
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