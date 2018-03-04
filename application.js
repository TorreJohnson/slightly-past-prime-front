let movies = [];
let reviews = [];

class Application {
  constructor() {
    this.fetchMovies();
    this.fetchAllReviews();
  }

  createMovieCards (movie) {
    let movieCardDiv = document.getElementById('movieCards')
    movieCardDiv.innerHTML += `<div class="teal raised card">
                                <div class="image">
                                  <img src="${movie.poster_url}" style="height:200px,width:132px">
                                </div>
                                <div class="content">
                                  <div class="header">${movie.title}</div>
                                  <div class="meta">
                                    <a>Rated ${movie.mpaa_rating}</a>
                                  </div>
                                  <div class="description">
                                    ${movie.tag_line}
                                  </div>
                                </div>
                                <div class="extra content">
                                  <span class="center floated">
                                    ${movie.runtime} Minutes
                                  </span>
                                  <span>
                                    Released: ${this.formatDate(movie.release_date)}
                                  </span>
                                </div>
                                <div class="ui bottom attached button">
                                  <i class="add icon"></i>
                                  Add Review
                                </div>
                              </div>`
  }

  fetchMovies () {
    fetch('http://localhost:3000/api/movies')
      .then(res => res.json())
      .then(json => this.createMovieInstances(json))
  }

  createMovieInstances(json) {
    json.forEach(movie => {
      let mov = new Movie(movie);
      movies.push(mov);
      this.createMovieCards(movie);
    });
  }

  formatDate(date) {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];
    let splitDate = date.split("-");
    return `${month[splitDate[1] - 1]} ${splitDate[1]}, ${splitDate[0]}`
  }

  reviewEventListener() {
    let reviewButton = document.getElementById('reviews');
    reviewButton.addEventListener('click', {
      
    })
  }

  fetchAllReviews() {
    fetch('http://localhost:3000/api/reviews')
      .then(res => res.json())
      .then(json => this.createReviewInstances(json))
  }

  createReviewInstances(json) {
    json.forEach(review => {
      let rev = new Review(review);
      reviews.push(rev);
      movies.find(film => film.id === rev.movie_id).reviews.push(rev);
    })
  }

  renderReviewCards(reviewArray, card) {
    reviewArray.forEach(review => {

    })
  }
}
