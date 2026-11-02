const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// Production checks must not overwrite assets used by a running local preview.
module.exports = (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER
    ? ".next-dev"
    : process.env.NEXT_PUBLIC_SITE_BASE_PATH ? ".preview/next-build"
    : process.env.PERSONAL_RELEASE_BUILD ? ".release/next-build" : ".next",
  basePath: process.env.NEXT_PUBLIC_SITE_BASE_PATH || "",
});
