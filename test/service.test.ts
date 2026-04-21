// Test file for music services
import {getAllMusic, createMusic, deleteMusic, updateMusic} from '../src/api/v1/services/musicServices';
import * as firestoreRepository from '../src/api/v1/repositories/firestoreRepository';
import { jest, beforeEach, it, expect, describe } from '@jest/globals';


// Mock the repository module
jest.mock('../src/api/v1/repositories/firestoreRepository');
// Clear all mocks before each test
describe('Music Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    });
// Test case for createMusic service
    describe('Music Service - CreateMusic', () => {
    // test case # 1
        it('should create a new music successfully', async () => {
            // Arrange
            const mockInput = { 
                nameOfArtist: "Test Artist",
                album: "Test Album",
                releaseDate: new Date(),
                songsReleased: 10,
                popularSong: "Test Song",
                funFact: "Test fact",
                toured: true,
                yearsToured: "2020-2021"
            };

            const mockRepositoryResponse = "music-1";
            
            (firestoreRepository.createDocument as jest.MockedFunction<typeof firestoreRepository.createDocument>).mockResolvedValue(mockRepositoryResponse);//Why do i need a comma >:(
            
            // Act
            const result = await createMusic(mockInput);

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith("music", 
            expect.objectContaining({
                nameOfArtist: mockInput.nameOfArtist,
                album: mockInput.album,
                releaseDate: mockInput.releaseDate,
                songsReleased: mockInput.songsReleased,
                popularSong: mockInput.popularSong,
                funFact: mockInput.funFact,
                toured: mockInput.toured,
                yearsToured: mockInput.yearsToured
            })
            );
// expected result should match the mockRepositoryResponse and the input data
            expect(result).toEqual(
            {
                id: mockRepositoryResponse,
                nameOfArtist: mockInput.nameOfArtist,
                album: mockInput.album,
                releaseDate: mockInput.releaseDate,
                songsReleased: mockInput.songsReleased,
                popularSong: mockInput.popularSong,
                funFact: mockInput.funFact,
                toured: mockInput.toured,
                yearsToured: mockInput.yearsToured,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
            );
        });
    });
});


   // test case # 2 - GetAllMusic service
describe('Music Service - GetAllMusic', () => {
// test case for retrieving all music entries successfully
    it('should retrieve the list of all music successfully', async () => {
      // Arrange
      const mockRepositoryResponse = { 
        // response should be an array containing all music documents from firestore
            id: "music-1",
            userId: "user-1",
            content: "test content",
            createdAt: "2026-04-15T21:14:39.474Z",
            updatedAt: "2026-04-15T21:14:39.474Z"
      };

      (firestoreRepository.getDocuments as jest.MockedFunction<typeof firestoreRepository.getDocuments>).mockResolvedValue({
        docs: [
            {
                id: mockRepositoryResponse.id,
                data: () => ({
                    userId: mockRepositoryResponse.userId,
                    content: mockRepositoryResponse.content,
                    createdAt: mockRepositoryResponse.createdAt,
                    updatedAt: mockRepositoryResponse.updatedAt,
                }),
            },
        ],
      } as any);

      // Act
      const result = await getAllMusic();

      // Assert - call firestore repository function with the collection name
      expect(firestoreRepository.getDocuments).toHaveBeenCalled();

      // expected eresults should be an array matching with the mockRepositoryResponse
      expect(result).toEqual([mockRepositoryResponse]);
    });
});
// test case # 3 - DeleteMusic service
describe('Music Service - DeleteMusic', () => {
    it('should delete a music entry and return confirmation message', () => {
        // Arrange
        const mockId = "music-1";

        // Act
        const result = deleteMusic(mockId);

        // Assert
        expect(result).toBe("Music has been deleted");
    });
});
// test case # 4 - UpdateMusic service
describe('Music Service - UpdateMusic', () => {
// test case for updating a music entry successfully
    it('should update a music entry and return confirmation message', () => {
        // Arrange
        const mockId = "music-1";
        const mockMusic = "Updated Album Name";

        // Act
        const result = updateMusic(mockId, mockMusic);

        // Assert
        expect(result).toBe("Music has been updated");
    });
});