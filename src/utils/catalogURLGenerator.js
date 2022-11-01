const csv = require('csv-parser');
const fs = require('fs');
const results = [];
let final = [];
let total = 0;

fs.createReadStream('./data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const catalogRoutesTop100 = results
      .filter((item) => {
        if (item.route.includes('/catalog')) return true;
      })
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 100);

    // Calculate total pageviews, reduce won't work
    catalogRoutesTop100.forEach((item) => (total += parseInt(item.pageviews)));

    const probArray = catalogRoutesTop100.map((item) => {
      return {
        route: item.route,
        // Use ceiling so probability is > 0
        probability: Math.ceil((item.pageviews / total) * 100),
      };
    });

    probArray.forEach((item) => {
      for (let i = 0; i < item.probability; i++) {
        final.push(item.route);
      }
    });

    fs.writeFile(
      './catalogUrls.json',
      JSON.stringify(final),

      function (err) {
        if (err) {
          console.error('Crap happens');
        }
      }
    );
  });
