const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// Production checks must not overwrite assets used by a running local preview.
module.exports = (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});
