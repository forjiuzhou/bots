#!/usr/bin/env node
import { ArrayToKLine, Random, SpotSimpleTest } from 'litebot';
// import { MAKD, Params } from '../makd';
import { SMACross, Params } from '../sma_cross';

const data = require('../data/APT_USDT-15m.json');

function main() {
  const kline = ArrayToKLine(data, false);
  const random = new Random<Params>();
  random.Search({
    domain: {
      fast_period: [2, 100],
      slow_period: [2, 100],
      // k_period: [72, 72],
      // d_period: [3, 3],
    },
    target: (params) => {
      const executor = new SpotSimpleTest();
      // const bot = new MAKD(executor, params);
      const bot = new SMACross(executor, params);
      bot.BackTestingBatch(kline);
      return executor.ROI(kline[kline.length - 1].close);
    },
  });
}

main()
