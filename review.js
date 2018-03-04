class Review {
  constructor({ id, movie_id, reviewer, publication, review_text, score, reviewer_pic_url, full_review_link}) {
    this.id = id;
    this.movie_id = movie_id;
    this.reviewer = reviewer;
    this.publication = publication;
    this.review_text = review_text;
    this.score = score;
    this.reviewer_pic_url = reviewer_pic_url;
    this.full_review_link = full_review_link;
  }
}
