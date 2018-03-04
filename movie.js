class Movie {

  constructor({ id, title, release_date, director, writer, tag_line, summary, poster_url, mpaa_rating, runtime}) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.director = director;
    this.writer = writer;
    this.tag_line = tag_line;
    this.summary = summary;
    this.poster_url = poster_url;
    this.mpaa_rating = mpaa_rating;
    this.runtime = runtime;
    this.reviews = [];
  }

}
