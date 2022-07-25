import Campground from '../models/campground.js';
import Review from '../models/review.js';

export const createReview = async (req, res) => {
  console.log(req.body);
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await Promise.all[(review.save(), campground.save())];
  req.flash('success', 'Created new review!');
  res.redirect(`/campgrounds/${campground.id}`);
};

export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review!');
  res.redirect(`/campgrounds/${id}`);
};
