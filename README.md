### Transactr
## Inspiration
Credit cards provide users with credit card statements, something that helps you keep track of everything from where you made a purchase to much money you spent. As high school students, we don't have credit cards, and use cash on a day to day basis, but can't keep track of how much money we spend.

## What it does

We use a pebble inside your wallet to track when your wallet is opened. When it is, you get a text on your phone asking if you made a transaction, and how much you spent, to show you how much cash you are spending, which in turn is relayed on a webapp that shows you where, when, and how much cash you are spending.

## How we built it

We used the pebble accelerometer data to detect when the wallet is opened, used the verizon cloud api to create our webapp, used a node server to send twilio texts to your phone, and used aws to host our website to show what our app does.

## Challenges we ran into

Getting pebble accelerometer data to work through calibration took a lot of trial and error to get working correctly, since a wallet dropping and similar events should not trigger the text.

## What we learned

We learned JS to use the Pebble SDK, and learned how to use the Verizon cloud API.
