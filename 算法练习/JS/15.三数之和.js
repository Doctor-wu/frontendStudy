"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function threeSum(nums) {
    if (nums.length < 3)
        return [];
    var result = [];
    for (var k = 0; k < nums.length - 2; k++) {
        var i = k + 1, j = nums.length - 1;
        while (i < j) {
            var sum = nums[k] + nums[i] + nums[j];
            if (sum > 0) {
                while (i < j && nums[j] === nums[--j])
                    ;
            }
            else if (sum < 0) {
                while (i < j && nums[i] === nums[++i])
                    ;
            }
            else {
                result.push([nums[k], nums[i], nums[j]]);
                while (i < j && nums[j] === nums[--j])
                    ;
                while (i < j && nums[i] === nums[++i])
                    ;
            }
        }
    }
    return result;
}
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
exports.default = threeSum;
