const getCapitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

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

  return getCapitalizeWords(fullName);
};

module.exports = {
  getCapitalizeWords,
  getResidentFullName,
};
