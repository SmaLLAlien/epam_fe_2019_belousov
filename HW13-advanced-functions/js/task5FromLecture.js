function zero() {
  const x = 0;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function one() {
  const x = 1;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function two() {
  const x = 2;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function three() {
  const x = 3;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function four() {
  const x = 4;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function five() {
  const x = 5;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function six() {
  const x = 6;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function seven() {
  const x = 7;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function eight() {
  const x = 8;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function nine() {
  const x = 9;
  if (arguments[0]) {
    // if it takes other functions as argument
    return arguments[0](x);
  }
  return x; // if it is called by other function
}

function plus() {
  const y = arguments[0]; // return from function argument
  return function () {
    // arguments[0] - is taken from function that calls multiply
    return arguments[0] + y;
  };
}

function minus() {
  const y = arguments[0]; // return from function argument
  return function () {
    // arguments[0] - is taken from function that calls multiply
    return arguments[0] - y;
  };
}

function multiply() {
  const y = arguments[0]; // return from function argument
  return function () {
    // arguments[0] - is taken from function that calls multiply
    return arguments[0] * y;
  };
}

function divide() {
  const y = arguments[0]; // return from function argument
  return function () {
    // arguments[0] - is taken from function that calls multiply
    return arguments[0] / y;
  };
}

seven(multiply(five())); // 35
four(plus(nine())); // 13
eight(minus(three())); // 5
six(divide(two())); // 3
one(divide(zero())); // Infinity
