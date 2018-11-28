export function isObjectEmpty(obj){
  return !obj || !Object.keys(obj).length;
}

export function isListEmpty(list) {
  return list.length <= 0;
}
