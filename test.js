const fs = require('fs');

try {
  const data = fs.readFileSync('./urls.json', 'utf8');
  const json = JSON.parse(data);
  console.log(json[0]);
} catch (err) {
  console.error(err);
}
