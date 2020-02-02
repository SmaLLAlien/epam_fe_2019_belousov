const mediator = (function () {
  let subscribers = {};

  return {

    subscribe(event, callback) {
      subscribers[event] = subscribers[event] || [];
      subscribers[event].push(callback);
    },

    unsubscribe(event, callback) {
      let subscriberIndex;

      if (!event) {
        subscribers = {};
      } else if (event && !callback) {
        subscribers[event] = [];
      } else {
        subscriberIndex = subscribers[event].indexOf(callback);
        if (subscriberIndex > -1) {
          subscribers[event].splice(subscriberIndex, 1);
        }
      }
    },

    publish(event, data) {
      if (subscribers[event]) {
        subscribers[event].forEach((callback) => {
          callback(data);
        });
      }
    },
  };
} ());

export default mediator;
