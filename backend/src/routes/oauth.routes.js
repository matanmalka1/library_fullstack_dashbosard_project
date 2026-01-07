import express from "express";
import passport from "passport";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { RefreshToken } from "../models/index.js";
import { logger } from "../utils/logger.js";
import crypto from "node:crypto";

export const router = express.Router();

/**
 * Google OAuth initiation
 * Redirects user to Google login consent screen
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * Google OAuth callback
 * Called by Google after user grants permission
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleOAuthCallback
);

/**
 * GitHub OAuth initiation
 * Redirects user to GitHub login consent screen
 */
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

/**
 * GitHub OAuth callback
 * Called by GitHub after user grants permission
 */
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  handleOAuthCallback
);

/**
 * Common OAuth callback handler
 * - Generates JWT tokens (access + refresh)
 * - Sets refresh token as secure httpOnly cookie (XSS-safe, sent only with credentials)
 * - Redirects to frontend with access token in URL hash (not sent to server)
 * - Frontend extracts token from hash and stores in memory
 */
async function handleOAuthCallback(req, res) {
  try {
    const user = req.user;

    if (!user) {
      logger.warn("OAuth callback: User not found");
      return res.redirect(
        `${
          process.env.FRONTEND_URL || "http://localhost:5173"
        }/login?error=auth_failed`
      );
    }

    // Generate JWT tokens
    // Use `userId` in payload to match verification logic elsewhere
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });
    const refreshToken = generateRefreshToken({ userId: user._id.toString() });

    // Store only a hashed representation of the refresh token in DB.
    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await RefreshToken.create({
      token: tokenHash,
      user: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // Set refresh token as secure httpOnly cookie
    // Benefits:
    // - httpOnly: Cannot be accessed by JavaScript (immune to XSS)
    // - secure: Only sent over HTTPS (in production)
    // - sameSite=lax: CSRF protection, allows top-level navigations
    // - path=/: Sent with all requests
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

    // Redirect to frontend with access token in URL hash
    // Encode values to ensure special characters in JWT do not break the fragment
    // Hash fragments (#) are not sent to server, so tokens stay client-side
    const frontendBase = process.env.FRONTEND_URL || "http://localhost:5173";
    const redirectUrl = `${frontendBase}/auth/callback#accessToken=${encodeURIComponent(
      accessToken
    )}&userId=${encodeURIComponent(user._id.toString())}`;

    logger.info(
      `OAuth login successful for user: ${user.email} - redirecting to frontend callback`
    );
    res.redirect(redirectUrl);
  } catch (error) {
    logger.error("OAuth callback error:", error.message);
    res.redirect(
      `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/login?error=server_error`
    );
  }
}

export default router;
