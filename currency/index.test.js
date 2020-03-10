const nock = require('nock');

beforeEach(() => {
  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=USD')
    .reply(200, {
      'base': 'USD',
      'rates': {
        'EUR': 0.899
      }
    });

  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=EUR')
    .reply(200, {
      'base': 'EUR',
      'rates': {
        'USD': 1.1122
      }
    });

  nock('https://blockchain.info')
    .get('/ticker')
    .reply(200, {
      'USD': {
        '15m': 8944.49,
        'last': 8944.49,
        'buy': 8944.49,
        'sell': 8944.49,
        'symbol': '$'
      },
      'EUR': {
        '15m': 8048.11,
        'last': 8048.11,
        'buy': 8048.11,
        'sell': 8048.11,
        'symbol': '€'
      }
    });
});

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
