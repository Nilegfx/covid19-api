const { create } = require('axios');

const extractData = ({ data }) => {
  return Promise.resolve(data);
};

getBaseURL = (subdomain, serviceId) => {
  return `https://${subdomain}.arcgis.com/${serviceId}/arcgis/rest/services`;
};

// World Health Organization API
const WHOAPI = create({
  baseURL: getBaseURL('services', '5T5nSi527N4F7luB')
});
WHOAPI.interceptors.response.use(extractData);

// Johns Hopkins University CSSE API
const JHUCSSEAPI = create({
  baseURL: getBaseURL('services9', 'N9p5hsImWXAccRNI'),
  headers: {
    Referer: 'https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html'
  }
});
JHUCSSEAPI.interceptors.response.use(extractData);

module.exports = { WHOAPI, JHUCSSEAPI };
