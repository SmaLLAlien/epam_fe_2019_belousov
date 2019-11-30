function tickets(queue) {
  const ticketCost = 25;
  /* consist of ticket cost and rest of change cashier has to give client. If it is equal to ticket cost, cashier pay off all change
  For example. Client give 100, and if cashier has only one 50, one 25 and nothing else, restAfterChange = 100 - 50 - 25; Client got his change;
  And if cashier has only one 50 and nth else, restAfterChange = 100 - 50 = 50. Ticket cost 25, so cashier has to give client 25 more;
   */
  let restAfterChange = 0;
  const cashbox = {
    hundreds: 0,
    fiftees: 0,
    quoters: 0,
  };

  for (let i = 0; i < queue.length; i++) {
    if (+queue[i] === 25) {
      // no need to give change
      cashbox.quoters++;
      queue[i] -= 25;
    } else if (+queue[i] === 100) {
      // check what cashier has and try to give change starting from 50;
      cashbox.hundreds++;
      restAfterChange = getChange(cashbox, queue[i]);
    } else {
      // check what cashier has and try to give change starting from 25;
      cashbox.fiftees++;
      restAfterChange = getChange(cashbox, queue[i]);
    }

    // check if cashier give all change
    if (restAfterChange > ticketCost) {
      return 'no';
    }
  }

  return 'yes';
}

function getChange(cashbox, value) {
  // check for strings;
  value = +value;
  if (cashbox.fiftees && value > 50) {
    cashbox.fiftees--;
    value -= 50;
  }

  while (cashbox.quoters && value > 25) {
    cashbox.quoters--;
    value -= 25;
  }
  return value;
}

tickets([25, 25, 50]); // yes
tickets([25, 100]); // no
tickets([25, 25, 50, 100]); // yes
tickets([25, 50, 100]); // no
tickets(['25', '25', '50', '100']);
