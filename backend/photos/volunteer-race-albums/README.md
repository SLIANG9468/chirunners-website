# Volunteer race photo albums

Each subfolder name is an **album id** (lowercase letters, numbers, hyphens). Match it to `photoAlbumId` on a row in `VOLUNTEER_RACE_ROWS` in the frontend `siteContent.js`.

Put only image files (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`) in the album folder.

Example: `shamrock-shuffle-2026/` for the Shamrock Shuffle 2026 race.

Override the base directory with env `VOLUNTEER_RACE_ALBUMS_DIR` if needed.
