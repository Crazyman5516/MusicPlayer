class Music {
  constructor(title, artist, img, file) {
    this.title = title;
    this.artist = artist;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.artist;
  }
}

const musicList = [
  new Music("Song 1", "Artist 1", "img1.jpg", "music1.mp3"),
  new Music("Song 2", "Artist 2", "img2.jpg", "music2.mp3"),
  new Music("Song 3", "Artist 3", "img3.jpg", "music3.mp3"),
];
