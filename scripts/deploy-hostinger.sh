#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
case "${1:---dry-run}" in
  --dry-run) deploy=0 ;;
  --deploy) deploy=1 ;;
  *) echo 'Usage: bash scripts/deploy-hostinger.sh [--dry-run|--deploy]' >&2; exit 2 ;;
esac
: "${PERSONAL_DEPLOY_HOST:?Set the SSH host}"
: "${PERSONAL_DEPLOY_USER:?Set the SSH user}"
: "${PERSONAL_DEPLOY_PORT:?Set the SSH port}"
: "${PERSONAL_DEPLOY_KEY:?Set the SSH key path}"
: "${PERSONAL_DEPLOY_PATH:?Set the verified personal-site document root}"
# This script is deliberately restricted to the verified luc.sh destination.
[[ "$PERSONAL_DEPLOY_PATH" = /home/bornar/luc.sh ]] || { echo 'Unexpected destination' >&2; exit 1; }
[[ "$PERSONAL_DEPLOY_USER" =~ ^[a-zA-Z0-9_-]+$ && "$PERSONAL_DEPLOY_HOST" =~ ^[a-zA-Z0-9.-]+$ && "$PERSONAL_DEPLOY_PORT" =~ ^[0-9]+$ ]] || exit 1
[[ -f "$PERSONAL_DEPLOY_KEY" && -f out/index.html && -d out/_next ]] || { echo 'Missing key or production export' >&2; exit 1; }
if grep -Eq 'noindex|preview-[a-f0-9]{32}' out/index.html; then echo 'Refusing preview export' >&2; exit 1; fi
if [[ -e out/.htaccess || -e out/robots.txt ]]; then echo 'Review root crawler/server configuration before deploying it' >&2; exit 1; fi
ssh_args=(-i "$PERSONAL_DEPLOY_KEY" -p "$PERSONAL_DEPLOY_PORT" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=yes)
printf -v ssh_command '%q ' ssh "${ssh_args[@]}"
target="$PERSONAL_DEPLOY_USER@$PERSONAL_DEPLOY_HOST"
root="$PERSONAL_DEPLOY_PATH"
rsync -az --no-perms --omit-dir-times --dry-run --itemize-changes -e "$ssh_command" out/ "$target:$root/"
[[ "$deploy" = 1 ]] || exit 0
[[ -z "$(git status --porcelain)" ]] || { echo 'Commit changes before deployment' >&2; exit 1; }
commit=$(git rev-parse HEAD)
release_id="$(date -u +%Y%m%dT%H%M%SZ)-${commit:0:12}"
release="/home/bornar/site-releases/luc-sh/$release_id"
mkdir -p .release
tar -czf ".release/$release_id.tar.gz" -C out .
shasum -a 256 ".release/$release_id.tar.gz" > ".release/$release_id.sha256"
# Backup only files this release could replace, plus hosting configuration.
# Unrelated applications, downloads, and preview directories are never synced/deleted.
ssh "${ssh_args[@]}" "$target" "bash -s -- '$root' '$release' '$commit'" <<'REMOTE'
set -euo pipefail
root=$1; release=$2; commit=$3
[[ -f "$root/index.html" ]]
mkdir -p "$(dirname "$release")"
mkdir -m 700 "$release"
mkdir "$release/site"
cd "$root"
files=()
for file in index.html 404.html logo.svg dither-cube.svg _next .htaccess robots.txt; do
  if [[ -e "$file" ]]; then files+=("$file"); fi
done
tar -czf "$release/previous-site.tar.gz" "${files[@]}"
tar -tzf "$release/previous-site.tar.gz" > "$release/backup-files.txt"
printf '%s\n' "$commit" > "$release/commit.txt"
sha256sum index.html > "$release/previous-index.sha256"
printf '#!/usr/bin/env bash\nset -euo pipefail\ntar -xzf %q -C %q\n' "$release/previous-site.tar.gz" "$root" > "$release/rollback.sh"
chmod 700 "$release/rollback.sh"
REMOTE
rsync -az -e "$ssh_command" out/ "$target:$release/site/"
rsync -az -e "$ssh_command" ".release/$release_id.tar.gz" ".release/$release_id.sha256" "$target:$release/"
ssh "${ssh_args[@]}" "$target" "bash -s -- '$root' '$release'" <<'REMOTE'
set -euo pipefail
root=$1; release=$2
# Existing hashed assets remain available to visitors holding older HTML.
rsync -a --no-perms --omit-dir-times --exclude '*.html' "$release/site/" "$root/"
for file in 404.html index.html; do
  cp "$release/site/$file" "$root/.$file.next"
  chmod 644 "$root/.$file.next"
  mv -f "$root/.$file.next" "$root/$file"
done
sha256sum "$root/index.html" > "$release/deployed-index.sha256"
REMOTE
printf '%s\n' "$release" > .release/latest-remote.txt
printf 'Deployed commit %s\nBackup and rollback: %s\n' "$commit" "$release"
