function threeSum(nums: number[]): number[][] {
  if (nums.length < 3) return [];
  const result: number[][] = [];

  for (let k = 0; k < nums.length - 2; k++) {
    let i = k + 1,
      j = nums.length - 1;
    while (i < j) {
      let sum = nums[k] + nums[i] + nums[j];
      if (sum > 0) {
        while (i < j && nums[j] === nums[--j]);
      } else if (sum < 0) {
        while (i < j && nums[i] === nums[++i]);
      } else {
        result.push([nums[k], nums[i], nums[j]]);
        while (i < j && nums[j] === nums[--j]);
        while (i < j && nums[i] === nums[++i]);
      }
    }
  }

  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

export default threeSum;
