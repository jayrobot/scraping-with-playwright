const playwright = require("playwright");

(async () => {
	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();
	await page.goto("https://chsr.github.io/chsr-reimagined-demo/Staff.shtml");
	const staff = await page.$$eval(".bios-list li", (all_items) => {
		const data = [];
		all_items.forEach((staffMember) => {
			const link = GetFileName(staffMember.querySelector(".staff-name").href);
			const img = GetFileName(staffMember.querySelector("img").src);
			const name = staffMember.querySelector("img").alt;
			const name2 = staffMember.querySelector(".staff-name").innerText;
			const position = staffMember.querySelector(".staff-position").innerText;
			const details[] = GetDetails(staffMember.querySelector(".bio-info").innerText);
			data.push({ name, name2, position, details, link, img });
		});
		return data;
	});
	// wait 30 seconds to see what's going on
	await page.waitForTimeout(30000);
	await browser.close();

	console.log(staff);

})();

// function GetDetails()
// async 