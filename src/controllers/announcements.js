import * as services from '../services/announcements.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAnnouncementsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const announcements = await services.getAllAnnouncements({
    page,
    perPage,
  });
  res.status(200).json({ data: announcements });
};

export const getAnnouncementByIdController = async (req, res, next) => {
  const { announcementId } = req.params;
  console.log(req.params);

  const announcement = await services.getAnnouncementById(announcementId);

  if (!announcement) {
    throw createHttpError(404, 'announcement not found');
  }
  res.json({
    status: 200,
    message: `Successfully found announcement with id ${announcementId} !`,
    data: announcement,
  });
};

export const createAnnouncementController = async (req, res) => {
  const announcement = await services.createAnnouncement(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a announcement !',
    data: announcement,
  });
};

export const deleteAnnouncementController = async (req, res, next) => {
  const { announcementId } = req.params;
  console.log(req.params);

  const announcement = await services.deleteAnnouncement(announcementId);

  if (!announcement) {
    next(createHttpError(404, 'announcement not found'));
    return;
  }
  res.status(204).send();
};

export const upsertAnnouncementController = async (req, res, next) => {
  const { announcementId } = req.params;

  const result = await services.updateAnnouncement(announcementId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'announcement not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a announcement !',
    data: result.announcement,
  });
};

export const patchAnnouncementController = async (req, res, next) => {
  const { announcementId } = req.params;
  const result = await services.updateAnnouncement(announcementId, req.body);

  if (!result) {
    next(createHttpError(404, 'announcement not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patced a announcement !',
    data: result.announcement,
  });
};
