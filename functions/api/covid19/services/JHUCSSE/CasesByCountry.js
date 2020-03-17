const { JHUCSSEAPI } = require('../../clients');

const viewId = 'Z7biAeD8PAkqgmWhxG2A';
const featureServer = 1;

const url = `/${viewId}/FeatureServer/${featureServer}/query`;

const params = (country) => ({
  f: 'json',
  where: `(Confirmed > 0) AND (Country_Region='${country}')`,
  returnGeometry: false,
  outFields: '*',
  cacheHint: true
});

const transformAttributes = ({
  attributes: {
    Country_Region,
    Last_Update,
    Confirmed,
    Deaths,
    Recovered,
    Active
  }
}) => ({
  country: Country_Region,
  updated_at: Last_Update,
  confirmed: Confirmed,
  deaths: Deaths,
  recovered: Recovered,
  active: Active
});

const getCasesByCountry = (country) =>
  JHUCSSEAPI({
    url,
    params: params(country)
  }).then((data) => {
    let { features } = data;
    if (features) {
      return { results: features.map(transformAttributes)[0] || {} };
    } else {
      return { results: {} };
    }
  });

module.exports = {
  getCasesByCountry
};
