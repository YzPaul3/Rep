class VirtualDom {
    constructor(type, props, children) {
        this.type = type
        this.props = props
        this.children = children
    }
}

const createVirtualDom = function(type, props, children) {
    return new VirtualDom(type, props, children)
}

const setAttr = function(node, prop, value) {
    let type = node.nodeType
    switch (prop) {
        case 'value':
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value
            } else {
                node.setAttribute(prop, value)
            }
            break
        case 'style':
            node.style.cssText = value
            break
        default:
            node.setAttribute(prop, value)
            break
    }
}

const createRealDom = function(vdom) {
    let el = document.createElement(vdom.type)
    for (let key in vdom.props) {
        setAttr(el, key, vdom.props[key])
    }
    vdom.children.forEach(child => {
        child = child instanceof VirtualDom ? createRealDom(child) : document.createTextNode(child)
        el.appendChild(child)
    })
    return el
}

const render = function (target, el) {
    target.appendChild(el)
}

