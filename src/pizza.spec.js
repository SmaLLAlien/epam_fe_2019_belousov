describe('pizza.js', () => {
  let pizza;
  let pizzaNoSize;
  let pizzaNoToppings;

  beforeEach(() => {
    pizza = new Pizza(['bacon', 'pepperoni', 'olives', 'corn'], 'small');
    pizzaNoSize = new Pizza(['bacon', 'pepperoni']);
    pizzaNoToppings = new Pizza([], 'medium');
  });

  describe('pizza', () => {
    it('should has common operations', () => {
      expect(pizza.pizzaPrice).toBeDefined();
      expect(pizza.toppingsPrice).toBeDefined();
    });

    it('instantiates unique object', () => {
      expect(pizza).not.toBe(pizzaNoSize);
    });

    it('should initialize toppings, size ', () => {
      expect(toppings).toBeDefined();
      expect(toppings).toBeObject();
      expect(Object.keys(toppings).length).toBeGreaterThan(0);

      expect(size).toBeDefined();
      expect(size).toBeObject();
      expect(Object.keys(size).length).toBeGreaterThan(0);
    });
  });

  describe('pizzaPrice()', () => {
    it('should handle pizza with size', () => {
      const toppingsPriceSpy = spyOnProperty(pizza, 'toppingsPrice').and.returnValue(10);

      expect(pizza.pizzaPrice).toBeGreaterThan(0);
      expect(pizza.pizzaPrice).toBeNumber();
    });

    it('should handle no size pizza', () => {
      const toppingsPriceSpy = spyOnProperty(pizzaNoSize, 'toppingsPrice').and.returnValue(10);

      expect(() => pizzaNoSize.pizzaPrice).toThrowError('Size can\'t find');
    });
  });

  describe('toppingsPrice()', () => {
    it('should handle pizza with toppings', () => {
      expect(pizza.toppingsPrice).toBeGreaterThan(0);
      expect(pizza.toppingsPrice).toBeNumber();
    });

    it('should handle pizza with no toppings', () => {
      expect(pizzaNoToppings.toppingsPrice).toBe(0);
    });

    it('should handle pizza with object toppings', () => {
      const newTopping = 'chicken';
      const pizzaExcessToppings = new Pizza([newTopping], 'medium');

      expect(() => pizzaExcessToppings.toppingsPrice).toThrowError(`Topping ${newTopping} can't find`);
    });
  });
});
