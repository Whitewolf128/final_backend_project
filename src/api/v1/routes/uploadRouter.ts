// how the route should be displayed <localhost>:3000/api/upload/file
import { Router } from 'express';
import { upload } from '../middleware/upload';
import { uploadFile } from '../controllers/uploadController';

// create a new router instance for upload routes
const router = Router();

// define the route for file upload, using multer middleware to handle the file upload process
router.post('/file', upload.single('file'), uploadFile);

// export the upload router to be used in the main application
export default router;