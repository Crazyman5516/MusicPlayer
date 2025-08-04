class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.currentIndex = 0;
  }

  getmusic() {
    if (this.musicList.length === 0) {
      console.log("No music available.");
      return;
    }
    return this.musicList[this.currentIndex];
  }

  next() {
    if (this.currentIndex + 1 < this.musicList.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first song
    }
  }

  previous() {
    if (this.currentIndex != 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.musicList.length - 1; // Loop back to the last song
    }
  }
}
