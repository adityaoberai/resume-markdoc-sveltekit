const playwright = require("playwright-aws-lambda");

const main = async () => {
	const browser = await playwright.launchChromium({
		headless: true
	});

	const context = await browser.newContext();

	const page = await context.newPage();

	const url = 'http://localhost:5173';
	console.log('url', url);

	await page.goto(url);

	await page.emulateMedia({ media: 'screen' });

	await page.pdf({
		path: 'static/resume.pdf',
		format: 'a4',
		printBackground: false
	});

	return browser.close();
};

main();
