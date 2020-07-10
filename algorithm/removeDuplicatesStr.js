/**
 * 
 * 删除字符串中出现次数 >= 2 次的相邻字符 
 * 输入："abbbaca"
 * 输出："ca"
 * 解释："abbbaca" => "aaca"=>"ca"
 * 
 */

var removeDuplicate = function (s) {
    let stack = [];
    let stackTop
    let walk
    for (let i = 0; i < s.length;) {
        stackTop = stack[stack.length - 1];
        walk = s[i];
        // 字符串中出现了相邻字符
        if (walk === stackTop) {
            stack.pop();
            // 移除栈顶字符
            // 移动指针, 直到指向下一个不同的字符
            while (s[i] === stackTop) {
                i++;
            }
        } else {
            stack.push(walk);
            i++;
        }
    }
    return stack.join('');
};

let str = 'deeedbbcccbdaa';
console.log(removeDuplicate(str));