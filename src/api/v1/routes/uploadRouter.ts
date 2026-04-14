import { Router } from 'express';
import { upload } from '../middleware/upload';
import { uploadFile } from '../controllers/uploadController';

const router = Router();

router.post('/file', upload.single('file'), uploadFile);

export default router;