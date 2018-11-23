const path = require('path')
let res = path.join('foo/', 'baz/', '../bar'); // => "foo/bar"
console.log(res)


let norm = path.normalize('/foo/aaa/..//test')
console.log(norm)

let extName = path.extname('./aaa/test.js')

console.log(extName)
