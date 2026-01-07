import passport from "passport";
import { Strategy as GoogleOAuth2Strategy } from "passport-google-oauth20";
import { Strategy as GitHubOAuth2Strategy } from "passport-github2";
import { User, Role } from "../models/index.js";
import { logger } from "../utils/logger.js";

const findOrCreateUser = async (profile, provider) => {
  try {
    const oauthField = `oauth.${provider}.id`;
    let user = await User.findOne({ [oauthField]: profile.id });

    if (user) {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      return user;
    }

    // Try to find by email
    const email = profile.emails?.[0]?.value || profile.email;
    user = await User.findOne({ email });

    if (user) {
      // Link OAuth to existing user
      if (!user.oauth) user.oauth = {};
      user.oauth[provider] = {
        id: profile.id,
        displayName: profile.displayName || profile.name,
      };
      user.lastLogin = new Date();
      await user.save();
      return user;
    }

    // Create new user
    const defaultRole = await Role.findOne({ name: "USER" });
    if (!defaultRole) {
      throw new Error("Default USER role not found. Run database seed.");
    }

    const firstName =
      profile.name?.givenName || profile.displayName?.split(" ")?.[0] || "User";
    const lastName =
      profile.name?.familyName ||
      profile.displayName?.split(" ")?.[1] ||
      "User";
    const newEmail = email || `${provider}-${profile.id}@oauth.local`;

    const newUser = await User.create({
      email: newEmail,
      firstName,
      lastName,
      password: `oauth-${provider}-${profile.id}`, // Dummy password, user won't login with it
      role: defaultRole._id,
      oauth: {
        [provider]: {
          id: profile.id,
          displayName: profile.displayName || profile.name,
        },
      },
      lastLogin: new Date(),
      isActive: true,
    });

    logger.info(`New user created via ${provider} OAuth: ${newUser.email}`);
    return newUser;
  } catch (error) {
    logger.error(`Error in findOrCreateUser (${provider}):`, error.message);
    throw error;
  }
};

export const configureGoogleStrategy = () => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    logger.warn(
      "Google OAuth: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set. Google login disabled."
    );
    return;
  }

  passport.use(
    new GoogleOAuth2Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${
          process.env.API_URL || "http://localhost:3000/api/v1"
        }/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreateUser(profile, "google");
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  logger.info("Google OAuth strategy configured");
};

export const configureGitHubStrategy = () => {
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    logger.warn(
      "GitHub OAuth: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not set. GitHub login disabled."
    );
    return;
  }

  passport.use(
    new GitHubOAuth2Strategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${
          process.env.API_URL || "http://localhost:3000/api/v1"
        }/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreateUser(profile, "github");
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  logger.info("GitHub OAuth strategy configured");
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
