const playwright = require("playwright");

(async () => {
	const browser = await playwright.chromium.launch({
		headless: true,
	});
	const page = await browser.newPage();
	await page.goto("https://chsr-reimagined-demo.netlify.app/project/");

	const projects = await page.$$eval("#content li", (all_items) => {
		const data = [];
		all_items.forEach((project) => {
			// console.log(project.querySelector("a").href);
			const pathArray = project.querySelector("a").href.split("/");
			const link = "/" + pathArray[3];
			const title = project.querySelector("a").innerText;

			data.push({ link, title });
		});
		return data;
	});

	console.log(projects);

	// wait 30 seconds to see what's going on
	await page.waitForTimeout(30000);
	await browser.close();
})();
