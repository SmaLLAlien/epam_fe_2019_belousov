const ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    // eslint-disable-next-line no-console
    console.log(this.step);
    return this;
  },
};
ladder.up().up().down().showStep().up().up().showStep();
