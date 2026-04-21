import multerModule from 'multer';
import path from 'path';

const storage = multerModule.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadWithValidation = multerModule({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'text/html' || file.mimetype === 'image/jpeg'  || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .html, .jpg, .jpeg, and .png files are allowed!'));
    }
  }
});
export { uploadWithValidation };