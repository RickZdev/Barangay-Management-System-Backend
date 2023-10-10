const getResidentFullName = ({ lastName, firstName, middleName, suffix }) => {
  let fullName;
  if (middleName && suffix) {
    fullName = `${firstName} ${middleName} ${lastName} ${suffix}`;
  } else if (!middleName && suffix) {
    fullName = `${firstName} ${lastName} ${suffix}`;
  } else if (middleName && !suffix) {
    fullName = `${firstName} ${middleName} ${lastName}`;
  } else {
    fullName = `${firstName} ${lastName}`;
  }

  return fullName;
};

module.exports = {
  getResidentFullName,
};
