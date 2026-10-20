#!/usr/bin/env bash
# Activates an uploaded release on the production server (called by .github/workflows/ci-cd.yml).
#
# Layout under DEPLOY_PATH:
#   releases/<id>/   one directory per deploy
#   shared/.env      production environment file (created by hand, never deployed)
#   shared/storage/  persistent storage (logs, uploaded admin photos)
#   current -> releases/<id>   the live release (CloudPanel root: <domain>/current/public)
#
# Only `migrate --force` is ever run here. Destructive commands (migrate:fresh, refresh,
# reset, db:wipe) are additionally blocked in production by AppServiceProvider.
set -euo pipefail

release_id="${1:?usage: deploy.sh <release-id>}"
app_dir="${DEPLOY_PATH:?DEPLOY_PATH is required}"
php="${PHP_BIN:-php8.5}"
keep="${KEEP_RELEASES:-5}"

release="$app_dir/releases/$release_id"
shared="$app_dir/shared"

activated=0
trap '[ "$activated" = 1 ] || { echo "Deploy failed; removing $release" >&2; rm -rf "$release"; }' EXIT

[ -d "$release" ] || { echo "Release directory $release not found" >&2; exit 1; }
[ -f "$shared/.env" ] || { echo "Missing $shared/.env; create it before deploying" >&2; exit 1; }

mkdir -p \
    "$shared/storage/app/public" \
    "$shared/storage/app/private" \
    "$shared/storage/framework/cache/data" \
    "$shared/storage/framework/sessions" \
    "$shared/storage/framework/views" \
    "$shared/storage/logs"

ln -sfn "$shared/.env" "$release/.env"
rm -rf "$release/storage"
ln -sfn "$shared/storage" "$release/storage"

cd "$release"
"$php" artisan storage:link --no-interaction
"$php" artisan migrate --force --no-interaction
"$php" artisan optimize --no-interaction

ln -sfn "$release" "$app_dir/current.next"
mv -Tf "$app_dir/current.next" "$app_dir/current"
activated=1
echo "Release $release_id is live"

live="$(readlink -f "$app_dir/current")"
find "$app_dir/releases" -mindepth 1 -maxdepth 1 -type d | sort -r | tail -n +$((keep + 1)) | while read -r old; do
    [ "$(readlink -f "$old")" = "$live" ] || rm -rf "$old"
done
