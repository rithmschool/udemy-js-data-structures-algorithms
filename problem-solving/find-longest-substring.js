// O(2n)
// function findLongestSubstring(str){
//   let total = 0, i = 0, j = 0;
//   let set = new Set();
//   while(i < str.length && j < str.length){
//     if(!(set.has(str[j]))){
//       set.add(str[j++])
//       total = Math.max(total, j-i)
//     } else {
//       set.delete(str[i++])
//     }
//   }
//     return total;
// }

/**
 * O(n)
 * Approach: keep an object of { character: index + 1 } pairs.
 *  For each iteration, check if we've seen the character before.
 *  If so, restart the substring count at the index + 1.
 *  Then, update the longest based on the length from the current index
 *  to the current start. Lastly, update the index value of the char in the object
 * @param {String} str
 */
function findLongestSubstring(str) {
  let longest = 0;
  let seen = {};
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (seen[char]) {
      start = Math.max(start, seen[char]);
    }
    // index - beginning of substring + 1 (to include current in count)
    longest = Math.max(longest, i - start + 1);
    // store the index of the next char so as to not double count
    seen[char] = i + 1;
  }
  return longest;
}
