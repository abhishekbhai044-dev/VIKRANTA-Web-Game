# VIKRANTA Web Game — Asset Storage Policy

GitHub is the source repository, not the production CDN for large game assets.

## Keep in GitHub
- Source code
- Configuration templates
- Small UI/static assets
- GDD/TDD and documentation
- CI configuration

## Keep outside GitHub
- Large textures, audio, video and downloadable bundles
- Generated build artifacts
- Player save data
- Database exports/backups

Large runtime assets should be delivered from object storage/CDN and referenced by stable versioned URLs from the web client.

Never place credentials, service-role keys, signing keys or private deployment tokens in the repository.
