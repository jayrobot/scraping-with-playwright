const playwright = require("playwright");
const mysql = require("mysql");

const connectionString = process.env.DATABASE_URL || "";
const connection = mysql.createConnection(connectionString);
connection.connect();

(async () => {
	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();
	await page.goto(
		"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/ProgramManagerNoPW.html"
	);
	// console.log(page);

	const pmlinks = await page.$$eval("h3 a", (all_anchors) => {
		const data = [];
		const pageLocation = "/Staff/programmanager.htm";
		all_anchors.forEach((anchor) => {
			const href = anchor.href;
			const description = anchor.innerText;
			// const href = anchor.querySelector("a").href;
			// const description = anchor.querySelector("a").innerText;
			// const name = link.querySelector("img").alt;
			// const name2 = link.querySelector(".staff-name").innerText;
			// const position = link.querySelector(".staff-position").innerText;
			// const details[] = GetDetails(link.querySelector(".bio-info").innerText);
			data.push({ href, description, pageLocation });
		});
		return data;
	});
	// wait 5 seconds to see what's going on
	await page.waitForTimeout(5000);

	const page2 = await browser.newPage();
	await page2.goto(
		"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/FRSNoPW.html"
	);

	const frslinks = await page2.$$eval("a", (all_anchors) => {
		const data = [];
		const pageLocation = "/Staff/FRS.htm";
		all_anchors.forEach((anchor) => {
			const href = anchor.href;
			const description = anchor.innerText;
			data.push({ href, description, pageLocation });
		});
		return data;
	});
	// wait 5 seconds to see what's going on
	await page.waitForTimeout(5000);

	const page3 = await browser.newPage();
	await page3.goto(
		"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/FSSNoPW.html"
	);

	const fsslinks = await page3.$$eval("a", (all_anchors) => {
		const data = [];
		const pageLocation = "/Staff/FSS.htm";
		all_anchors.forEach((anchor) => {
			const href = anchor.href;
			const description = anchor.innerText;
			data.push({ href, description, pageLocation });
		});
		return data;
	});
	// wait 5 seconds to see what's going on
	await page.waitForTimeout(5000);

	const page4 = await browser.newPage();
	await page4.goto(
		"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/SupervisorNoPW.html"
	);

	const suplinks = await page4.$$eval("h3 a", (all_anchors) => {
		const data = [];
		const pageLocation = "/Staff/Supervisor.htm";
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
	const links = pmlinks.concat(frslinks, fsslinks, suplinks);
	console.table(links);

	const linkData = links.map((link, i) => [
		i,
		link.href,
		link.description,
		link.pageLocation,
	]);

	const sql =
		"INSERT INTO Links (id, href, description, pageLocation) VALUES ?";
	connection.query(sql, [linkData], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
})();
