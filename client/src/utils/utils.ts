export function filterPropertiesWithValues(json:object) {
  return Object.entries(json)
    .filter(([key, value]) => value !== "")
    .reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}