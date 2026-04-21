export interface Music {
    id?: string;
    nameOfArtist: string;
    album: string;
    releaseDate: Date;
    songsReleased: number;
    popularSong: string;
    funFact: string;
    toured: boolean;
    monthsToured: string;
    createdAt?: string;
    updatedAt?: string;
}