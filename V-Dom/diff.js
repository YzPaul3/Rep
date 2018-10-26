// 先序深度优先遍历
/*
规则： 同级对比
1、当节点类型相同时：对比属性，生成属性patch {type: 'ATTRS', attrs: {class: 'new-class'}}
2、新的节点不存在（删除了）：，生成patch {type: 'REMOVE', index: xxx}
3、节点类型不相同时：直接用新节点替换老节点，生成patch {type: 'REPLACE', newNode: newNode}
4、文本内容变化：生成patch {type: 'TEXT', text: newContent}
*/

const ATTRS = 'ATTRS'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const TEXT = 'TEXT'
let Index = 0 // 节点的索引

const diff = function (oldTree, newTree) {
    let patches = {}
    let index = 0
    walk(oldTree, newTree, index, patches)
    console.log(patches)
    return patches
}

function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, idx) => {
        walk(child, newChildren[idx], ++Index, patches)
    })
}

function isText(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}

// 遍历节点
function walk(oldNode, newNode, index, patches) {
    // 每个节点都有个补丁对象
    let currentPatch = []

    if (!newNode) {
        currentPatch.push({ type: REMOVE, index})
    } else if (isText(oldNode) && isText(newNode)) { // 判断是否文本
        if (oldNode !== newNode) {
            currentPatch.push({ type: TEXT, text: newNode })
        }
    } else if (oldNode.type === newNode.type) {
        // 先比较两个节点类型是否相同
        // 如果节点类型相同，则进行属性比较props
        let attrs = diffAttr(oldNode.props, newNode.props)
        // 如果属性有变化，则放入补丁
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs })
        }
        // 如果该节点有儿子，则遍历儿子节点
        diffChildren(oldNode.children, newNode.children, patches)
    } else {
        currentPatch.push({ type: REPLACE, newNode })
    }
    // 当前节点有变化，则放入大patches中
    if (currentPatch.length > 0) {
        patches[index] = currentPatch
    }
}

// 比较Props属性
function diffAttr(oldAttrs, newAttrs) {
    let patch = {}
    // 遍历属性找不同，存在老节点的某属性被删掉，newAttrs[key]是undefined的情况
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]
        }
    }

    // 新节点有新属性，而老节点没有的判断
    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key]
        }
    }
    return patch
}