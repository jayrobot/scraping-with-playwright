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

const sql = "INSERT INTO Links (href, description, pageLocation) VALUES ?";
const linksToScrape = [
	{
		Category: "Documentation",
		SubCategory: "Documentation",
		Link: "/Staff/Documents/Curriculum_Committee_HFNY_Complete_Documentation_2021_03_09_Final.xlsx",
		Description:
			"Curricula Evaluated by the HFNY Curriculum Committee & HFNY Central Administration",
		Type: "Document",
	},
	{
		Category: "Documentation",
		SubCategory: "Documentation",
		Link: "/Staff/Documents/Curricula_At_A_Glance_Final_2021_02_22 (1).pdf",
		Description: "Curriculum At A Glance",
		Type: "Document",
	},
	{
		Category: "Documentation",
		SubCategory: "Documentation",
		Link: "/Staff/Documents/Curriculum_Executive_Summary_CADecisions_FINAL_2021_02_22.pdf",
		Description: "HFNY Curriculum Committee: Executive Summary ",
		Type: "Document",
	},
	{
		Category: "Documentation",
		SubCategory: "Documentation",
		Link: "/Staff/Documents/HFNY_Curriculum_Committee_RegionalMeetings_March_2021_2021_03_01.pptx",
		Description:
			"HFNY Curriculum Committee and HFNY Central Administration Decisions: March 2021 Regional Meetings",
		Type: "Document",
	},
	{
		Category: "Documentation",
		SubCategory: "Documentation",
		Link: "/Staff/curriculum/SAN ANGELO FLAGGED PAGES_YearOne_2021_03_02.pdf",
		Description: "SAN ANGELO FLAGGED PAGES YEAR ONE - NOT TO USE",
		Type: "Document",
	},
	{
		Category: "General Curricula",
		SubCategory: "Primary Curricula",
		Link: "GGKscurricNoPW.htm",
		Description: "Growing Great Kids Prenatal through 36 Months (GGK P36)",
		Type: "Page",
	},
	{
		Category: "General Curricula",
		SubCategory: "Primary Curricula",
		Link: "pfhbcurrNoPW.htm",
		Description:
			"Partners for a Healthy Baby/Florida State University (PHB/FSU)",
		Type: "Page",
	},
	{
		Category: "General Curricula",
		SubCategory: "Primary Curricula",
		Link: "PATcurricNoPW.htm",
		Description: "Parents as Teachers (PAT)",
		Type: "Page",
	},
	{
		Category: "General Curricula",
		SubCategory: "Supplemental General Curricula",
		Link: "babytalkcurricNoPW.htm",
		Description: "Baby Talk (Prenatal-Age 5)",
		Type: "Page",
	},
	{
		Category: "General Curricula",
		SubCategory: "Curricula Specifically for Ages 3-5",
		Link: "GGKPlayWithMeNoPW.htm",
		Description: "GGK Play With Me! (Ages 3-4)",
		Type: "Page",
	},
	{
		Category: "General Curricula",
		SubCategory: "Curricula Specifically for Ages 3-5",
		Link: "GGK%20for%20PreschoolersNoPW.htm",
		Description: "GGK for Preschoolers (Ages 3-5)",
		Type: "Page",
	},
	{
		Category: "General Curricula",
		SubCategory: "Curricula Specifically for Ages 3-5",
		Link: "PATFoundational2NoPW.htm",
		Description: "PAT Foundational 2 (Ages 3-6)",
		Type: "Page",
	},
	{
		Category: "General Curricula",
		SubCategory: "Curricula Specifically for Ages 3-5",
		Link: "PAT-Partnering%20with%20Teen%20ParentsNoPW.htm",
		Description: "PAT: Partnering with Teen Parents (prenatal-Kindergarten)",
		Type: "Page",
	},
	{
		Category: "General Curricula",
		SubCategory: "Curricula Specifically for Ages 3-5",
		Link: "babytalkcurricprekindergartenNoPW.htm",
		Description: "Baby TALK (prenatal-Kindergarten)",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Fatherhood-Focused Curricula",
		Link: "24-7dadNoPW.htm",
		Description: "24/7 Dad",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Fatherhood-Focused Curricula",
		Link: "nuturingfathersNoPW.htm",
		Description: "Nurturing Fathers",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Fatherhood-Focused Curricula",
		Link: "UnderstandingDadNoPW.htm",
		Description: "Understanding Dad",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Fatherhood-Focused Curricula",
		Link: "FFPAT-PartneringwithTeenParentsNoPW.htm",
		Description: "PAT: Partnering with Teen Parents",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Fatherhood-Focused Curricula",
		Link: "InsideOut%20DadNoPW.htm",
		Description: "InsideOut Dad (for incarcerated fathers) (Not Approved)",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Fatherhood-Focused Curricula",
		Link: "ResponsibleFatherhoodCurriculumNoPW.htm",
		Description: "The Responsible Fatherhood Curriculum (Not Approved)",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Curricula for Teen Parents",
		Link: "PAT-Partnering%20with%20Teen%20ParentsspecializedNoPW.htm",
		Description: "PAT: Partnering with Teen Parents",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Curricula for Teen Parents",
		Link: "24-7dad_adaptationforteendadsNoPW.htm",
		Description: "24/7 Dad: Adaptation for Teen Dads",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Curricula for Teen Parents",
		Link: "babytalkcurricprekindergartenNoPW.htm",
		Description: "Baby Talk (prenatal-Kindergarten)",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Curricula for Children with Disabilities",
		Link: "PAT-Interactions%20Across%20AbilitiesNoPW.htm",
		Description: "PAT: Interactions Across Abilities",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Curricula for Children with Disabilities",
		Link: "childrenwithdisabilityNoPW.htm",
		Description: "PAT: Partnering with Teen Parents",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Overcoming Adversity/Trauma & Building Resilience",
		Link: "mindmattersNoPW.htm",
		Description: "Mind Matters Overcoming Adversity and Building Resilience",
		Type: "Page",
	},
	{
		Category: "Specialized Supplemental Curricula",
		SubCategory: "Program for Native American/Tribal Communities",
		Link: "NATCFACENoPW.htm",
		Description: "FACE: Family and Child Education Program",
		Type: "Page",
	},
];

