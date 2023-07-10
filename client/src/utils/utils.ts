export function filterPropertiesWithValues(json: Object) {
  return Object.entries(json)
    .filter(([key, value]) => value !== "")
    .reduce((obj, [key, value]) => {
      obj[key as keyof Object] = value
      return obj
    }, {})
}

export function isEmptyObject(obj: Object) {
  return Object.keys(obj).length === 0;
}