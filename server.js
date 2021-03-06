import express from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import { process_port, facebook, google } from './config';

const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

const transformGoogleProfile = (profile) => ({
  name: profile.displayName,
  avatar: profile.picture,
});

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook,
    async (accessToken, refreshToken, profile, done)
    => {
      //console.log(JSON.stringify(profile));
      done(null, transformFacebookProfile(profile._json))
    }
));

// Register Google Passport strategy
passport.use(new GoogleStrategy(google,
  async (accessToken, refreshToken, profile, done)
    => {
      //console.log(JSON.stringify(profile));
      done(null, transformGoogleProfile(profile._json));
    }
));

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// Initialize http server
const app = express();

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

// Set up Google auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));
 
const server = app.listen(process_port, () => {
  const { address, port } = server.address();
  //console.log(server.address());
  console.log(`Listening at http://${address}:${port}`);
});
