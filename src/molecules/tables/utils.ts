export function normalizeName(name: string) {
  let returnName = name;
  // remove is from the begining of the string if it exists
  if (returnName.startsWith('is')) {
    returnName = returnName.slice(2);
  }
  // seperate camelCase
  returnName = returnName.replace(/([A-Z])/g, ' $1');
  // make first letter uppercase
  returnName = returnName.charAt(0).toUpperCase() + returnName.slice(1);
  return returnName;
}
