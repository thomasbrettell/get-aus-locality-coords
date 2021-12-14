const fs = require('fs');
const data = require('./data.json');
const NSW = require('./NSW.json');
const QLD = require('./QLD.json');
const SA = require('./SA.json');
const VIC = require('./VIC.json');
const WA = require('./WA.json');
const NT = require('./NT.json');
const ACT = require('./ACT.json');
const TAS = require('./TAS.json');

const SHOW_MISSING_DATA = false;

const res = [];

const findMatch = (state, el, i) => {
  let match;
  el.id = i;

  match = state.find(
    (entry) => entry.Locality.toLowerCase() === el.Suburb.toLowerCase()
  );

  if (!match) {
    match = state.find(
      (entry) => entry.Postcode?.toString() === el.PostCode?.toString()
    );
  }

  if (match && match.Latitude && match.Longitude) {
    el.lng = match.Longitude;
    el.lat = match.Latitude;
    res.push(el);
  } else {
    el.lng = 'Missing longitude';
    el.lat = 'Missing latitude';
    if (SHOW_MISSING_DATA) {
      console.log('No coords.', el);
    }
  }
};

data.forEach((el, i) => {
  switch (el.State) {
    case 'NSW':
      findMatch(NSW, el, i);
      break;
    case 'QLD':
      findMatch(QLD, el, i);
      break;
    case 'SA':
      findMatch(SA, el, i);
      break;
    case 'VIC':
      findMatch(VIC, el, i);
      break;
    case 'WA':
      findMatch(WA, el, i);
      break;
    case 'NT':
      findMatch(NT, el, i);
      break;
    case 'ACT':
      findMatch(ACT, el, i);
      break;
    case 'TAS':
      findMatch(TAS, el, i);
      break;
    default:
      if (SHOW_MISSING_DATA) {
        console.log('No state.', el);
      }
  }
});

console.log(res);
fs.writeFile('postcode-data.json', JSON.stringify(res), 'utf8', () => {});
