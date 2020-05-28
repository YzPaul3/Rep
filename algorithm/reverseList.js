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
    
}