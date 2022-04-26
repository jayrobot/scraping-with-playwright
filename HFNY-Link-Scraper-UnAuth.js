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
		const pageLocation = url.replace(/^.*[\\\/]/, "");

		const links = $("#text-area a").not(".button");
		// console.log(links);

		links.each((i, link) => {
			let href = $(link).attr("href");
			let description = $(link).text();
			let category = $(link).parent().first()[0].innerText || "";
			data.push({ href, description, pageLocation, category });
		});
		return data;
	} catch (error) {
		console.log("Error: ", error);
	}
};

const linksToScrape = [
	{
		Category: "Home",
		SubCategory: "Home",
		Link: "default.htm",
		Description: "HFNY Home Page",
		Type: "Page",
	},
	{
		Category: "How does HFNY work?",
		SubCategory: "How does HFNY work?",
		Link: "HomeVisits/Process.htm",
		Description: "HFNY Process",
		Type: "Page",
	},
	{
		Category: "Is HFNY for me?",
		SubCategory: "Is HFNY for me?",
		Link: "HomeVisits/eligibility.htm",
		Description: "HFNY Eligibility",
		Type: "Page",
	},
	{
		Category: "Find a HFNY program",
		SubCategory: "Find a HFNY program",
		Link: "sites2.htm",
		Description: "HFNY Site map",
		Type: "Page",
	},
	{
		Category: "Families",
		SubCategory: "Families",
		Link: "families.htm",
		Description: "HFNY Families FAQ",
		Type: "Page",
	},
	{
		Category: "Providers & Referral Sources",
		SubCategory: "Providers & Referral Sources",
		Link: "providers_rs.htm",
		Description: "HFNY Providers & Referral Sources FAQ",
		Type: "Page",
	},
	{
		Category: "Funders",
		SubCategory: "Funders",
		Link: "funders_sponsors.htm",
		Description: "HFNY Funders & Sponsors FAQ",
		Type: "Page",
	},
	{
		Category: "Researchers",
		SubCategory: "Researchers",
		Link: "researchers.htm",
		Description: "HFNY Researchers FAQ",
		Type: "Page",
	},
	{
		Category: "HFNY Newsletter",
		SubCategory: "HFNY Newsletter",
		Link: "newsletter.htm",
		Description: "The Link - HFNY Newsletter",
		Type: "Page",
	},
	{
		Category: "Research Home",
		SubCategory: "Research Home",
		Link: "Research/default.htm",
		Description: "HFNY Research Home",
		Type: "Page",
	},
	{
		Category: "Research Publications",
		SubCategory: "Research Publications",
		Link: "Research/publications.htm",
		Description: "HFNY Research Publications",
		Type: "Page",
	},
	{
		Category: "Parenting Resources",
		SubCategory: "Parenting Resources",
		Link: "Resources/parenting.htm",
		Description: "HFNY Parenting Resources",
		Type: "Page",
	},
	{
		Category: "Child Development & Health Resources",
		SubCategory: "Child Development & Health Resources",
		Link: "Resources/development.htm",
		Description: "HFNY Child Development & Health Resources",
		Type: "Page",
	},
	{
		Category: "Financial Resources",
		SubCategory: "Financial Resources",
		Link: "Resources/financial_resources.htm",
		Description: "HFNY Financial Resources",
		Type: "Page",
	},
	{
		Category: "Child Safety Resources",
		SubCategory: "Child Safety Resources",
		Link: "Resources/safety.htm",
		Description: "HFNY Child Safety Resources",
		Type: "Page",
	},
	{
		Category: "Fatherhood Resources",
		SubCategory: "Fatherhood Resources",
		Link: "Resources/fatherhood.htm",
		Description: "HFNY Fatherhood Resources",
		Type: "Page",
	},
	{
		Category: "Maternal Health Resources",
		SubCategory: "Maternal Health Resources",
		Link: "Resources/maternal.htm",
		Description: "HFNY Maternal Health Resources",
		Type: "Page",
	},
	{
		Category: "HFNY Jobs",
		SubCategory: "HFNY Jobs",
		Link: "jobs.htm",
		Description: "HFNY Jobs",
		Type: "Page",
	},
];

console.log(linksToScrape);
console.log(linksToScrape.length);

const sql =
	"INSERT INTO Links (href, description, pageLocation, category, subCategory) VALUES ?";
let linkData = [];

for (i = 0, ltsLength = linksToScrape.length; i < ltsLength; i++) {
	let linkToScrape = linksToScrape[i];

	if (linkToScrape.Type === "Page") {
		getLinks(
			"https://healthyfamiliesnewyorknew.azurewebsites.net/" + linkToScrape.Link
		).then((data) => {
			linkData = data.map((link, i) => [
				link.href,
				link.description,
				link.pageLocation,
				link.Category || linkToScrape.Category,
				link.SubCategory || linkToScrape.SubCategory,
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
