import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthState } from "../../../services/auth/authStore";
import { buildAuth } from "../../../services/auth/authUtils";
import { httpClient } from "../../../services/shared/httpClient";

/**
 * OAuth Callback Handler Page
 * - Extracts access token from URL hash (not sent to server)
 * - Refresh token is in secure httpOnly cookie (set by backend)
 * - Stores access token in auth context
 * - Refresh token is automatically sent with credentials (no manual handling needed)
 */
export const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Parse hash fragment (not sent to server)
      // Format: #accessToken=...&userId=...
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);

      const accessToken = params.get("accessToken");
      const userId = params.get("userId");
      const error = params.get("error");

      if (error) {
        console.error("OAuth error:", error);
        navigate("/login?error=" + error);
        return;
      }

      if (accessToken && userId) {
        try {
          // Fetch user details from /auth/me endpoint
          httpClient
            .get("/auth/me", {
              headers: { Authorization: `Bearer ${accessToken}` },
              skipAuthRefresh: true,
            })
            .then((response) => {
              const user = response?.data?.data?.user;
              if (user) {
                // Build auth object with user and token
                const auth = buildAuth(user, accessToken);
  
                setAuthState(auth);
                window.history.replaceState(
                  {},
                  document.title,
                  window.location.pathname
                );
                // Redirect to home
                navigate("/");
              } else {
                navigate("/login?error=user_not_found");
              }
            })
            .catch((err) => {
              console.error("OAuth callback error:", err);
              navigate("/login?error=processing_failed");
            });
        } catch (err) {
          console.error("OAuth callback error:", err);
          navigate("/login?error=processing_failed");
        }
      } else {
        navigate("/login?error=missing_tokens");
      }
    } catch (err) {
      console.error("OAuth callback parse error:", err);
      navigate("/login?error=parse_failed");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Completing login...</h2>
        <p className="text-slate-600">
          Please wait while we finalize your login.
        </p>
      </div>
    </div>
  );
};
