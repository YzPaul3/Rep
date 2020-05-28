function List () {
    // 节点
    let Node = function (element) {
        this.element = element
        this.next = null
    }
    // 初始头节点为 null
    let head = null

    // 链表长度
    let length = 0
    // 操作
    this.getList = function() {return head}

    // 判断链表中是否存在某节点
    this.search = function(element) {
        let p = head
        if (!p) {
            return false
        }
        while(p) {
            if (p.element === element) {
                return true
            }
            p = p.next
        }
        return false
    }


    // 追加节点
    this.append = function(element) {
        let node = new Node(element)
        let p = head
        if (!head) {
            head = node
        } else {
            while(p.next) {
                p = p.next
            }
            p.next = node
        }
    }

    // 在某位置插入节点
    this.insert = function(position, element) {
        let node = new Node(element)
        if (position >= 0 && position <= length) {
            let prev = head
            let curr = head
            let index = 0
            if (position === 0) {
                node.next = head
                head = node
            } else {
                while(index < position) {
                    prev = curr
                    curr = curr.next
                    index++
                }
                prev.next = node
                node.next = curr
            }
            length += 1
        } else {
            return
        }

    }
    this.remove = function(element){
        let p = head
        let prev = head
        if (!head) return
        while(p) {
            if (p.element === element) {
                p = p.next
                prev.next = p
            } else {
                prev = p
                p = p.next
            }
        }
    }
    this.isEmpty = function(){}
    this.size = function(){}
}


/***
将两个升序链表合并为一个新的升序链表并返回
新链表是通过拼接给定的两个链表的所有节点组成的。

示例：
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

***/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeList(l1, l2) {
    if (l1 === null) return l2
    if (l2 === null) return l1
    if (l1.val <= l2.val) {
        l1.next = mergeList(l1.next, l2)
        return l1
    } else {
        l2.next = mergeList(l2.next, l1)
        return l2
    }
}

