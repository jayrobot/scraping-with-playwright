// Import the playwright library into our scraper.
const playwright = require("playwright");

async function main() {
	// Open a Chromium browser. We use headless: false
	// to be able to watch what's going on.
	const browser = await playwright.chromium.launch({
		headless: false,
		devtools: true,
	});
	// Open a new page / tab in the browser.
	const page = await browser.newPage({
		bypassCSP: true, // This is needed to enable JavaScript execution on GitHub.
	});
	// Tell the tab to navigate to the GitHub Topics page.
	await page.goto("https://github.com/topics/javascript");
	// Click and tell Playwright to keep watching for more than
	// 30 repository cards to appear in the page.
	await page.click("text=Load more");
	await page.waitForFunction(() => {
		const repoCards = document.querySelectorAll("article.border");
		return repoCards.length > 30;
	});
	// Extract data from the page. Selecting all 'article' elements
	// will return all the repository cards we're looking for.
	const repos = await page.$$eval("article.border", (repoCards) => {
		return repoCards.map((card) => {
			const [user, repo] = card.querySelectorAll("h3 a");
			const stars = card.querySelector("a.social-count");
			const description = card.querySelector("div.px-3 > p + div");
			const topics = card.querySelectorAll("a.topic-tag");

			const toText = (element) => element && element.innerText.trim();

			return {
				user: toText(user),
				repo: toText(repo),
				url: repo.href,
				stars: toText(stars),
				description: toText(description),
				topics: Array.from(topics).map((t) => toText(t)),
			};
		});
	});
	// Print the results. Nice!
	console.log(`We extracted ${repos.length} repositories.`);
	console.dir(repos);

	// wait 30 seconds to see what's going on
	await page.waitForTimeout(30000);
	// Turn off the browser to clean up after ourselves.
	await browser.close();
}

main();
