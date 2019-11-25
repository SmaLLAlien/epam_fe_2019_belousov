let age = 12;
if (age > 5) {
  age = 5;
  console.log('more 5');
} else if (age < 10) {
  console.log('less 5');
}
/* The construction "if-else if-else" works from top (from the first "if").
 And if one of the conditions is truthy then statement after this "condition" is executed and that`s all.
Other conditions on the same level with they statements will be ignored.
In the example higher first condition is true, because 12 > 5, so its statement was executed and next condition "age < 10" was ignored.
 */
