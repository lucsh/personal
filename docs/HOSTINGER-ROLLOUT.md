# Hostinger rollout plan

Target launch: the week of 2–8 November 2026; exact day to be selected.
Branch: `feat/site-refresh-hostinger`.

## Deployment approach

Build the personal homepage locally and upload the contents of `out/` to the
existing site's document root. Next.js exports HTML, JavaScript, CSS, and public
assets; Hostinger does not need to run Node.js. The interactive cube runs in the
visitor's browser.

Use the workout tracker's local SSH/rsync approach as the reference:

- `../personal-workout-tracker/scripts/deploy.sh`
- `../personal-workout-tracker/docs/DEPLOY.md`

That repository documents SSH connection failures from GitHub-hosted runners
and successful local deployment. Follow the established local workflow unless
new verification shows the hosting access has changed. GitHub can retain source
and release artifacts without performing the upload.

The personal site's domain/document root and access have not yet been verified.
Do not reuse the workout tracker's destination path. Its script uses `--delete`,
which must not be copied blindly into a deployment targeting a shared web root.

## Preparation this week

1. Finish content and review the redesign on desktop and a physical phone.
   Confirm the title, phone, email, MAX/leadership descriptions, and links.
   Add named agent-workflow projects and a résumé only when supplied; they do
   not need to block the initial launch.
2. Make the build reproducible. The current export passes with Node 14.21.3 and
   the existing Yarn lockfile. Pin the verified tool versions for this release,
   rather than depending on the temporary runtime under `/tmp` or resolving
   `next@latest`. Keep the framework upgrade a separate task.
3. Verify the live domain and its exact document root with a read-only hosting
   inspection. Check `.htaccess`, redirects, index-file precedence, TLS, and any
   other applications or subdomain directories inside that root. Reuse existing
   SSH access only after confirming it reaches the intended site.
4. Add a site-specific deployment script and ignored configuration with
   `PERSONAL_DEPLOY_*` settings. Require an explicit destination, support a
   dry-run-only mode, and show the file changes before upload. Preserve hosting
   configuration and unrelated directories. Never upload source, `node_modules`,
   `.git`, or local configuration; only deploy the exported `out/` contents.
5. Save a timestamped backup of the existing site outside the public document
   root, including hidden configuration files. Record the source revision and
   checksum of the new release artifact and the exact restore command/path.
6. Preview the exact export over HTTP. Verify desktop pointer and mobile touch
   behavior, reduced motion, no horizontal overflow, all contact links, metadata,
   and successful loading of every referenced script and stylesheet. If using a
   remote staging site, give it a separate document root/subdomain: the export's
   absolute asset URLs mean a plain subfolder is not equivalent.

## Launch next week

1. Choose the launch day after reviewing the final preview. Commit the reviewed
   files on this branch, push it, and merge through the repository's normal
   review process. Record the deployed commit; a merge alone does not deploy.
2. Build once from that revision and retain the exact artifact for deployment.
   Confirm the backup and run the destination-specific rsync dry run.
3. Upload new assets before replacing HTML. Retain previous hashed `_next`
   assets initially so visitors with older HTML do not receive missing scripts.
   Publish HTML last, using a temporary filename and rename for the homepage
   where supported. Do not use blanket deletion on the document root.
4. Verify the actual HTTPS URL in a fresh browser: homepage, cube movement,
   touch, links, updated role/phone, and no JavaScript or asset errors. Check
   both canonical-domain redirects and response caching. Invalidate HTML cache
   only if an enabled hosting/CDN cache is serving the previous page.
5. If the release has a material regression, restore the backed-up HTML and
   associated assets/configuration, then verify the previous site is working.
   Keep both release artifacts until the new version is confirmed stable.

## Current state

The redesign builds and exports successfully with the legacy runtime. Desktop
pointer response, emulated touch/reset, reduced motion, and a 390px layout have
passed browser checks. Development output is isolated in `.next-dev/`, so
production builds no longer overwrite the running preview's assets.

This document is a plan. No live-host inspection, upload, DNS change, or
production deployment has been performed for this rollout.
