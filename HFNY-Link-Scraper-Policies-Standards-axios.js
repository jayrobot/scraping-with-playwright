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

let linkData1 = [];
// let seqID = 335;

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/GGKscurricNoPW.htm"
).then((data) => {
	linkData1 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData1], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
	// seqID = seqID + linkData1.length;
	// console.log(seqID);
	// console.log(linkData1.length);
	// console.log(linkData1);
});

// console.table([linkData1]);

let linkData2 = [];
getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/PATcurricNoPW.htm"
).then((data) => {
	// console.log(data);
	linkData2 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData2], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData3 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/babytalkcurricNoPW.htm"
).then((data) => {
	// console.log(data);
	linkData3 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData3], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData4 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/GGKPlayWithMeNoPW.htm"
).then((data) => {
	// 	console.log(data);
	linkData4 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData4], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData5 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/GGK%20for%20PreschoolersNoPW.htm"
).then((data) => {
	// 	console.log(data);
	linkData5 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData5], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData6 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/PATFoundational2NoPW.htm"
).then((data) => {
	// 	console.log(data);
	linkData6 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData6], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData7 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/PAT-Partnering%20with%20Teen%20ParentsNoPW.htm"
).then((data) => {
	// 	console.log(data);
	linkData7 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData7], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData8 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/babytalkcurricprekindergartenNoPW.htm"
).then((data) => {
	// 	console.log(data);
	linkData8 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData8], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData9 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/24-7dadNoPW.htm"
).then((data) => {
	// 	console.log(data);
	linkData9 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData9], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData10 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/nuturingfathersNoPW.htm"
).then((data) => {
	// 	console.log(data);
	linkData10 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData10], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

let linkData11 = [];

getLinks(
	"https://healthyfamiliesnewyorknew.azurewebsites.net/Staff/NoPW/GGKPlayWithMeNoPW.htm"
).then((data) => {
	// 	console.log(data);
	linkData11 = data.map((link, i) => [
		link.href,
		link.description,
		link.pageLocation,
	]);
	connection.query(sql, [linkData11], (err, result) => {
		if (err) {
			console.log("ACKKK, it didn't work:", err);
		} else {
			console.log("YAY! DB is populated: ", result);
		}
	});
});

const links = linkData1.concat(
	linkData2,
	linkData3,
	linkData4,
	linkData5,
	linkData6,
	linkData7,
	linkData8,
	linkData9,
	linkData10,
	linkData11
);
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
