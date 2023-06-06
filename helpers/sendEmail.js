const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(data) {
	const email = { ...data, from: "hanna.bazdyrieva@meta.ua" };
	await sgMail.send(email);
	return true;
}

module.exports = sendEmail;

// const email = {
// 	to: "anna.bazdyreva@gmail.com",
// 	from: "hanna.bazdyrieva@meta.ua",
// 	subject: "Test email",
// 	html: (
// 		<div>
// 			<h1>Test email</h1>
// 			<h3>sent from localhost:3000</h3>
// 		</div>
// 	),
// };

// sgMail
// 	.send(email)
// 	.then(() => console.log("Test email successfully sent"))
// 	.catch((err) => console.log(err.message));
