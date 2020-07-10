/**
 * 前序遍历二叉树
 * 迭代实现
 */

/**
 * 首先根入栈
将根节点出栈，将根节点值放入结果数组中
然后遍历左子树、右子树，因为栈是先入后出，所以，我们先右子树入栈，然后左子树入栈
继续出栈（左子树被出栈）…….
依次循环出栈遍历入栈，直到栈为空，遍历完成
 */

var preorderTraversal = function(root) {
    let list = [];
    let stack = [];
    if (root) {
        stack.push(root);
    }
    while(stack.length > 0) {
        let currentNode = stack.pop();
        list.push(currentNode.val);
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        if (currentNode.left !== null) {
            stack.push(currentNode.left);
        }
    }
    return list;
}
