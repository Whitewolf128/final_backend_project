https://dev.to/jakaria/file-upload-api-with-multer-12hc

* What component I chose?
Multer for File Uploads: Allows users to upload files, such as images or documents, with validation and size restrictions.

** The reason I chose this component?
I chose it in case you want to upload either a lyric of your favourite song .html from that album or maybe a picture of the album to show where it came from to help others look for it.

*** 2-3 ways to integrate it.
from dev site:
    1. installs:

    npm install express multer
    npm install -D typescript ts-node-dev @types/node @types/express @types/multer

    2. tsconfig.json:

    {
        "compilerOptions": {
            "target": "es6",
            "module": "commonjs",
            "outDir": "./dist",
            "strict": true,
            "esModuleInterop": true
    },
    "include": ["./**/*.ts"]
    }

    3. middleware:

    import multer from 'multer';
    import path from 'path';
    import fs from 'fs';

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, uploadDir),
        filename: (_req, file, cb) => {
            const timestamp = Date.now();
            cb(null, `${timestamp}-${file.originalname}`);
        },
    });

    export const upload = multer({ storage });

    4. Service:

    export const handleUploadService = (file: Express.Multer.File) => {
        return {
            message: 'File uploaded successfully!',
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            size: file.size,
        };
    };

    5. Controller:
    import { Request, Response } from 'express';
    import { handleUploadService } from '../services/upload.service';

    export const uploadFile = (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        } 

        const data = handleUploadService(req.file);
        res.status(200).json(data);
    };

    6. Route:

    import { Router } from 'express';
    import { upload } from '../middleware/upload.middleware';
    import { uploadFile } from '../controllers/upload.controller';

    const router = Router();

    router.post('/file', upload.single('file'), uploadFile);

    export default router;

    7. App.ts

    import express from 'express'; <- this is already in prior to this part
    import uploadRoute from './routes/upload.route';

    const app = express(); <- this is already in prior to this part
    const PORT = 3000; <- this is in the server.ts

    app.use(express.json()); <- this is already in prior to this part
    app.use('/api/upload', uploadRoute);

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    }); <- this is in the server.ts
