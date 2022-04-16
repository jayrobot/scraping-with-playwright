const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require("mysql");

const connectionString = process.env.DATABASE_URL || "";
const connection = mysql.createConnection(connectionString);
connection.connect();

const getLinks = async (url) => {
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);
		const data = [];
		const pageLocation =
			"/Staff/" + url.replace(/^.*[\\\/]/, "").replace("NoPW", "");

		const links = $("a");

		links.each((i, link) => {
			const href = $(link).attr("href");
			const description = $(link).text();
			data.push({ href, description, pageLocation });
		});
		return data;
	} catch (error) {
		console.log("Error: ", error);
	}
};

const finalLinks = [];
getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/curriculumNoPW.htm"
).then((data) => {
	console.log(data);
	const linkData = data.map((link, i) => [
		i + 248,
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
});
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
