import express from 'express';
const router = express.Router({ mergeParams: true });

import catchAsync from '../utils/catchAsync.js';
import * as reviews from '../controllers/reviews.js';
import { isLoggedIn, isReviewAuthor, validateReview } from '../middleware.js';

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

export default router;
