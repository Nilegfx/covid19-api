const { JHUCSSEAPI } = require('../../clients');

const viewId = 'Z7biAeD8PAkqgmWhxG2A';
const featureServer = 2;

const url = `/${viewId}/FeatureServer/${featureServer}/query`;

const FIELDS = ['*'];
const params = () => ({
  f: 'json',
  where: 'Confirmed > 0',
  spatialRel: 'esriSpatialRelIntersects',
  returnGeometry: false,
  orderByFields: 'Confirmed desc',
  resultOffset: 0,
  resultRecordCount: 200,
  outFields: FIELDS.join(','),
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

const getCasesFromAllCountries = () =>
  JHUCSSEAPI({
    url,
    params: params()
  }).then((data) => {
    let { features } = data;
    return { results: features.map(transformAttributes) };
  });
module.exports = {
  getCasesFromAllCountries
};
