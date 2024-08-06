function roundToTwoDecimalPlaces(num) {
  return Math.round(num * 100) / 100
}

const dates = [
  '2024-07-08',
  '2024-07-09',
  '2024-07-10',
  '2024-07-11',
  '2024-07-12',
  '2024-07-15',
  '2024-07-16',
  '2024-07-17',
  '2024-07-18',
  '2024-07-19',
  '2024-07-22',
  '2024-07-23',
  '2024-07-24',
  '2024-07-25',
  '2024-07-26',
  '2024-07-29',
  '2024-07-30',
  '2024-07-31',
  '2024-08-01',
  '2024-08-02',
  '2024-08-05',
  '2024-08-06',
  '2024-08-07',
]

const dateToIndex = (date) => dates.indexOf(date)

const price = {
  TSLA: [
    328822, 341029, 342238, 313339, 322699, 328432, 333528, 323050, 323999,
    310960, 326963, 320294, 280787, 286325, 285740, 301730, 289406, 301691,
    281918, 269971, 258544, 243424, 253232,
  ],
  AAPL: [
    296166, 297284, 302874, 295841, 299702, 304720, 305266, 297544, 291434,
    291603, 291148, 292513, 284102, 282737, 283348, 283712, 284440, 288704,
    283868, 285818, 272051, 270051, 269051,
  ],
  NVDA: [
    166600, 170794, 175383, 165620, 168012, 166972, 164268, 153387, 157417,
    153309, 160602, 159367, 148525, 145964, 146978, 145067, 134849, 152126,
    141973, 139451, 130585, 129898, 130234,
  ],
  MSFT: [
    606112, 597402, 606125, 591110, 589615, 590148, 584376, 576576, 572481,
    568243, 575822, 578305, 557570, 543920, 552851, 554749, 549796, 543855,
    542243, 531037, 513694, 502934, 512342,
  ],
  SQQQ: [
    9620, 9607, 9321, 9919, 9763, 9698, 9698, 10543, 10699, 10998, 10517, 10634,
    11778, 12180, 11830, 11765, 12259, 11167, 11986, 12857, 14026, 14093, 13242,
  ],
}

const now_position = {
  TSLA: 20,
  AAPL: 12,
  NVDA: 8,
  MSFT: 8,
  SQQQ: 2,
}

const cache_before_price = {
  TSLA: 328822,
  AAPL: 296166,
  NVDA: 166600,
  MSFT: 606112,
  SQQQ: 9620,
}

const change = {
  '2024-07-11': [
    {
      stock: 'AAPL',
      changed: -4,
      price: 299504,
    },
    {
      stock: 'TSLA',
      changed: 3,
      price: 313339,
    },
  ],

  '2024-07-17': [
    {
      stock: 'TSLA',
      changed: -6,
      price: 332528,
    },
    {
      stock: 'SQQQ',
      changed: 10,
      price: 9698,
    },
  ],
  '2024-07-31': [
    {
      stock: 'NVDA',
      changed: -2,
      price: 151126,
    },
    {
      stock: 'MSFT',
      changed: -2,
      price: 543700,
    },
  ],
  '2024-08-01': [
    {
      stock: 'NVDA',
      changed: -2,
      price: 151126,
    },
    {
      stock: 'SQQQ',
      changed: 300,
      price: 11167,
    },
  ],
  '2024-08-02': [
    {
      stock: 'TSLA',
      changed: -10,
      price: 271918,
    },
    {
      stock: 'AAPL',
      changed: -6,
      price: 284818,
    },
  ],
}

const result = (now_position, date) => {
  let dateIndex = dateToIndex(date)

  for (const [stock, value] of Object.entries(now_position)) {
    let quantity = value
    let previous_quote = cache_before_price[stock]
    let current_quote = price[stock][dateIndex]
    let date = dates[dateIndex]

    if (change[date]) {
      change[date].map(({ stock: changeStock, price, changed }) => {
        if (stock === changeStock) {
          if (changed > 0) {
            previous_quote = roundToTwoDecimalPlaces(
              (previous_quote * quantity + price * changed) /
                (quantity + changed)
            )
            cache_before_price[stock] = previous_quote
          }
          now_position[stock] += changed
          quantity += changed
        }
      })
    }
    let amount = quantity * current_quote
    console.log({
      stock,
      amount,
      quantity,
      previous_quote,
      current_quote,
      date,
    })
  }
}

dates.map((value) => {
  result(now_position, value)
})
