import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { announcementId } = req.params;
  if (!isValidObjectId(announcementId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};
