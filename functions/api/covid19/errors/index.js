const handleErrorsGenerically = (error, req, res) => {
  console.error(error);
  res.status(503).send({
    message:
      'something wrong, will work on handling errors better later. sorry.'
  });
};

module.exports = {
  handleErrorsGenerically
};
