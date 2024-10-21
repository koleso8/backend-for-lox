import { AnnouncementsCollection } from '../db/models/announcements.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllAnnouncements = async ({ page = 1, perPage = 10 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const [announcementsCount, announcements] = await Promise.all([
    AnnouncementsCollection.find().countDocuments(),
    AnnouncementsCollection.find().skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(
    announcementsCount,
    perPage,
    page
  );

  return {
    data: announcements,
    ...paginationData,
  };
};

export const getAnnouncementById = async announcementId => {
  const announcement = await AnnouncementsCollection.findById(announcementId);
  return announcement;
};

export const createAnnouncement = async payload => {
  console.log(payload);

  const announcement = await AnnouncementsCollection.create(payload);
  return announcement;
};

export const deleteAnnouncement = async announcementId => {
  const announcement = await AnnouncementsCollection.findOneAndDelete({
    _id: announcementId,
  });
  return announcement;
};

export const updateAnnouncement = async (
  announcementId,
  payload,
  options = {}
) => {
  const rawResult = await AnnouncementsCollection.findOneAndUpdate(
    { _id: announcementId },
    payload,
    { new: true, includeResultMetadata: true, ...options }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    announcement: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
