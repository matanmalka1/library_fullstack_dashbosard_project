import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env"
    : `.env.${process.env.NODE_ENV || "development"}`;

const preferredDevEnv = path.join(process.cwd(), ".env.development");
const envPath = path.join(process.cwd(), envFile);

if (!process.env.NODE_ENV && fs.existsSync(preferredDevEnv)) {
  dotenv.config({ path: preferredDevEnv });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

// Basic runtime validation for required environment variables and safe defaults.
const requiredEnvs = [
  "MONGODB_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
];

const missing = requiredEnvs.filter((k) => !process.env[k]);

if (missing.length) {
  const message = `Missing required environment variables: ${missing.join(", ")}`;
  if (process.env.NODE_ENV === "production") {
    // Fail fast in production
    throw new Error(message);
  } else {
    // Warn in development so developer can continue with defaults
    // eslint-disable-next-line no-console
    console.warn(message);
  }
}

// Enforce minimum secret length for JWT secrets
const minSecretLength = 32;
const weakSecrets = [
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
 ].filter((k) => process.env[k] && process.env[k].length < minSecretLength);

if (weakSecrets.length) {
  const msg = `Weak JWT secret(s) detected (must be >= ${minSecretLength} chars): ${weakSecrets.join(", ")}`;
  if (process.env.NODE_ENV === "production") {
    throw new Error(msg);
  } else {
    // eslint-disable-next-line no-console
    console.warn(msg);
  }
}
