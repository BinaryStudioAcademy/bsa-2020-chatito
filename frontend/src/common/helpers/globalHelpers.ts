export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const listToString = (namesList: string[], maxUsers = 3) => {
  let retString = namesList.reduce((prevValue, usName, index) => {
    if (index >= maxUsers) {
      return prevValue;
    }
    return prevValue + capitalize(usName) + (index + 1 === maxUsers ? ' ' : ', ');
  }, '');

  if (namesList.length > maxUsers) {
    retString += `and ${namesList.length - maxUsers} others...`;
  }

  return retString;
};

export const areEqualStrings = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
