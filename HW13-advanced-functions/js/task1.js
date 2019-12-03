const complexFunction = function (arg1, arg2) {
  return arg1 + arg2;
};
const cachedFunction = cache(complexFunction);

function cache(func) {
  // contains arrays of arguments and result previous functions;
  const cacheArr = [];

  return function (...rest) {
    // get index of array from cache if called function has same parameters as one of the previous
    const indexCachedArr = getIndexEqualArray(cacheArr, rest);
    if (indexCachedArr) {
      // it is cache
      const arr = cacheArr[indexCachedArr];
      // get last elem, that is result
      return arr[arr.length - 1];
    } else {
      // it is new
      const result = func(...rest); // calculating result
      const argsArr = [...rest]; // write arguments to new array
      argsArr.push(result); // add result
      cacheArr.push(argsArr);
      return result;
    }
  };
}

function getIndexEqualArray(cacheArr, restArr) {
  let indexEqualArray = null; // index of equal array from cache
  cacheArr.forEach((arrOfArguments, index) => {
    let check = 0; // counter equivalent arguments of two arrays
    for (let i = 0, len = arrOfArguments.length - 1; i < len; i++) {
      if (arrOfArguments[i] === restArr[i]) {
        // count equivalent elements on the same position
        check++;
      }
    }
    // arrOfArguments.length - 1: because last element is result
    if (check === arrOfArguments.length - 1 && arrOfArguments.length - 1 === restArr.length) {
      indexEqualArray = index.toString(); // because array index starts from 0
      return true;
    }
  });
  if (indexEqualArray) {
    return indexEqualArray;
  }
  return false;
}

cachedFunction('foo', 'bar');
cachedFunction('foo', 'bar');
cachedFunction('foo', 'bar2');
