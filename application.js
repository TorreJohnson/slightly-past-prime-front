let movies = [];
let reviews = [];

class Application {
  constructor() {
    this.fetchMovies();
    this.fetchAllReviews();
    this.reviewButton = document.getElementById('reviews');
    this.home = document.getElementById('homeButton');
    this.movieButton = document.getElementById('new-movie');
    this.searchBar = document.getElementById('search-bar');
    this.newReview = document.getElementById('newReview');
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
                                <div class="ui bottom attached button new-review">
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
    this.reviewButton.addEventListener('click', (event) => {
      this.adjustActiveTab();
      this.reviewButton.classList.add('active');
      this.renderReviewCards(reviews);
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
    this.home.addEventListener('click', (event) => {
      this.adjustActiveTab();
      this.home.classList.add('active');
      let movieCardDiv = document.getElementById('movieCards');
      movieCardDiv.innerHTML = '';
      movies.forEach(movie => this.createMovieCards(movie))
    })
  }

  addMovieEventListener() {
    this.movieButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.adjustActiveTab();
      this.movieButton.classList.add('active');
      let newMovieDiv = document.getElementById('movieCards');
      newMovieDiv.innerHTML = `<form class="ui form" id="new-movie-submission">
                                <div class="three fields">
                                  <div class="field">
                                    <label>Movie Title</label>
                                    <input type="text" placeholder="Movie Title">
                                  </div>
                                  <div class="field">
                                    <label>Director</label>
                                    <input type="text" placeholder="Director">
                                  </div>
                                  <div class="field">
                                    <label>Writer</label>
                                    <input type="text" placeholder="Writer">
                                  </div>
                                </div>
                                <div class="fields">
                                  <div class="ten wide field">
                                    <label>Tag Line</label>
                                    <input type="text" placeholder="Tag Line">
                                  </div>
                                  <div class="six wide field">
                                    <label>Release Date</label>
                                    <input type="date" placeholder="Date">
                                  </div>
                                </div>
                              </div>
                              <div class="field">
                                <div class="sixteen wide field">
                                  <label>Poster URL</label>
                                  <input type="text" placeholder="Poster URL">
                                </div>
                              </div>
                              <div class="fields">
                                <div class="eight wide field">
                                  <label>Runtime (In Minutes)</label>
                                  <input type="number" min="1" placeholder="Runtime">
                                </div>
                                <div class="eight wide field">
                                  <label>Rating</label>
                                  <select name="rating" multiple="" class="ui fluid dropdown">
                                    <option value="">Rating</option>
                                    <option value="G">G - General Audiences</option>
                                    <option value="PG">PG - Parental Guidance Suggested</option>
                                    <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
                                    <option value="R">R - Restricted</option>
                                    <option value="NC-17">NC17 - Adults Only</option>
                                  </select>
                                </div>
                              </div>
                              <div class="field">
                                <label>Summary</label>
                                <textarea></textarea>
                              </div>
                              <div class="ui button" id="submit" tabindex="0">Add Movie</div>
                              </form>`;
      this.addMovieForm();
    })
  }

  addMovieForm() {
    let newMovie = document.getElementById('submit');
    newMovie.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      let movieForm = document.getElementById('new-movie-submission');
      let movieObj = {
        title: movieForm[0].value,
        director: movieForm[1].value,
        writer: movieForm[2].value,
        tag_line: movieForm[3].value,
        release_date: movieForm[4].value,
        poster_url: movieForm[5].value,
        runtime: movieForm[6].value,
        mpaa_rating: movieForm[7].value,
        summary: movieForm[8].value,
      }
      let m = new Movie(movieObj);
      movies.push(m);
      this.adjustActiveTab()
      this.home.classList.add('active');
      let reviewCardDiv = document.getElementById('movieCards');
      reviewCardDiv.innerHTML = '';
      movies.forEach(movie => this.createMovieCards(movie));
      let options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: JSON.stringify({ movie: m })
      }
      fetch('http://localhost:3000/api/movies', options)
        .then(res => res.json())
        .then(json => console.log(json))
    });
  }

  adjustActiveTab() {
    this.reviewButton.classList.remove('active');
    this.home.classList.remove('active');
    this.movieButton.classList.remove('active');
    this.searchBar.classList.remove('active');
    this.newReview.classList.remove('active');
  }

  addSearchListener() {
    let search = document.getElementById('search-field');
    search.addEventListener('click', event => {
      let searchText = document.getElementById('search-text').value;
      let match = movies.find(mov => mov.title.toLowerCase() === searchText.toLowerCase());
      this.adjustActiveTab();
      this.searchBar.classList.add('active');
      document.getElementById('movieCards').innerHTML = '';
      this.createMovieCards(match);
    })
  }

  addReviewEventListener() {
    this.newReview.addEventListener('click', () => {
      console.log('Reviews will be added here');
    })
  }

  addReviewEventListenerTwo() {
    let btn = document.getElementsByClassName('new-review');
    console.log(btn);
    for(let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', (event) => {
        console.dir(event.target);
      })
    }
  }

  addReviewForm() {

  }
}
