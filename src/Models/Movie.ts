export class Movie {
    constructor(
        public Id: number,
        public Title: string,
        public Runtime: number,
        public Rating: number,
        public AgeRating: string,
        public ImgUrl: string,
        public ReleaseDate: string
    ) { }
}