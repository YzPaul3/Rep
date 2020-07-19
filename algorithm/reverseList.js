/*

反转链表
示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

*/

// 递归
var reverseList = function(head) {
    if(!head || !head.next) return head;
    let next = head.next;
    let res = reverseList(head.next);
    next.next = head;
    head.next = null;
    return res;
}

// 迭代
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while(curr) {
        // step1: 
        
        let next = curr.next; // 记录断掉的节点（当前节点的下一个节点）
        curr.next = prev; // 将当前节点指向下个节点的指针赋值为前一个节点

        // step2:
        // prev 和 curr 两个指针一起向后移动一个单位
        prev = curr;
        curr = next;
    }
    return prev;
}