function simpleNormalizeChildren (children) {
    for (let i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            return Array.prototype.concat.apply([], children)
        }
    }
    return children
}

let children = [[1, 3, ['inner', 'asd']], 'string', 121, [1, 3, ['inner', 'asd']]]

// let a = simpleNormalizeChildren(children)

// console.log(a)

// function flatten (arr) {
//     let res = []
//     if (Array.isArray(arr)) {
//         arr.forEach(item => {
//             res = res.concat(flatten(item))
//         })
//     } else {
//         res = res.concat(arr)
//     }
//     return res
// }

// function flattenA (arr) {
//     return arr ? arr.join().split(',') : arr
// }

// let b = flatten(children)


// console.log(b)


function func(arr = []) {
    let res = []
    arr.forEach(item => {
        if (Array.isArray(item)) {
            res = res.concat(func(item))
        } else {
            res = res.concat(item)
        }
    })
    return res;
}
console.log(func(children))