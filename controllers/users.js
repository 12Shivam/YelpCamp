import User from '../models/user.js';

export const renderRegister = (req, res) => {
  if (req.isAuthenticated()) return res.render('/campgrounds');
  res.render('users/register');
};

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registedUser = await User.register(user, password);
    req.login(registedUser, err => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

export const renderLogin = (req, res) => {
  if (req.isAuthenticated()) return res.render('/campgrounds');
  res.render('users/login');
};

export const login = (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

export const logout = (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
  });
};
