function minSubArrayLen(nums, sum) {
  let total = 0;
  let start = 0;
  let end = 0;
  let minLen = Infinity;

  while (start < nums.length) {
    // if current window doesn't add up to the given sum then
    // move the window to right
    if (total < sum && end < nums.length) {
      total += nums[end];
      end++;
    } else if (total >= sum) {
      // if current window adds up to at least the sum given then
      // we can shrink the window
      minLen = Math.min(minLen, end - start);
      total -= nums[start];
      start++;
    } else {
      // current total less than required total but we reach the end, need this or else we'll be in an infinite loop
      break;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
