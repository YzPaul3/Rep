/* 给定一个链表，判断链表中是否有环。*/

// 遍历加标志位
let hasCycle = function(head) {
    while(head) {
        if (head.flag) {
            return true
        }
        head.flag = true
        head = head.next
    }
    return false
};


// 快慢指针
let hasCycle = function(head) {
    if (!head || !head.next) {
        return false
    }
    let fast = head.next.next
    let slow = head.next
    while(fast) {
        if (fast === slow) return true
        if (!fast.next) return false
        fast = fast.next.next
        slow = slow.next
    }
    return false
};