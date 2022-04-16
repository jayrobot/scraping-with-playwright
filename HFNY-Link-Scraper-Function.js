const playwright = require("playwright");

const ScrapePage = async (href, selector) => {
	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();
	await page.goto(href);

	const links = await page.$$eval(selector, (all_anchors) => {
		const data = [];
		const pageLocation = "/Staff/programmanager.htm";
		all_anchors.forEach((anchor) => {
			const href = anchor.href;
			const description = anchor.innerText;
			data.push({ href, description, pageLocation });
		});
		return data;
	});
	// wait 5 seconds to see what's going on
	await page.waitForTimeout(5000);
	await browser.close();

	return links;
};

const getLinks = async () => {
	const pageRoot = "https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/";
	const pmlinks = await ScrapePage(
		pageRoot + "ProgramManagerNoPW.html",
		"h3 a"
	);
	const frslinks = ScrapePage(pageRoot + "FRSNoPW.html", "a");
	const fsslinks = ScrapePage(pageRoot + "FSSNoPW.html", "a");
	const suplinks = ScrapePage(pageRoot + "SupervisorNoPW.html", "h3 a");

	//const links = [...pmlinks, ...frslinks, ...fsslinks, ...suplinks];
	const links = pmlinks.concat(frslinks, fsslinks, suplinks);
	console.log(links);
};
