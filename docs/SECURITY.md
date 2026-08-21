# VIKRANTA Web Game — Public Repository Security

This repository is public by design.

## Rules
- Never commit `.env` files or credentials.
- Only the Supabase publishable/anonymous browser key may be exposed to the client when protected by Row Level Security.
- Never expose a Supabase service-role key in browser code, Git history, CI logs or public documentation.
- Production secrets belong in the deployment/CI secret store.
- Player data belongs in the backend, not GitHub.
- Large runtime assets belong in object storage/CDN, not Git history.

## Before merging
- Review new dependencies.
- Search for tokens, private keys and credentials.
- Confirm client code only uses public configuration.
- Keep server-authoritative gameplay operations behind authenticated backend APIs/RPCs.
