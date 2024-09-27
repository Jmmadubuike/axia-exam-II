//npm install passport passport-google-oauth20

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Configure Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;

    try {
        // Check if user exists
        let user = await User.findOne({ email: emails[0].value });

        if (!user) {
            // If user doesn't exist, create new user
            user = new User({
                username: displayName,
                email: emails[0].value,
                password: null // Password will not be used for OAuth users
            });

            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
  }
));
