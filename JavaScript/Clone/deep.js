function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}

function deepClone (obj) {
  if (!isObject(obj)) {
    throw new Error('not a Object')
  }
  let newObj = Array.isArray(obj) ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2

let a = [1,2,3,4]
console.log(Reflect.ownKeys(a))
// (5) ["0", "1", "2", "3", "length"]
console.log(Object.keys(a))
// (4) ["0", "1", "2", "3"]
