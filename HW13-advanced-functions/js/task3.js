function sum(...rest) {
  return rest.reduce((sum, elem) => {
    return sum += elem;
  });
}

function mul(...rest) {
  return rest.reduce((mul, elem) => {
    return mul *= elem;
  });
}
// ES6
const applyAll = (func, ...rest) => func.call(null, ...rest);

// NO-ES6
function applyAllNoEs(func) {
  const rest = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
    rest[i - 1] = arguments[i];
  }
  return rest.reduce((prev, curr) => func.call(null, prev, curr));
}

applyAll(sum, 45,2);
applyAll(mul, 3,2);
applyAllNoEs(sum, 45,2);
applyAllNoEs(mul, 3,2);
