const playwright = require("playwright");

(async () => {
	const browser = await playwright.chromium.launch({
		headless: true,
	});
	const page = await browser.newPage();
	await page.goto(
		// "https://chsr.github.io/chsr-reimagined-demo/publications.shtml"
		"https://chsr-reimagined-demo.netlify.app/publications/"
	);

	// const publications = await page.$$eval(".publications li", (all_items) => {
	// 	const data = [];
	// 	all_items.forEach((publication) => {
	// 		// console.log(publication.querySelector("a").href);
	// 		const link = publication.querySelector("a").href;
	// 		const title = publication.querySelector("a").innerText;
	// 		const info = publication.innerText;
	// 		const summary = info.substring(info.indexOf("\n") + 1, info.indexOf("("));
	// 		const journalName = info.substring(info.indexOf("("));

	// 		data.push({ link, title, summary, journalName });
	// 	});
	// 	return data;
	// });

	// const reports = await page.$$eval(".reports li", (all_items) => {
	// 	const data = [];
	// 	all_items.forEach((report) => {
	// 		const link = report.querySelector("a").href;
	// 		const title = report.querySelector("a").innerText;
	// 		const summary = report.innerText;
	// 		// const summary = info.substring(0, info.indexOf("("));
	// 		const journalName = "";

	// 		data.push({ link, title, summary, journalName });
	// 	});
	// 	return data;
	// });

	const presentations = await page.$$eval(".presentations li", (all_items) => {
		const data = [];
		all_items.forEach((presentation) => {
			const link = presentation.querySelector("a").href;
			const title = presentation.querySelector("a").innerText;
			const info = presentation.innerText;
			const summary = info.substring(info.indexOf("\n") + 1, info.indexOf("("));
			const journalName = info.substring(info.indexOf("("));

			data.push({ link, title, summary, journalName });
		});
		return data;
	});

	// wait 30 seconds to see what's going on
	// console.log(publications);
	// console.log(reports);
	console.log(presentations);

	await page.waitForTimeout(30000);
	await browser.close();
})();
