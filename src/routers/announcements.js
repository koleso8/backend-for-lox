import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import * as controllers from '../controllers/announcements.js';
import * as validations from '../validation/announcements.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(controllers.getAnnouncementsController));

router.get(
  '/:announcementId',
  isValidId,
  ctrlWrapper(controllers.getAnnouncementByIdController)
);

router.delete(
  '/:announcementId',
  isValidId,
  ctrlWrapper(controllers.deleteAnnouncementController)
);

router.post(
  '/',
  validateBody(validations.createAnnouncementSchema),
  ctrlWrapper(controllers.createAnnouncementController)
);

router.put(
  '/:announcementId',
  validateBody(validations.createAnnouncementSchema),
  ctrlWrapper(controllers.upsertAnnouncementController)
);

router.patch(
  '/:announcementId',
  validateBody(validations.updateAnnouncementSchema),
  ctrlWrapper(controllers.patchAnnouncementController)
);

export default router;
