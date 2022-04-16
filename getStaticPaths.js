let json = require("../chsr.albany.edu-astro/chsr-astro/src/data/staff.json");
// console.log(json);

function addStaffObject(staffMemberObject) {
	let staffMemberPath = staffMemberObject.path.replace(/^.*[\\\/]/, "");
	params = { staffMember: staffMemberPath };
	staticPaths.push({ params });

	// staffObject = { params: { staffMember: staffMember.path.replace(/^.*[\\\/]/, "") } };
	// (staffObject = staffMember.path.replace(/^.*[\\\/]/, "")));
	// 	console.log(staffObject);
	// staticPaths.push( staffObject )
	// ));
	return;
}

let staticPaths = [];
let staffObject = {};
let params = {};

json.forEach((staffMember) => addStaffObject(staffMember));

// console.log(staffObject);
console.log(staticPaths);

// function createStaffObjects() {
// 	this.staffObject = {};
// }

// createStaffObjects.prototype.copyadd = function(array) {
//   array.forEach(function countEntry(entry) {
//     this.sum += entry;
//     ++this.count;
//   }, this);
// };

// const obj = new Counter();
// obj.add([2, 5, 9]);
// console.log(obj.count); // 3
// console.log(obj.sum); // 16
