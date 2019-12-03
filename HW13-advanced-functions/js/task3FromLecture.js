let obj = {
  name: 'Ivan',
  surname: 'Baraban',
  age: 42,
  score: 12,
};

let obj2 = {
  name: 'Petya',
  surname: 'Padawan',
  age: 52,
  score: 28,
};

function patchObject(obj, ...rest) {
  let object = {
    name: 'unknown',
    surname: 'unknown',
    age: 0,
    score: 0.1,
  };
  if (obj) {
    object = {...obj};
  }
  rest.forEach((func) => {
    object[func.name] = func.bind(object);
  });
  return object;
}

function hello(greeting) {
  return `${greeting} my name is ${this.name}`;
}

function showSuccessKoef() {
  return this.age / this.score;
}

function myAge() {
  if (!this.age) {
    return 'age is unavailable';
  }
  return this.age;
}

const greetings = hello;
const showSuccess = showSuccessKoef;
const howOldAreYou = myAge;

obj = patchObject(obj, greetings, howOldAreYou, showSuccess);
obj2 = patchObject(obj2, greetings, howOldAreYou);
const obj3 = patchObject(null, greetings, howOldAreYou, showSuccess);

obj.myAge();
obj2.myAge();
obj3.myAge();
// console.log(obj.myAge()); // 42
// console.log(obj.showSuccessKoef()); // 3.5
// console.log(obj.hello('yo')); // yo, my name is Ivan
// console.log(obj2.myAge()); // 52
// console.log(obj2.hello('Hi sir')); // Hi sir, my name is Petya
// console.log(obj3.hello('Good Day')); // Good Day, my name is unknown
// console.log(obj3.showSuccessKoef()); // 0
// console.log(obj3.myAge()); // age is unavailable
