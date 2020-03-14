import { ToHoursPipe } from './to-hours.pipe';

describe('ToHoursPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ToHoursPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });


  describe('transform()', () => {
    it('should convert input time', () => {
      const result = pipe.transform(207);

      expect(result).toBe('3h 27min');
    });
  });
});
