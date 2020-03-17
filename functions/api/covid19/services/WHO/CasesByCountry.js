const { WHOAPI } = require('../../clients');

const url = '/COVID_19_CasesByCountry(pt)_VIEW/FeatureServer/0/query';

const params = (country) => ({
  f: 'json',
  where: `(ADM0_NAME<>'International conveyance (Diamond Princess)') AND (ADM0_NAME='${country}')`,
  returnGeometry: false,
  outFields: '*',
  cacheHint: true
});

const transformAttributes = ({
  attributes: { ADM0_NAME, DateOfReport, cum_conf, cum_death }
}) => ({
  country: ADM0_NAME,
  updated_at: DateOfReport,
  confirmed: cum_conf,
  deaths: cum_death,
  recovered: 'n/a',
  active: 'n/a'
});

const getCasesByCountry = (country) =>
  WHOAPI({
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
