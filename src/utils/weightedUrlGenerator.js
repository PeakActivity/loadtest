const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const final = [];
const probArray = [];

function createProbabilityArray(data) {
  data.forEach((item) => {
    const normalizedDecimal = parseFloat(item.probability) * 100;
    const roundedDecimal = Math.floor(normalizedDecimal);
    loop(item, roundedDecimal);
  });
}

const loop = (item, probability) => {
  for (let i = 0; i < probability; i++) {
    probArray.push(item.route);
  }
};

fs.createReadStream('src/data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const top100 = results.slice(0, 100);
    createProbabilityArray(top100);
    loop(final);
    fs.writeFile(
      './src/weightedUrls.json',
      JSON.stringify(probArray),

      function (err) {
        if (err) {
          console.error('Crap happens');
        }
      }
    );
  });
