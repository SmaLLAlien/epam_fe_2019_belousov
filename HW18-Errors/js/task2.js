function parseJSON(json) {
  try {
    const obj = JSON.parse(json);
    return obj;
  }
  catch (error)
  {
    if (error.name === 'SyntaxError') {
      return null;
    } else {
      throw error;
    }
  }
}

parseJSON('{"role": "student", "company": "epam", "mentor":"cool mentor"}');
parseJSON('role: student, company: epam, mentor:cool mentor');
