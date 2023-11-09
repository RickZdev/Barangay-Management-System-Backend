const mongoose = require("mongoose");
const Certificates = require("../models/certificateModel");
const Resident = require("../models/residentModel");

// nodemailer
const mail = require("../../helper/nodeMailerService");

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificates.find({}).sort({ createdAt: -1 });

    res.status(200).json(certificates);
  } catch (err) {
    res.status(404).json({ error: "Certificate doesnt exist!" });
  }
};

const createCertificate = async (req, res) => {
  const {
    residentId,
    residentName,
    typeOfCertificate,
    dateRequested,
    dateOfReleased,
    certificateData,
  } = req.body;

  // add doc to db
  try {
    const certificates = await Certificates.create({
      residentId,
      residentName,
      typeOfCertificate,
      dateRequested,
      dateOfReleased,
      certificateData,
      status: "Pending",
    });

    const resident = await Resident.findById(residentId);

    mail.certificateProcessingMailer(
      resident?.emailAddress,
      resident?.fullName
    );

    res.status(200).json(certificates);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid certificate id" });
  }

  try {
    await Certificates.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "certificate deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such certificate" });
  }
};

const updateCertificate = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid certificate id" });
  }

  try {
    await Certificates.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    const certificate = await Certificates.findById(id);
    const resident = await Resident.findById(certificate?.residentId);

    const status = req.body.status;

    if (status === "Approved") {
      mail.certificateApprovedMailer(
        resident?.emailAddress,
        resident?.fullName
      );
    } else if (status === "Rejected") {
      mail.certificateRejectedMailer(
        resident?.emailAddress,
        resident?.fullName
      );
    }

    res.status(200).json({ message: "certificate updated successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such certificate" });
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  deleteCertificate,
  updateCertificate,
};
