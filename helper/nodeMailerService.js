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

const certificateProcessingMailer = (email, name) => {
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
      "Barangay Navotas East Management System - Certification Request in Progress",
    text: `Dear ${name}, 
          \nWe hope this email finds you well. We would like to inform you that we have received your request for certification through Barangay Navotas East Management System. Your request is currently in process, and we are diligently verifying all the details provided to ensure accuracy and legitimacy.
          \nOur team is dedicated to processing your request promptly, and you can expect to receive an update on the status of your request within 1 to 3 business days. We kindly ask for your patience and understanding during this processing period.
          \nPlease note that upon approval of your certification request, there will be a fee associated with the certificate (if applicable).
          \nWe appreciate your cooperation in providing accurate information, which enables us to expedite the verification process effectively. Rest assured, your request is important to us, and we are committed to providing you with a seamless experience.
          \nWe understand the importance of a smooth and secure certification process, and we appreciate your patience and cooperation during this verification period. If you have any questions or concerns, please do not hesitate to contact our support team at ${process.env.NODEMAILER_EMAIL}.
          \nThank you for your understanding and cooperation. We look forward to serving you.
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

const certificateApprovedMailer = (email, name) => {
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
      "Barangay Navotas East Management System - Certification Request Approved",
    text: `Dear ${name}, 
          \nWe are pleased to inform you that your certification request submitted through Barangay Navotas East Management System has been successfully processed and approved.
          \nYour certification is now ready for pickup at the Barangay Office. Our office hours are from 9:00 AM to 5:00 PM, Monday to Friday. Please feel free to visit us at your earliest convenience to collect your approved certification.
          \nKindly ensure that you bring a valid identification document with you when picking up your certification. This will help us verify your identity and facilitate a smooth handover process.
          \nIf you have any questions or concerns, please do not hesitate to contact our support team at ${process.env.NODEMAILER_EMAIL}.
          \nThank you for choosing Barangay Navotas East Management System. We look forward to serving you and enhancing your community interactions through our platform.
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

const certificateRejectedMailer = (email, name) => {
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
      "Barangay Navotas East Management System - Certification Request Rejected",
    text: `Dear ${name}, 
          \nWe hope this email finds you well. We regret to inform you that your certification request submitted through Barangay Navotas East Management System has been rejected due to unconfirmed details. Our verification process revealed discrepancies that prevent us from approving your request at this time.
          \nWe understand that this news might be disappointing, and we sincerely apologize for any inconvenience caused. To address the issue and resubmit your request, we kindly ask you to review the information provided during the application process.
          \nIf you have any questions or require further clarification regarding the rejection reasons, please do not hesitate to reply to this email or visit our office during our operating hours. Our team will be happy to assist you in resolving any concerns you may have.
          \nOur office hours are from 9:00 AM to 5:00 PM, Monday to Friday. You can find us at Barangay Office. Alternatively, you may contact our support team at ${process.env.NODEMAILER_EMAIL} for additional assistance.
          \nThank you for your understanding and cooperation. We appreciate your interest in obtaining certification through Barangay Navotas East Management System, and we look forward to assisting you further once the necessary details have been confirmed.
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
  certificateProcessingMailer,
  certificateApprovedMailer,
  certificateRejectedMailer,
};
