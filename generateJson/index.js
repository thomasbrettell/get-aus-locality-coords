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

    return el;
  } else {
    el.lng = 'Missing longitude';
    el.lat = 'Missing latitude';
    if (SHOW_MISSING_DATA) {
      console.log('No coords.', el);
    }
  }
};

const res = data
  .reduce((arr, el, i) => {
    let newDp;
    switch (el.State) {
      case 'NSW':
        newDp = findMatch(NSW, el, i);
        break;
      case 'QLD':
        newDp = findMatch(QLD, el, i);
        break;
      case 'SA':
        newDp = findMatch(SA, el, i);
        break;
      case 'VIC':
        newDp = findMatch(VIC, el, i);
        break;
      case 'WA':
        newDp = findMatch(WA, el, i);
        break;
      case 'NT':
        newDp = findMatch(NT, el, i);
        break;
      case 'ACT':
        newDp = findMatch(ACT, el, i);
        break;
      case 'TAS':
        newDp = findMatch(TAS, el, i);
        break;
      default:
        if (SHOW_MISSING_DATA) {
          console.log('No state.', el);
        }
    }
    if (newDp) {
      const match = arr.find(
        (el) => el.lat === newDp.lat && el.lng === newDp.lng
      );
      if (!match) {
        arr.push(newDp);
      }
    }
    return arr;
  }, [])
  .map((dp, u, arr) => {
    let lowestId = null;
    let currentSmallestDistance = null;

    for (let i = 0; i < arr.length; i++) {
      if (dp.id === arr[i].id) continue;
      const xDistance = dp.lng - arr[i].lng;
      const yDistance = dp.lat - arr[i].lat;
      const distance = Math.hypot(xDistance, yDistance);
      if (distance < currentSmallestDistance || !currentSmallestDistance) {
        currentSmallestDistance = distance;
        lowestId = arr[i].id;
      }
    }
    dp.nnId = lowestId;
    dp.smallestDistance = currentSmallestDistance;
    return dp;
  });

fs.writeFile('postcode-data.json', JSON.stringify(res), 'utf8', () => {});
