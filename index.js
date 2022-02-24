const playwright = require("playwright");
async function main() {
	const browser = await playwright.chromium.launch({
		headless: false, // set this to true
	});

	const page = await browser.newPage();
	await page.goto("https://chsr.github.io/chsr-reimagined-demo/Staff.shtml");
	const market = await page.$eval(".bios-list li", (headerElm) => {
		const data = [];
		const listElms = headerElm.getElementsByTagName("li");
		console.log(listElms, listElms.len);
		listElms.forEach((elm) => {
			data.push(elm.innerText.split("\n"));
		});
		return data;
	});

	console.log("Something--->>>>", market);
	await page.waitForTimeout(15000); // wait for 15 seconds
	await browser.close();
}

main();
