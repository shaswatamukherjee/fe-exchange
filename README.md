# fe-exchange
This is a cryptocurrency exchange platform.

UI has three queues: 
   sell order queue: show 20 sell orders, order by price desc
   buy order queue: show 20 buy orders, order by price asc
   match queue: show latest 30 match, order by created time desc. click an item in the queue, should show the match info, including match time, price, sell order, buy order, etc.

The details are fetched from Backend services '/listOrders'. A random list of records are fetched from the service and based on that the queues are populated.

The procedure to populate a match queue is as below:

A order has the following fields: id:int, type:string(buy or sell), quantity:int, price:int, eg:
(1001, sell, 6, 480)
(1002, buy, 8, 470)
(1003, buy, 5, 460)
When there is a buy order whose price is higher than another sell order's price, these two orders can be matched.
The price is the average between the buy and the sell order.
When a match can be made with multiple orderes, the higher price will get first priority; If two orders have same price, the oldest order (with the lowest id) will have higher priority.
For example, an sell order with price 480 is higher than a buy order with price 470, so there two orders can not make a match.
Then a new order (1004, sell, 10, 460) comes, it will make match with order 1002, at price 465, the volume is min(10, 8) = 8; then with order 1003, price 460, volume is min(10 - 8, 5) = 2.
So the order book becomes like this:
(1001, sell, 6, 480)
(1003, buy, 3, 460)
note: terminology sometimes changes; sell orders can also be called 'ask' and buy orders can also be called 'bid'. we've chosen to stick to 'sell' and 'buy' here because it's easier to grasp.

To run the application, perform the following steps:
1. Take a clone of the application and run "npm install" to install the dependencies.
2. Take the backend code from the repo: https://github.com/btccom/fe-exercise-backend, run "npm install" and then run node app.js to start the server.
3. From the front end application, start the application by running "npm start" to start the browserify.
