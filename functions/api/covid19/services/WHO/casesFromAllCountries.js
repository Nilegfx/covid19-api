const { WHOAPI } = require('../../clients');

const url = '/COVID_19_CasesByCountry(pt)_VIEW/FeatureServer/0/query';

const FIELDS = ['*'];
const params = () => ({
  f: 'json',
  where: "(ADM0_NAME<>'International conveyance (Diamond Princess)')",
  returnGeometry: false,
  outFields: FIELDS.join(','),
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

const getCasesFromAllCountries = () =>
  WHOAPI({
    url,
    params: params()
  }).then((data) => {
    let { features } = data;

    return { results: features.map(transformAttributes) };
  });
module.exports = {
  getCasesFromAllCountries
};
