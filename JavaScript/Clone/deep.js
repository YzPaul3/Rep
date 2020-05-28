
function deepClone (obj) {

  function isObject (o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let newObj = Array.isArray(obj) ? [...obj] : {...obj}
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let a = {
  b: [1, 2, 3, 4],
  c: 'something',
  d: {
    e: 'title',
    h: false,
    i: undefined
  },
  f: function(g) {
    g = 1;
  },
}

let n = deepClone(a)
// n.f('hello')
console.log(n)
