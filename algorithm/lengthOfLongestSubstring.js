/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
*/


/**
 * 
 * 解法一：维护数组
 * 思路： 使用一个数组来维护滑动窗口
 * 遍历字符串，判断字符是否在滑动窗口数组里,不在则 push 进数组
 * 在则删除滑动窗口数组里相同字符及相同字符前的字符，然后将当前字符 push 进数组
 * 然后将 max 更新为当前最长子串的长度
 * 遍历完，返回 max 即可
 * 
 */

var lengthOfLongestSubstring1 = function (s) {
    var arr = [];
    var max = 0;
    for (let i = 0; i < s.length; i++) {
        let index = arr.indexOf(s[i]);
        if (index !== -1) {
            arr.splice(0, index + 1);
        }
        arr.push(s[i]);
        max = Math.max(max, arr.length);
    }
    return max;
}

/**
 * 
 * 解法二：使用Map
 * 思路：
 * 使用 map 来存储当前已经遍历过的字符，key 为字符，value 为下标
 * 使用 i 来标记无重复子串开始下标，j 为当前遍历字符下标
 * 遍历字符串，判断当前字符是否已经在 map 中存在，存在则更新无重复子串开始下标 i 为相同字符的下一位置，此时从 i 到 j 为最新的无重复子串，更新 max ，将当前字符与下标放入 map 中
 * 最后，返回 max 即可
 * 
 */

var lengthOfLongestSubstring2 = function (s) {
    let map = new Map();
    let max = 0;
    for (let i = 0, j = 0; j < s.length; j++) {
        if (map.has(s[j])) {
            i = Math.max(i, map.get(s[j]) + 1);
        };
        map.set(s[j], j);
        max = Math.max(max, j - i + 1);
    }
    return max;
}

