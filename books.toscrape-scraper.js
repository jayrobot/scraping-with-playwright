const playwright = require("playwright");

(async () => {
	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();
	await page.goto("https://books.toscrape.com/");
	const books = await page.$$eval(".product_pod", (all_items) => {
		const data = [];
		all_items.forEach((book) => {
			const name = book.querySelector("h3").innerText;
			const price = book.querySelector(".price_color").innerText;
			const stock = book.querySelector(".availability").innerText;
			data.push({ name, price, stock });
		});
		return data;
	});
	console.log(books);
	// wait 30 seconds to see what's going on
	await page.waitForTimeout(30000);

	await browser.close();
})();
