const pattern = require("./SQLIA_list");

function zAlgorithm(str) {
  let n = str.length;
  let zArray = Array(n).fill(0);
  let left = 0;
  let right = 0;

  for (let i = 1; i < n; i++) {
    if (i > right) {
      left = right = i;
      while (right < n && str[right] === str[right - left]) {
        right++;
      }
      zArray[i] = right - left;
      right--;
    } else {
      let k = i - left;
      if (zArray[k] < right - i + 1) {
        zArray[i] = zArray[k];
      } else {
        left = i;
        while (right < n && str[right] === str[right - left]) {
          right++;
        }
        zArray[i] = right - left;
        right--;
      }
    }
  }
  return zArray;
}

const checkForSQLIA = (input) => {
  input = input.trim().toLowerCase();
    for(let i=0; i<pattern.length; i++){
        let element = pattern[i].toLowerCase();
        let string_to_test = element + '~' + input;
        let arr = zAlgorithm(string_to_test);
        if(arr.includes(element.length)){
            return true;
        }
    }
    return false;
};

exports = module.exports = checkForSQLIA;