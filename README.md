# VIKRANTA Web Game

**VIKRANTA — Valor is the Root of Victory**

This repository contains the browser-first VIKRANTA web game.

## Architecture

- Web-first game client
- Supabase Auth + PostgreSQL backend
- Server-authoritative player state, inventory, progression and rewards
- Browser E2E verification
- GitHub is the source of truth

## Security

Never commit secrets, service-role keys, private keys, or `.env` files. The browser may use only the Supabase publishable/anon client configuration protected by Row Level Security.
