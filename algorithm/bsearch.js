function binarysearch (A, x) {
    let l = 0, //查询范围左边界
        r = A.length - 1 // 查询范围右边界
        guess // 猜测位置
        while (l <= r) {
            guess = Math.floor( (l + r)/2 )
            // 循环不变式
            // guess是l，r的中间位置
            if (A[guess] === x) return guess
            else if (A[guess] > x) r = guess -1
            else l = guess + 1
        }
        return -1
}

// 一道面试题
// 一种玻璃小球，从一定高度扔下去撞到水泥地面上会摔碎
// 对于这种小球，摔碎的高度是一个固定值，高于这个高度会摔碎，小于这个高度不会摔碎
// 对于一栋100层的建筑，和两个小球，能不能试出这个小球摔碎的临界层数

// 快慢指针，10层10层找，1层1层找