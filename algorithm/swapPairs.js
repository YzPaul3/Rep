/**
 * 
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例:

给定 1->2->3->4, 你应该返回 2->1->4->3.

 * 
 * 
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 
 * 解法1:迭代
 * 
 * 解法一：非递归
  时间复杂度：O(n)
空间复杂度：O(1)
思路
前面添加一个哨兵节点(下面示例中单引号节点)
三个节点外加一个哨兵节点之间作指针指向变换操作
状态1： ['0' -> 1 -> 2] -> 3 -> 4
经过指针转换
0 -> 2
1 -> 3
2 -> 1
转化为
状态2： 0 -> 2 -> ['1' -> 3 -> 4]
经过指针转换
1 -> 4
3 -> null
4 -> 3
转化为
状态3: 0 -> 2 -> 1 -> 4 -> 3

 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    let tHead = new ListNode(0);
    tHead.next = head;
    let prev = tHead;
    while(prev.next && prev.next.next) {
        let start = prev.next;
        let end = start.next;
        prev.next = end;
        start.next = end.next;
        end.next = start;
        prev = start;
    }
    return tHead.next;
};



/**
 * 
 * 解法2
 * 递归
 * 
 * 时间复杂度：O(n)
空间复杂度：O(n)
思路
终止
同解法一：至少三个节点之间才可以互换
只有一个节点或没有节点，返回此节点
交换
设需要交换的两个节点为head、next
head -> next -> c -> ...
head -> c -> ... && next -> head
next -> head -> c -> ...
head 连接( -> )后面交换完成的子链表
next 连接( -> )head 完成交换
对子链表重复上述过程即可

 */
var swapPairs = function(head) {
    if (!head || !head.next) {
        return head;
    }
    let start = head.next;
    head.next = swapPairs(start.next);
    start.next = head;
    return start;
};