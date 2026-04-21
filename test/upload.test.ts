// Test file for upload service and controller
import { handleUploadService } from '../src/api/v1/services/uploadService';
import { uploadFile } from '../src/api/v1/controllers/uploadController';
import { Request, Response } from 'express';
import { it, expect, describe, jest } from '@jest/globals';

// Test suite for the upload service
describe('Upload Service - handleUploadService', () => {
    it('should return file metadata on successful upload', () => {
        // Arrange
        const mockFile = {
            originalname: 'test.mp3',
            filename: 'test-123.mp3',
            path: 'uploads/test-123.mp3',
            size: 1024,
        } as Express.Multer.File;

        // Act
        const result = handleUploadService(mockFile);

        // Assert
        expect(result).toEqual({
            message: 'File uploaded successfully!',
            originalName: 'test.mp3',
            filename: 'test-123.mp3',
            path: 'uploads/test-123.mp3',
            size: 1024,
        });
    });
});
// Test suite for the upload controller
describe('Upload Controller - uploadFile', () => {
    it('should return 400 when no file is provided', () => {
        // Arrange
        const mockRequest = {} as Request;
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        const mockResponse = { status: mockStatus } as unknown as Response;

        // Act
        uploadFile(mockRequest, mockResponse);

        // Assert
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({ error: 'No file uploaded' });
    });
// Test case for successful file upload
    it('should return 200 with file data when file is provided', () => {
        // Arrange
        const mockFile = {
            originalname: 'test.mp3',
            filename: 'test-123.mp3',
            path: 'uploads/test-123.mp3',
            size: 1024,
        } as Express.Multer.File;
        const mockRequest = { file: mockFile } as Request;
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        const mockResponse = { status: mockStatus } as unknown as Response;

        // Act
        uploadFile(mockRequest, mockResponse);

        // Assert
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'File uploaded successfully!',
            originalName: 'test.mp3',
            filename: 'test-123.mp3',
            path: 'uploads/test-123.mp3',
            size: 1024,
        });
    });
});