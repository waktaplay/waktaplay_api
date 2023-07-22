function loadJSON(object: any) {
  return JSON.parse(JSON.stringify(object))
}

export { loadJSON }