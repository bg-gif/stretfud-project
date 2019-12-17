exports.formatLocation = ({ latitude, longitude }) => {
  return `${latitude}, ${longitude}`;
};

exports.removeItem = (arr, val) => {
  const itemIndex = arr.findIndex(element => element.name === val);
  if (itemIndex === -1) {
    return [...arr];
  }

  const frontArr = arr.slice(0, itemIndex);

  let backArr = [];
  if (itemIndex < arr.length - 1) {
    backArr = arr.slice(itemIndex, arr.length - 1);
  }

  return frontArr.concat(backArr);
};

exports.formatDate = str => {
  const newdate = new Date(str);
  const betterDate = newdate.toString();
  const bestDate = betterDate.slice(0, 28);
  return bestDate;
};
