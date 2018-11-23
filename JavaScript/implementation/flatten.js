function simpleNormalizeChildren (children) {
    for (let i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            return Array.prototype.concat.apply([], children)
        }
    }
    return children
}

let children = [[1, 3, ['inner', 'asd']], 'string', 121, [1, 3, ['inner', 'asd']]]

let a = simpleNormalizeChildren(children)

// console.log(a)


function flatten (arr) {
    let res = []
    if (Array.isArray(arr)) {
        arr.forEach(item => {
            res = res.concat(flatten(item))
        })
    } else {
        res = res.concat(arr)
    }
    return res
}

let b = flatten(children)

console.log(b)