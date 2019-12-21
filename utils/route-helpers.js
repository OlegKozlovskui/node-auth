const Joi = require('joi');

exports.validateBody = (schema) => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);

    if (result.error) {
      return res.status(400).json(result.error);
    }

    if (!req.value) { req.value = {} }
    req.value['body'] = result.value;
    next();
  }
};

exports.schemas = {
  authSchemas: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
};
