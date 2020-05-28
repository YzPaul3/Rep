// const parser = require('@babel/parser');
// const traverse = require('@babel/traverse').default;
// const generator = require('@babel/generator').default;

// // 源码字符串
// const code = `
//   const nubmerFive = 5
// `;

// // 解析
// let AST = parser.parse(code)

// // 转换
// traverse(AST, {
//   enter(path) {
//     console.log(path.node.type, 'path.node.type')
//     if (path.node.type === 'Identifier') { // 如果node类型是标识符，就将name转成大写形式
//       path.node.name = path.node.name.toUpperCase()
//     }
//   }
// })

// // 生成
// const outputObj = generator(AST)
// const outputStr = outputObj.code;

// console.log(outputStr, 'outputStr')

