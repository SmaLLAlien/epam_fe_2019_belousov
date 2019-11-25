let message;
const login = 'Maks';
switch (login) {
  case 'Maks':
    message = `Hi, ${login}`;
    break;
  case 'Serg':
    message = `Hi, ${login}`;
    break;
  case '':
    message = 'Hi, undefined';
    break;
  default:
    message = '';
}

console.log(message);

const message2 = (login === 'Maks')
  ? `Hi, ${login}`
  : (login === 'Serg')
    ? `Hi, ${login}`
    : (login === '')
      ? 'Hi, undefined'
      : '';

console.log(message2);
