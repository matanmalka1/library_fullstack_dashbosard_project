import express from "express";
import passport from "passport";
import { logger } from "../utils/logger.js";
import * as authService from "../services/auth.service.js";

export const router = express.Router();

const handleOAuthCallback = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      logger.warn("OAuth callback: User not found");
      return res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=auth_failed`);
    }

    // Use service to handle token generation and storage
    const { accessToken, refreshToken } = await authService.handleOAuthLogin(user);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE
        ? process.env.COOKIE_SECURE === "true"
        : isProduction,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      path: "/",
    });

    const frontendBase = process.env.FRONTEND_URL || "http://localhost:5173";
    const redirectUrl = `${frontendBase}/auth/callback#accessToken=${encodeURIComponent(
      accessToken
    )}&userId=${encodeURIComponent(user._id.toString())}`;

    res.redirect(redirectUrl);
  } catch (error) {
    logger.error("OAuth callback error:", error.message);
    res.redirect(
      `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/login?error=server_error`
    );
  }
};

// Redirects user to Google login consent screen
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Called by Google after user grants permission
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleOAuthCallback
);

// Redirects user to GitHub login consent screen
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Called by GitHub after user grants permission
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  handleOAuthCallback
);
