describe('order.js', () => {
  let order;
  let order2;
  let pizza;
  beforeEach(() => {
    order = new Order();
    order2 = new Order();
    pizza = new Pizza(['bacon', 'pepperoni', 'olives', 'corn'], 'small');
  });
  describe('order', () => {
    it('toBeObject', () => {
      expect(order.pizzas).toBeDefined();
    });
    it('can be instantiated', () => {
      expect(order).toBeTruthy();
      expect(order2).toBeTruthy();
      expect(order).toEqual(order2);
      expect(order.constructor.name).toContain('Order');
    });
    it('instantiates unique object', () => {
      expect(order).not.toBe(order2);
    });
    it('has common operations', () => {
      expect(order.addPizza).toBeDefined();
      expect(order.removePizza).toBeDefined();
      expect(order.totalPrice).toBeDefined();
    });
  });

  describe('addPizza()', () => {
    it('should add pizza to pizzas', () => {
      order.addPizza(pizza);

      expect(order.pizzas.length).toBe(1);
    });
    it('returns pizzas', () => {
      order.addPizza(pizza);

      expect(order.pizzas[0]).toEqual(pizza);
      expect(order.pizzas[0]).toEqual(jasmine.anything());
      expect(order.pizzas[0]).toBeObject(); // with a third party matcher!
    });
  });

  describe('removePizza()', () => {
    it('should remove pizza', () => {
      order.addPizza(pizza);
      order.removePizza(pizza);

      expect(order.pizzas.length).toBe(0);
      expect(order.pizzas[0]).not.toEqual(jasmine.anything());
    });
  });

  describe('totalPrice()', () => {
    beforeEach(() => {
      order.addPizza(pizza);
    });

    it('should handles 0 price', () => {
      const pizzaPriseSpy = spyOnProperty(pizza, 'pizzaPrice', 'get').and.returnValue(0);
      expect(() => order.totalPrice).toThrowError('Pizza can\'t cost 0 USD');
    });
    it('should handles undefined price', () => {
      const pizzaPriseSpy = spyOnProperty(pizza, 'pizzaPrice', 'get').and.returnValue(undefined);

      expect(() => order.totalPrice).toThrowError('Pizza must have a price');
    });
    it('should handles null price', () => {
      const pizzaPriseSpy = spyOnProperty(pizza, 'pizzaPrice', 'get').and.returnValue(null);

      expect(() => order.totalPrice).toThrowError('Pizza must have a price');
    });
    it('should handles normal price', () => {
      const pizzaPriseSpy = spyOnProperty(pizza, 'pizzaPrice', 'get').and.returnValue(20);

      expect(order.totalPrice).toBe(20);
    });
  });
});
