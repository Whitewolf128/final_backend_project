// how the route should be displayed <localhost>:3000/api/upload/file
import { Router } from 'express';
import { upload } from '../middleware/upload';
import { uploadFile } from '../controllers/uploadController';

const router = Router();

router.post('/file', upload.single('file'), uploadFile);

export default router;