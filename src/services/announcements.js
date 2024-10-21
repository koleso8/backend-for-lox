import { AnnouncementsCollection } from '../db/models/announcement.js';
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

export const createStudent = async payload => {
  console.log(payload);

  const student = await StudentsCollection.create(payload);
  return student;
};

export const deleteStudent = async studentId => {
  const student = await StudentsCollection.findOneAndDelete({
    _id: studentId,
  });
  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    { new: true, includeResultMetadata: true, ...options }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
