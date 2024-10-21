import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import * as controllers from '../controllers/students.js';
import * as validations from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(controllers.getStudentsController));

router.get(
  '/students/:studentsId',
  isValidId,
  ctrlWrapper(controllers.getStudentByIdController)
);

router.delete(
  '/:studentsId',
  isValidId,
  ctrlWrapper(controllers.deleteStudentsController)
);

router.post(
  '/register',
  validateBody(validations.createStudentSchema),
  ctrlWrapper(controllers.createStudentController)
);

router.put(
  '/:studentId',
  validateBody(validations.createStudentSchema),
  ctrlWrapper(controllers.upsertStudentController)
);

router.patch(
  '/:studentId',
  validateBody(validations.updateStudentSchema),
  ctrlWrapper(controllers.patchStudentController)
);

export default router;
