const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require("mysql");

const connectionString = process.env.DATABASE_URL || "";
const connection = mysql.createConnection(connectionString);
connection.connect();

const getLinks = async (url) => {
	try {
		const response = await axios.get(url);
		// console.log(response);

		const $ = cheerio.load(response.data);
		let data = [];
		const pageLocation =
			"/Staff/" + url.replace(/^.*[\\\/]/, "").replace("NoPW", "");

		const links = $("#text-area a");
		// console.log(links);

		links.each((i, link) => {
			let href = $(link).attr("href");
			let description = $(link).text();
			data.push({ href, description, pageLocation });
		});
		return data;
	} catch (error) {
		console.log("Error: ", error);
	}
};

const linksToScrape = [
	{
		Category: "Policies & Standards",
		SubCategory: "Policies & Standards",
		Link: "policiesNoPW.htm",
		Description: "Policies and standards.",
		Type: "Page",
	},
	{
		Category: "Policies & Standards",
		SubCategory: "CA Policy Manual Appendices",
		Link: "caupdatedpolicyandappedicesNoPW.htm",
		Description: "CA Updated Policy",
		Type: "Document",
	},
	{
		Category: "Policies & Standards",
		SubCategory: "HFNY Policy Manual Appendices",
		Link: "HFNYupdatedpoliciesNoPW.htm",
		Description: "HFNY Site Specific Policy Manual",
		Type: "Document",
	},
];

console.log(linksToScrape);
console.log(linksToScrape.length);

const sql =
	"INSERT INTO Links (href, description, pageLocation, category, subCategory) VALUES ?";
let linkData = [];

for (i = 0; i < linksToScrape.length; i++) {
	let linkToScrape = linksToScrape[i];

	if (linkToScrape.Type === "Page") {
		getLinks(
			"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/" +
				linkToScrape.Link
		).then((data) => {
			linkData = data.map((link, i) => [
				link.href,
				link.description,
				link.pageLocation,
				linkToScrape.Category,
				linkToScrape.SubCategory,
			]);
			connection.query(sql, [linkData], (err, result) => {
				if (err) {
					console.log("ACKKK, it didn't work:", err);
				} else {
					console.log("YAY! DB is populated: ", result);
				}
			});
		});
		// .catch((error) => console.log("Error: ", error))
		// .finally(() => process.exit());
	}
}
