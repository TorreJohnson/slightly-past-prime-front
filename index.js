document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM is loaded')

  function createCards (movie) {
    console.log(movie)
    let bod = document.getElementsByClassName('bod')
    let div = document.createElement('div')
    div.innerHTML = `<div class="ui link cards">
                      <div class="card">
                        <div class="image">
                          <img src="${movie[0].poster_url}" style="height:200px,width:132px">
                        </div>
                        <div class="content">
                          <div class="header">${movie[0].title}</div>
                          <div class="meta">
                            <a>Rated ${movie[0].mpaa_rating}</a>
                          </div>
                          <div class="description">
                            ${movie[0].tag_line}
                          </div>
                        </div>
                        <div class="extra content">
                        <span class="center floated">
                          ${movie[0].runtime} Minutes
                        </span>
                        <span>
                          Released: ${movie[0].release_date}
                        </span>
                      </div>
                    </div>
                    <div class="card">
                      <div class="image">
                        <img src="${movie[1].poster_url}" style="height:200px,width:132px">
                      </div>
                      <div class="content">
                        <div class="header">${movie[1].title}</div>
                        <div class="meta">
                          <a>Rated ${movie[1].mpaa_rating}</a>
                        </div>
                        <div class="description">
                          ${movie[1].tag_line}
                        </div>
                      </div>
                      <div class="extra content">
                      <span class="center floated">
                        ${movie[1].runtime} Minutes
                      </span>
                      <span>
                        Released: ${movie[1].release_date}
                      </span>
                    </div>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="${movie[2].poster_url}" style="height:200px,width:132px">
                    </div>
                    <div class="content">
                      <div class="header">${movie[2].title}</div>
                      <div class="meta">
                        <a>Rated ${movie[2].mpaa_rating}</a>
                      </div>
                      <div class="description">
                        ${movie[2].tag_line}
                      </div>
                    </div>
                    <div class="extra content">
                    <span class="center floated">
                      ${movie[2].runtime} Minutes
                    </span>
                    <span>
                      Released: ${movie[2].release_date}
                    </span>
                  </div>
                </div>`
    bod[0].appendChild(div)
  }

  function fetchMovies () {
    fetch('http://localhost:3000/api/movies')
      .then(res => res.json())
      .then(json => createCards(json))
  }

  fetchMovies()
})
