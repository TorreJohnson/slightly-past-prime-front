document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM is loaded')

  let app = new Application();
  app.reviewEventListener();
  app.homeButtonEventListener();
  app.addMovieEventListener();
  app.addSearchListener();
  app.addReviewEventListener();
  app.addReviewEventListenerTwo();
})
