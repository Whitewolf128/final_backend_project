// defines imports
import { Request, Response } from 'express';
import { handleUploadService } from '../services/uploadService';

// a controller that handles file uploads

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const data = handleUploadService(req.file);
  res.status(200).json(data);
};