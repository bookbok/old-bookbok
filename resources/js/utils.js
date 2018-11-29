export function isEmpty(obj) {
    if(Array.isArray(obj)) {
      return obj.length <= 0;
    } else {
      return !obj || !Object.keys(obj).length;
    }
}
