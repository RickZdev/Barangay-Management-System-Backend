const LoginAudit = require("../models/loginAuditModel");
const Admin = require("../models/adminModel");

const getLoginAudits = async (req, res) => {
  try {
    const loginAudits = await LoginAudit.find({}).sort({ createdAt: -1 });
    const admins = await Admin.find({});

    const logs = loginAudits
      .map((login) => {
        const admin = admins.find((admin) => admin._id.equals(login.adminId));
        if (admin) {
          return {
            adminUser: admin.adminUser,
            adminRole: admin.adminRole,
            loginTime: login.loggedIns,
          };
        } else {
          return null;
        }
      })
      .filter((login) => login !== null);

    res.status(200).json(logs);
  } catch (err) {
    res.status(404).json({ error: "admin doesn't exist!" });
  }
};

const getLoginAuditById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    const loginAudits = await LoginAudit.find({}).sort({ createdAt: -1 });

    const logs = loginAudits
      .filter((login) => {
        return login.adminId === id;
      })
      .map((login) => {
        return {
          adminUser: admin.adminUser,
          adminRole: admin.adminRole,
          loginTime: login.loggedIns,
        };
      });

    res.status(200).json(logs);
  } catch (err) {
    res.status(404).json({ error: "admin doesn't exist!" });
  }
};

module.exports = {
  getLoginAudits,
  getLoginAuditById,
};
