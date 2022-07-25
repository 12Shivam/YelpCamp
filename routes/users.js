import express from 'express';
const router = express.Router({ mergeParams: true });

import passport from 'passport';
import catchAsync from '../utils/catchAsync.js';
import * as users from '../controllers/users.js';

router
  .route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
      keepSessionInfo: true,
    }),
    users.login
  );

router.get('/logout', users.logout);

export default router;
