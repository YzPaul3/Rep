/**
 * 编写一个程序，找到两个单链表相交的起始节点。
 * 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
 * 输出：Reference of the node with value = 8
 * 输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
 * 
 * 如果两个链表没有交点，返回 null.
 * 在返回结果后，两个链表仍须保持原有的结构。
 * 可假定整个链表结构中没有循环。
 * 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
 */

/**
 * Solution A
 * 标记法(简单但空间复杂度为O(n))
 * 两次遍历，先遍历一个链表，给链表中的每个节点都增加一个标志位，
 * 然后遍历另外一个链表，遍历到第一个已被标志过的节点为两链表相交的起始节点。
 * 时间复杂度：O(n), 空间复杂度：O(n)
 */

var getIntersectionNode1 = function(headA, headB) {
    while (headA) {
        headA.flag = true;
        headA = headA.next;
    }
    while (headB) {
        if (headB.flag) return headB;
        headB = headB.next;
    }
    return null;
}



/**
 * Solution B
 * 双指针法
 * 如果 A、B 两链表相交，则 A 、B 自相交点往后的链表是一致的。
 * 我们可以尝试消除 A、B 链表的长度差，同步遍历上图中的方框里的节点，判断是否有相同节点，若有相同则是两链表相交，返回第一个相同节点 即可。否则返回 null ，两链表不相交。
 * 时间复杂度：O(n), 空间复杂度：O(1)
 */

var getIntersectionNode2 = function(headA, headB) {
    var pA = headA;
    var pB = headB;
    while (pA || pB) {
        if (pA === pB) return pA;
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return null;
}