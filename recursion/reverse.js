function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
  // 	return str[str.length-1] + reverse(str.slice(0,-1))
}
