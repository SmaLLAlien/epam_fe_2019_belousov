function validateTitle(title) {
  // array of allowed symbols code
  const charCodeArr = [32, 33, 44, 45, 46, 58, 63];
  let bigLetter = false;
  let deprecatedSymbols = false;
  let length = false;

  // check if title is a string
  if (typeof title !== 'string') {
    return 'Incorrect input data';
  }

  length = isLengthCorrect(title);
  bigLetter = isBigLetter(title[0]);

  // check if the first letter is big or title is required length
  if (!bigLetter || !length) {
    return 'INVALID';
  }

  // get array without small letters
  const titleArr = title.toUpperCase().split('');
  deprecatedSymbols = isDeprecatedSymbols(titleArr, charCodeArr);

  if (deprecatedSymbols) {
    return 'INVALID';
  } else {
    return 'VALID';
  }
}

// check if parameter is a big letter
function isBigLetter(letter) {
  if (letter.charCodeAt(0) < 65 || letter.charCodeAt(0) > 90) {
    return false;
  }
  return true;
}

// check for deprecated symbols
function isDeprecatedSymbols(arrToCheck, allowedSymbolsArr) {
  let deprecatedSymbols = false;
  arrToCheck.forEach((elem) => {
    if (!isBigLetter(elem)) {
      if (allowedSymbolsArr.indexOf(elem.charCodeAt(0)) === -1) {
        // it is deprecated symbol
        deprecatedSymbols = true;
      } else {
        // allowed symbol
        deprecatedSymbols = false;
      }
    }
  });
  return deprecatedSymbols;
}

// check title length
function isLengthCorrect(title) {
  if (title.length < 2 || title.length > 20) {
    return false;
  }

  return true;
}

validateTitle('s');
validateTitle('Title!');
validateTitle('12title');
validateTitle('Title?');
validateTitle(false);
