---
name: freestuff-api
description: Integrate with the FreeStuff API v2 (free games, ingame content and discounts) via REST or webhooks. Use when writing code that fetches FreeStuff products, receives FreeStuff webhooks, or verifies their signatures.
---

# FreeStuff API v2

Full documentation: https://docs.freestuffbot.xyz/llms-full.txt (every page is also available as markdown under `https://docs.freestuffbot.xyz/raw/<path>.md`).

## Before writing code

- Prefer an existing client library. Node / Bun: the official `freestuff` package (https://docs.freestuffbot.xyz/raw/libraries/node.md). Libraries handle compatibility dates and webhook verification for you.
- API keys and the app's Ed25519 public key come from https://dashboard.freestuffbot.xyz/ ("my application"). Never hardcode them.
- Free tier: webhooks only, partial data. REST content endpoints (`/products`, ...) need the "full" tier. Commercial use needs a separate agreement.

## REST

- Base URL: `https://api.freestuffbot.xyz/v2`
- Auth header on every request: `Authorization: Bearer <api key>`
- Always pin a compatibility date (`YYYY-MM-DD`, usually the day the integration was started, never in the future) with the `X-Compatibility-Date` header or the `compatibility_date` query parameter. Without one, the latest data format is used and may change without notice.
- Errors are Problem JSON (RFC 7807): `{ "type": "fsb:problem:...", "title": "...", "detail": "..." }`.
- Use `If-None-Match` with the previous `ETag` where supported; handle `304`.
- Endpoints and response shapes: https://docs.freestuffbot.xyz/raw/api-v2/rest-api.md

## Webhooks

- Delivered as `POST` following the Standard Webhooks spec. Body: `{ "type": "fsb:event:...", "timestamp": "...", "data": { ... } }`.
- Verify `Webhook-Signature` (Ed25519) over `msg_id.timestamp.payload` using the raw request body, with `Webhook-Id` and `Webhook-Timestamp` headers.
- `Webhook-Timestamp` uses a custom epoch: milliseconds = header × 1000 + 1735689600000. Reject old timestamps and remember message ids to prevent replays.
- Respond `204` (any `2xx` is fine) once the message is received, even if processing fails afterwards. Repeated failures over several days remove the webhook.
- Optionally respond with `X-Set-Compatibility-Date` to pin the format for future deliveries; the delivered format is in the `X-Compatibility-Date` request header.
- Events and payloads: https://docs.freestuffbot.xyz/raw/api-v2/webhooks.md

## Data model

Products, announcements, channels and all related types: https://docs.freestuffbot.xyz/raw/api-v2/concepts.md
