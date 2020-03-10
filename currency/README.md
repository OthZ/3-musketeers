# Currency 

"How much does it make in ... ?" Get your answer there by converting your currency.

# Library

Here are the library you'll need to use :

```
axios
money
ora
nock
jest
```
# How 

You just need to put the amount of money you want to convert in the new currency.
Don't forget to do "cd currency".

```
Example :

node cli.js 10 EUR USD 
You'll get : 10 EUR = 11.456 USD
```

# Code

In the libraries, you can see "const argv = process.argv.slice(2);" ; It's because we need to consider both 
currencies when you try to convert from one to another so we are keeping both arguments separately :
```
const opts = {
  'amount': argv[0] || 1,
  'from': (argv[1] || 'USD').toUpperCase(),
  'to': (argv[2] || 'BTC').toUpperCase()
};
```
First argument is amount , then from X currency to Y currency (in our example, 10(=amount) EUR(=from) USD(=to))
The help function works as an example.
Then you have the start function which will show you the result of your request.
```
async function start (opts) {
  try {
    const {amount, from, to} = opts;
    const result = await currency(opts);

    spinner.stop();
    console.log(`${amount} ${from} = ${result} ${to}`);
  } catch (error) {
    spinner.stop();
    console.log(error);
    process.exit(1);
  }
}
```


# Tests

The test functions allow you to try different cases, just do "npm test" and try it !
```
test('convert 1 USD to EUR', async () => {
  const n = 1, from = 'USD', to = 'EUR';
  const arg = { n, from, to };
  const result = await currency(arg);
  expect(result).toBe(0.899);
});

test('convert 1 USD to USD', async () => {
  const n = 1, from = 'USD', to = 'EUR';
  const arg = { n, from, to };
  const result = await currency(arg);
  expect(result).toBe(1);
});

test('convert 1 EUR to USD', async () => {
  const n = 1, from = 'USD', to = 'EUR';
  const arg = { n, from, to };
  const result = await currency(arg);
  expect(result).toBe(1.1122);
});

test('convert 1 BTC to USD', async () => {
  const n = 1, from = 'USD', to = 'EUR';
  const arg = { n, from, to };
  const result = await currency(arg);
  expect(result).toBe(8944.49);
});

test('convert 1 BTC to EUR', async () => {
  const n = 1, from = 'USD', to = 'EUR';
  const arg = { n, from, to };
  const result = await currency(arg);
  expect(result).toBe(8048.11);
});

test('convert without arguments', async () => {
  const arg = {};
  const result = await currency(arg);
  expect(result).toBe('Please add arguments');
});

test('convert with amount only', async () => {
  const n = 1;
  const arg = { n };
  const result = await currency(arg);
  expect(result).toBe('Please be more precise');
});

test('convert with amount and (from) currency only', async () => {
  const n = 1, from = 'USD';
  const arg = { n, from };
  const result = await currency(arg);
  expect(result).toBe('Lacking in which money to convert');
});

test('convert without a correct `from` or `to` currency value', async () => {
  const n = 1, from = 'test1', to = 'test2';
  const arg = { n, from, to };
  const result = await currency(arg);
  expect(result).toBe('Arguments specified are wrong, try again');
});
```




