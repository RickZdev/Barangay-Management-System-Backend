const nodemailer = require("nodemailer");

const nodeMailer = (email, name, link) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  var mailOptions = {
    from: {
      name: "Barangay Navotas East",
      address: process.env.NODEMAILER_EMAIL,
    },
    to: [email],
    subject: "Reset Password",
    text: `Hello ${name}, \n\nA request has been received to reset the password for your Barangay Navotas East Management System Account. 
          \nHere's the link to reset your password. It will be expired after 15 minutes. 
          \n\n${link} \n\nIf you did not initiate this request, please contact us immediately at barangaynavotaseast@gmail.com.\n\nThank you,\nBarangay Management Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  nodeMailer,
};
