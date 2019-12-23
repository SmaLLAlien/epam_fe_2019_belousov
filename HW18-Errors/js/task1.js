function calculateFibByRecursion(sequenceLength) {
  if (sequenceLength <= 1) {
    return sequenceLength;
  } else {
    return calculateFibByRecursion(sequenceLength - 1) + calculateFibByRecursion(sequenceLength - 2);
  }
}

function calculateFibByCycle(sequenceLength) {
  if (sequenceLength === 0) {
    return 0;
  }
  if (sequenceLength === 1) {
    return 1;
  }
  if (sequenceLength > 2) {
    let prev = 0;
    let next = 1;
    for (let i = 1; i < sequenceLength; i++) {
      const temp = next;
      next = prev + temp;
      prev = temp;
    }
    return next;
  }
}

function banchMarck(funck, times = 1, sequenceLength) {
  let timeSum = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    funck(sequenceLength);
    const end = performance.now();
    timeSum += (end - start);
  }
  /* eslint no-console: 0*/
  console.log(timeSum / times, `${funck.name} time`);
}
banchMarck(calculateFibByCycle, 5, 20);
banchMarck(calculateFibByRecursion, 5, 20); // dont try big numbers in sequenceLength

/*
Recursive method is slower then cycle, because every time, when function is called - execution context
(where function lexical environment is saved) is created, until
function execution is completed.
So when recursion is used. Every time, when function call itself, execution context is created FOR EACH CALL.
After last function call process reversed. Each function gets her context and LE, then executed and leaves stack.
It is more complex then cycle in performance.
By the way at this example some of the functions executed more then one times (twice or even thrice)
 */
