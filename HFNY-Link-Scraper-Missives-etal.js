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

		const links = $("#text-area a").not(".button");
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
	// {
	// 	Category: "Healthy Families Missives",
	// 	SubCategory: "2021 Missives",
	// 	Link: "HealthyFamiliesMissivesNoPW.htm",
	// 	Description:
	// 		"Below are links to HFNY missives, listed with the most recent date first. Feel free to print and distribute these missives to HFNY staff.",
	// 	Type: "Page",
	// },
	// {
	// 	Category: "OCFS, PCANY and CHSR Resources, Forms and Guidelines",
	// 	SubCategory: "OCFS",
	// 	Link: "COVID-19NoPW.htm",
	// 	Description: "COVID-19/Other Emergency Resources",
	// 	Type: "Page",
	// },
	// {
	// 	Category: "Training",
	// 	SubCategory: "Training",
	// 	Link: "trainingNoPW.htm",
	// 	Description: "Training",
	// 	Type: "Page",
	// },
	// {
	// 	Category: "Outreach/Capacity Building",
	// 	SubCategory: "Outreach/Capacity Building",
	// 	Link: "outreachNoPW.htm",
	// 	Description: "Outreach/Capacity Building",
	// 	Type: "Page",
	// },
	// {
	// 	Category: "Outreach",
	// 	SubCategory: "Outreach",
	// 	Link: "outreachpageNoPW.htm",
	// 	Description: "Outreach",
	// 	Type: "Page",
	// },
	// {
	// 	Category: "Capacity Building",
	// 	SubCategory: "Capacity Building",
	// 	Link: "capacitybuildingpageNoPW.htm",
	// 	Description: "Capacity Building",
	// 	Type: "Page",
	// },
	// {
	// 	Category: "Hiring",
	// 	SubCategory: "Hiring",
	// 	Link: "HiringNoPW.htm",
	// 	Description: "Hiring",
	// 	Type: "Page",
	// },
	{
		Category: "HFNY QA/TA & FAQs",
		SubCategory: "HFNY Quality Assurance, Technical Assistance & FAQs",
		Link: "supportNoPW.htm",
		Description: "HFNY Quality Assurance, Technical Assistance & FAQs",
		Type: "Page",
	},
	// {
	// 	Category: "Reporting",
	// 	SubCategory: "HFNY Reporting",
	// 	Link: "reportingNoPW.htm",
	// 	Description: "HFNY Reporting Documents",
	// 	Type: "Page",
	// },
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
