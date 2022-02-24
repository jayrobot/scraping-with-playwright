const playwright = require("playwright");

(async () => {
	const browser = await playwright.chromium.launch({
		headless: true,
	});
	const page = await browser.newPage();
	await page.goto(
		"https://chsr.github.io/chsr-reimagined-demo/publications.shtml"
	);

	const publications = await page.$$eval(".publications li", (all_items) => {
		const data = [];
		all_items.forEach((publication) => {
			console.log(publication.querySelector("a").href);

			const link = publication.querySelector("a").href;
			const title = publication.querySelector("a").innerText;
			const info = publication.innerText;
			const summary = info.substring(0, info.indexOf("("));
			const journalName = info.substring(info.indexOf("("));

			data.push({ link, title, summary, journalName });
		});
		return data;
	});
	// console.log(publications);

	// const reports = await page.$$eval(".reports li", (all_items) => {
	// 	const data = [];
	// 	all_items.forEach((report) => {
	// 		const link = report.querySelector("a").children[0].href;
	// 		const title = report.querySelector("a").innerText;
	// 		const info = report.innerText;
	// 		const summary = info.substring(0, info.indexOf("("));
	// 		const journalName = info.substring(info.indexOf("("));

	// 		data.push({ link, title, summary, journalName });
	// 	});
	// 	return data;
	// 	console.log(all_items);
	// });

	// const presentations = await page.$$eval(".presentations li", (all_items) => {
	// 	const data = [];
	// 	all_items.forEach((presentation) => {
	// 		const link = presentation.querySelector("a").children[0].href;
	// 		const title = presentation.querySelector("a").innerText;
	// 		const info = presentation.innerText;
	// 		const summary = info.substring(0, info.indexOf("("));
	// 		const journalName = info.substring(info.indexOf("("));

	// 		data.push({ link, title, summary, journalName });
	// 	});
	// 	return data;
	// 	console.log(all_items);
	// });

	// wait 30 seconds to see what's going on
	console.log(publications);
	// const staff
	// console.log(reports);
	// console.log(presentations);

	await page.waitForTimeout(30000);
	await browser.close();
})();
