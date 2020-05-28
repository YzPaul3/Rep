/*

给定一个字符串，逐个翻转字符串中的每个单词。

示例 1：

输入: "the sky is blue"
输出: "blue is sky the"
示例 2：

输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
示例 3：

输入: "a good   example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
说明：

无空格字符构成一个单词。
输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

*/

// 使用API
var reverseWords = function(s) {
    if (!s) return '';
    return s.trim().split(' ').filter(item=> item).reverse().join(' ');
};

// 不使用API，双端队列
var reverseWords = function (s) {
    let left = 0;
    let right = s.length - 1;
    let word = '';
    let queue = [];
    while (s.charAt(left) === ' ') {
        left++;
    }
    while (s.charAt(right) === ' ') {
        right--;
    }
    while (left <= right) {
        let char = s.charAt(left);
        if (char === ' ' && word) {
            queue.unshift(word);
            word = '';
        } else if (char !== ' ') {
            word += char;
        }
        left++;
    }

    queue.unshift(word);
    return queue.join(' ');
}


// + 正则
var reverseWords = function (s) {
    return s.trim().split(/\s+/).reverse().join(' ');
}


