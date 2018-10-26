let nodeIndex = 0
let nodePatches
const patch = function (el, patches) {
    nodePatches = patches
    walkNode(el)
}

function walkNode(el) {
    let currentPatch = nodePatches[nodeIndex++]
    let childNodes = el.childNodes
    childNodes.forEach(child => walkNode(child))
    if (currentPatch) {
        doPatch(el, currentPatch)
    }
}

function doPatch(el ,patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                for(let key in patch.attrs) {
                    let value = patch.attrs[key]
                    if (value) {
                        setAttr(el, key, value)
                    } else {
                        el.removeAttribute(key)
                    }
                }
                break
            case 'TEXT':
                el.textContent = patch.text
                break
            case 'REPLACE':
                let newNode = (patch.newNode instanceof VirtualDom) ? createRealDom(patch.newNode) : document.createTextNode(patch.newNode)
                el.parentNode.replaceChild(newNode, el)
                break
            case 'REMOVE':
                el.parentNode.removeChild(el)
                break
            default:
                break
        }
    })

}
