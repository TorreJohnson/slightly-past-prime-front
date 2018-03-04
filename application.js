let movies = [];
let reviews = [];

class Application {
  constructor() {
    this.fetchMovies();
    this.fetchAllReviews();
  }

  createMovieCards(movie) {
    let movieCardDiv = document.getElementById('movieCards');
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
    let home = document.getElementById('homeButton');
    reviewButton.addEventListener('click', (event) => {
      reviewButton.classList.add('active');
      home.classList.remove('active');
      this.renderReviewCards(reviews, );
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

  renderReviewCards(reviewArray) {
    let reviewCardDiv = document.getElementById('movieCards');
    reviewCardDiv.innerHTML = '';
    reviewArray.forEach(review => {
      reviewCardDiv.innerHTML += `<div class="ui raised link teal card">
                                  <div class="content">
                                    <div class="header">${movies.find(film => film.id === review.movie_id).title}</div>
                                    <div class="meta">
                                      <span class="category">Rating: ${review.score}/4 Stars</span>
                                    </div>
                                    <div class="description">
                                      <p>${review.review_text}</p>
                                    </div>
                                  </div>
                                  <div class="extra content">
                                    <div class="right floated author">
                                      <img class="ui avatar image" src="${review.reviewer_pic_url}"> ${review.reviewer} - ${review.publication}
                                    </div>
                                  </div>
                                </div>`
    });
  }

  homeButtonEventListener() {
    let home = document.getElementById('homeButton');
    let review = document.getElementById('reviews');
    home.addEventListener('click', (event) => {
      home.classList.add('active');
      review.classList.remove('active');
      let movieCardDiv = document.getElementById('movieCards');
      movieCardDiv.innerHTML = '';
      movies.forEach(movie => this.createMovieCards(movie))
    })
  }
}
