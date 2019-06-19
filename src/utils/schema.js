const Joi = require("@hapi/joi");

const confessionSchema = Joi.object().keys({
  content: Joi.string()
    .min(20)
    .max(1000)
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "Confession content should not be empty!";
            break;
          case "string.min":
            err.message = `Confession content should have at least ${
              err.context.limit
            } characters!`;
            break;
          case "string.max":
            err.message = `Confession content should have at most ${
              err.context.limit
            } characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  numberOfComments: Joi.number()
    .integer()
    .required(),
  numberOfLikes: Joi.number()
    .integer()
    .required(),
  numberOfDislikes: Joi.number()
    .integer()
    .required(),
  feelings: Joi.object(),
  favorites: Joi.object(),
  comments: Joi.object(),
  tags: Joi.array()
    .required()
    .error(error => (error.message = "Tags should not be empty!")),
  shareAs: Joi.string().required(),
  timestamp: Joi.object().required(),
  user: {
    uid: Joi.string().required(),
    username: Joi.string().required(),
    photoURL: Joi.string().required()
  }
});

export { confessionSchema };
