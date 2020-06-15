/*

给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：

给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.
说明：
给定的 n 保证是有效的。

进阶：
你能尝试使用一趟扫描实现吗？

*/

var removeNthFromEnd = function(head, n) {
    let fast = head;
    let slow = head;
    while (n) {
        fast = fast.next;
        n--;
    }

    // 注意特殊情况，链表长度为n，删除倒数第n个节点即删除链表第一个节点
    if (!fast) {
        return head.next;
    }

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return head;
}
