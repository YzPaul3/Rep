/**
 * 中序遍历二叉树
 * 迭代实现
 */

var inorderTraversal = function (root) {
    var list = [];
    var stack = [];
    var node = root;
    while (node || stack.length) {
        while (node) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        list.push(node.val);
        node = node.right;
    }
    return list;
}
