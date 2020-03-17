const config = require('config');
const router = require('express').Router();

const { handleErrorsGenerically } = require('./errors');
const API = config.get('API');
const SERVICE = require('./services')[API];

router.route('/').get((req, res, next) => {
  SERVICE.getCasesFromAllCountries()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      return handleErrorsGenerically(error, req, res);
    });
});

// router.route('/countries').get((req, res, next) => {
//   SERVICE.getCountries()
//     .then((data) => {
//       return res.send({ results: data });
//     })
//     .catch((error) => {
//       return handleErrorsGenerically(error, req, res);
//     });
// });

router.route('/:country').get((req, res) => {
  let {
    params: { country }
  } = req;
  SERVICE.getCasesByCountry(country)
    .then((data) => res.send(data))
    .catch((error) => {
      return handleErrorsGenerically(error, req, res);
    });
});

module.exports = router;
