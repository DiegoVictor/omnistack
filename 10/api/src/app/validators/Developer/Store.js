import * as Yup from 'yup';
import { badRequest } from '@hapi/boom';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      github_username: Yup.string()
        .required()
        .strict(),
      techs: Yup.string()
        .required()
        .strict(),
      latitude: Yup.number()
        .required()
        .strict(),
      longitude: Yup.number()
        .required()
        .strict(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    throw badRequest('Validation fails', err.inner);
  }
};