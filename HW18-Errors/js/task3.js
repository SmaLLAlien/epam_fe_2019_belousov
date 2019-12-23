function DataMissing(property) {
  this.name = 'DataMissing';
  this.message = `${property} is missing`;
  this.toString = () => `${this.name}: ${this.message}`;
}

DataMissing.prototype = Object.create(SyntaxError.prototype);

function parseJSON(json) {
  try {
    const obj = JSON.parse(json);
    if (!obj.name) {
      throw new DataMissing('name');
    } else if (!obj.company) {
      throw new DataMissing('company');
    }
    return obj;
  } catch (error) {
    if (error.name === 'SyntaxError') {
      throw new Error('Bad Json');
    } else {
      throw error;
    }
  }
}

window.onerror = function (errorMsg, url, lineNumber) {
  /* eslint no-console: 0*/
  alert(`${errorMsg} at line ${lineNumber} in ${url}`);
  return true;
};

parseJSON('{"name":"student", "company":"epam"}');
parseJSON('name:student, company:epam');
parseJSON('{"name":"student", "surname":"cool"}');
