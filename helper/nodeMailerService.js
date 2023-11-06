const nodemailer = require("nodemailer");

const changePasswordMailer = (email, name, link) => {
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

const accountProcessingMailer = (email, name) => {
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
    subject:
      "Account Verification and Activation for Barangay Navotas East Management System",
    text: `Dear ${name}, 
          \nWe hope this email finds you well. Thank you for choosing Barangay Navotas East Management System as your platform for community engagement. We have received your registration and appreciate your interest in becoming a member of our community.
          \nWe would like to inform you that your account is currently pending verification by our administrative team. Rest assured, we are diligently reviewing the details you provided to ensure the authenticity and security of our platform.
          \nOnce your details have been verified and your account has been approved, you will receive another email confirming that your account has been successfully activated. At that point, you will have full access to your Barangay Navotas East Management System account.
          \nWe understand the importance of a smooth and secure registration process, and we appreciate your patience and cooperation during this verification period. If you have any questions or concerns, please do not hesitate to contact our support team at ${process.env.NODEMAILER_EMAIL}.
          \nThank you for your understanding and cooperation. We look forward to welcoming you to our community soon.
          \nBest regards, \nBarangay Management Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const accountVerifiedMailer = (email, name, link) => {
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
    subject:
      "Account Verification Successful – Welcome to Barangay Navotas East Management System",
    text: `Dear ${name}, 
          \nWe are pleased to inform you that your account with Barangay Management East Management System has been successfully verified and activated. We appreciate your patience during the verification process and are delighted to welcome you as a valued member of our community.
          \nWith your verified account, you now have full access to the features and services offered by Barangay Navotas East Management System. We encourage you to explore our platform and take advantage of the resources available to enhance your community engagement experience.
          \nTo access your account, please visit our website at ${link} and log in using the credentials you provided during the registration process.
          \nIf you have any questions or require assistance while navigating our platform, our dedicated support team is available to help. Feel free to reach out to us at ${process.env.NODEMAILER_EMAIL}.
          \nOnce again, thank you for choosing Barangay Navotas East. We look forward to serving you and enhancing your community interactions through our platform.
          \nBest regards, \nBarangay Management Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const accountRejectedMailer = (email, name) => {
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
    subject:
      "Account Verification Status – Barangay Navotas East Management System",
    text: `Dear ${name}, 
          \nWe hope this email finds you well. Thank you for your interest in registering with Barangay Navotas East Management System.
          \nWe regret to inform you that your account verification process could not be completed successfully due to discrepancies or issues with the details provided during the registration process. After careful review, it has been determined that there are inaccuracies or missing information in the information submitted.
          \nAs a result, we are unable to approve your account registration at this time. We understand that situations like these can be frustrating, and we sincerely apologize for any inconvenience this may have caused.
          \nTo resolve this matter, we kindly request you to review the information provided during registration and ensure that all details are accurate and complete. Once you have rectified the discrepancies, you are welcome to re-submit your registration on our platform. If you require any assistance or have questions about the registration process, please do not hesitate to contact our support team at ${process.env.NODEMAILER_EMAIL}.
          \nAlternatively, we encourage you to visit the Barangay office in person for more information and assistance with your registration. Our dedicated staff will be happy to help you navigate the registration process and address any concerns you may have.
          \nWe appreciate your understanding and cooperation in this matter. Thank you for considering Barangay Navotas East Management System as your community engagement platform. We hope to assist you with your registration in the near future.

          \nBest regards, \nBarangay Management Team`,
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
  changePasswordMailer,
  accountProcessingMailer,
  accountVerifiedMailer,
  accountRejectedMailer,
};
