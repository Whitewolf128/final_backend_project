import * as postService from '../src/api/v1/services/musicServices';
import * as firestoreRepository from '../src/api/v1/repositories/firestoreRepository';
import { jest, beforeEach, it, expect, describe } from '@jest/globals';


// Mock the repository module
jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Post Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    });

    describe('Post Service - CreatePost', () => {
    // test case # 1
        it('should create a new post successfully', async () => {
            // Arrange
            const mockInput = { 
                Id: "test-music-id",
                content: "test content"
            };

            const mockRepositoryResponse = "post-1";
            
            (firestoreRepository.createDocument as jest.MockedFunction<typeof firestoreRepository.createDocument>).mockResolvedValue(mockRepositoryResponse);//Why do i need a comma >:(
            
            // Act
            const result = await postService.createPost(mockInput);

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith("posts", 
            expect.objectContaining({
                Id: mockInput.Id,
                content: mockInput.content
            })
            );

            expect(result).toEqual(
            {
                id: mockRepositoryResponse,
                Id: mockInput.Id,
                content: mockInput.content,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }
            );
        });
    });
});