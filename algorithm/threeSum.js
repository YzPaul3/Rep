/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，
使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意： 答案中不可以包含重复的三元组。
示例：
给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
*/

var threeSum = function (nums) {
    // 处理特殊情况输入
    if (!nums || nums.length < 3) {
        return [];
    }
    // 将数据升序排序
    nums.sort((a, b) => a - b);
    // 左右指针
    let left;
    let right;
    let res = [];
    // 循环，计算 i，left，right三个位置之和
    for (let i = 0; i < nums.length - 2; i++) {
        // 如果数组内最小值已经大于0，则无解
        if (nums[i] > 0) {
            break;
        }
        // 去重
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        left = i + 1;
        right = nums.length - 1;
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                // 去重
                while (nums[left] === nums[left + 1]) {
                    left++;
                }
                while (nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return res;
}

/*
为了防止结果数组中加入重复的元素，我们可以将 nums 进行排序，
例如第一个数 nums[i] === nums[i-1] 时，nums[i] 作为第一个数与 nums[i-1] 作为第一个数得到的满足条件的三元组是一致的，
所以此时 nums[i] 我们将不再进行判断，避免重复三元组，当然这只是第一个数，第二个数与第三个数的判断也是类似的。

解题思路：
先数组排序，排序完后遍历数组，以 nums[i] 作为第一个数 first ，以 nums[i+1] 作为第二个数 second ，将 nums[nums.length - 1] 作为第三个数 last ，判断三数之和是否为 0 ，
    1) <0 ，则 second 往后移动一位（nums 是增序排列），继续判断
    2) >0 ，则 last 往前移动一位（nums 是增序排列），继续判断
    3) ===0 ，则进入结果数组中，并且 second 往后移动一位， last 往前移动一位，继续判断下一个元组
直至 second >= last 结束循环，此时， nums[i] 作为第一个数的所有满足条件的元组都已写入结果数组中了，
继续遍历数组，直至 i === nums.length - 2 (后面需要有 second 、 last )
*/