const toCamelCaseVar = (variable) => {
  return variable.replace(/_+[a-zA-Z]/g,(m, i) => {
    if(i) return (m.match(/[a-zA-Z]/)[0].toUpperCase());
    else return m;
  })
}


const toCamelCase = variable => variable.replace(/([^_])(?:_+)([^_])/g, (m, s1, s2) => s1 + s2.toUpperCase())
const varName = '__aaa__bbb_ccc__';
console.log(toCamelCase(varName));