console.log(linksToScrape);
console.log(linksToScrape.length);

let linkData = [];
// let seqID = 335;
for (i = 0; i < linksToScrape.length; i++) {
	let link = linksToScrape[i];
	// let linkObj = {
	// 	"Category": link.Category,
	// 	"SubCategory": link.SubCategory,
	// 	"Link": link.Link,
	// 	"Description": link.Description,
	// 	"Type": link.Type,
	// 	"SeqID": i + 1
	// }
	// linkData.push(linkObj);
	if (link.Type === "Page") {
		getLinks(
			"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/" +
				link.Link
		).then((data) => {
			linkData = data.map((link, i) => [
				link.href,
				link.description,
				link.pageLocation,
			]);
			connection.query(sql, [linkData], (err, result) => {
				if (err) {
					console.log("ACKKK, it didn't work:", err);
				} else {
					console.log("YAY! DB is populated: ", result);
				}
			});
		});
	}
}

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/UnderstandingDadNoPW.htm"
// ).then((data) => {
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// 	// seqID = seqID + linkData1.length;
// 	// console.log(seqID);
// 	// console.log(linkData1.length);
// 	// console.log(linkData1);
// });

// // console.table([linkData1]);

// linkData = [];
// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/FFPAT-PartneringwithTeenParentsNoPW.htm"
// ).then((data) => {
// 	// console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/InsideOut%20Dad.htm"
// ).then((data) => {
// 	// console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/ResponsibleFatherhoodCurriculumNoPWNoPW.htm"
// ).then((data) => {
// 	// 	console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/PAT-Partnering%20with%20Teen%20ParentsspecializedNoPW.htm"
// ).then((data) => {
// 	// 	console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/24-7dad_adaptationforteendadsNoPW.htm"
// ).then((data) => {
// 	// 	console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/NoPW.htm"
// ).then((data) => {
// 	// 	console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/babytalkcurricprekindergartenNoPW.htm"
// ).then((data) => {
// 	// 	console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/24-7dadNoPW.htm"
// ).then((data) => {
// 	// 	console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/nuturingfathersNoPW.htm"
// ).then((data) => {
// 	// 	console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// linkData = [];

// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/GGKPlayWithMeNoPW.htm"
// ).then((data) => {
// 	// 	console.log(data);
// 	linkData = data.map((link, i) => [
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// const links = linkData1.concat(
// 	linkData2,
// 	linkData3,
// 	linkData4,
// 	linkData5,
// 	linkData6,
// 	linkData7,
// 	linkData8,
// 	linkData9,
// 	linkData10,
// 	linkData11
// );
// const links = linkData1;
// const links = linkData1.concat(
// 	linkData2,
// 	linkData3
// 	// linkData4,
// 	// linkData5
// );
// console.log(links);

// const sql = "INSERT INTO Links (id, href, description, pageLocation) VALUES ?";
// connection.query(sql, [links], (err, result) => {
// 	if (err) {
// 		console.log("ACKKK, it didn't work:", err);
// 	} else {
// 		console.log("YAY! DB is populated: ", result);
// 	}
// });

// const finalLinks = [];
// getLinks(
// 	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/curriculumNoPW.htm"
// ).then((data) => {
// 	console.log(data);
// 	const linkData = data.map((link, i) => [
// 		i + 248,
// 		link.href,
// 		link.description,
// 		link.pageLocation,
// 	]);

// 	const sql =
// 		"INSERT INTO Links (id, href, description, pageLocation) VALUES ?";
// 	connection.query(sql, [linkData], (err, result) => {
// 		if (err) {
// 			console.log("ACKKK, it didn't work:", err);
// 		} else {
// 			console.log("YAY! DB is populated: ", result);
// 		}
// 	});
// });

// 	const $ = cheerio.load(links);

// 	$("a").each(function (i, link) {
// 		const href = $(link).attr("href");
// 		const description = $(link).text();
// 		finalLinks.push({ link.href, link.description, link. });
// 	});
// });
// console.log(links);

// console.log(finalLinks);

// axios
// 	.get(
// 		"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/curriculum.htm"
// 	)
// 	.then(function (response) {
// 		console.log(response.data);
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	});
