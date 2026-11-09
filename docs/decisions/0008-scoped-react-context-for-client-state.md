# ADR-0008: Scoped React context for client state

- **Status:** Accepted
- **Date:** 2026-11-09
- **Origin:** Implementation default

## Context

The Home feed's interactions share state across distant components:

- the top-bar search and the sidebar's Home link control the feed
- the composer, post actions and a rail button all change what the feed shows

All of it is session-only preview state; nothing is saved to a server.

## Decision

We use three React context providers, each mounted at the closest common parent
of the components that use it:

- `FeedViewProvider` in the `(workplace)` layout: search query and active tab.
- `DemoDialogProvider` in the `(workplace)` layout: the illustrative
  destination dialog.
- `HomeFeedProvider` in `HomeTemplate`: drafts, saved and appreciated posts,
  feed preferences, and the compose and customize dialogs.

There's no global store and no persistence.

## Consequences

- No extra dependency, and state stays close to where it's used.
- Cache Components' route preservation keeps Home's state across navigation.
- Typing in search re-renders the components that read `FeedViewProvider`.
  That's acceptable for this feed size; revisit if the feed becomes large.
- When real data arrives, server state (posts, saved items) should come from
  the API. These providers would then hold only UI state.

## Alternatives considered

- **Zustand or another store:** not needed for three small, well-scoped pieces
  of state.
- **Search and tab in URL search parameters** (`?q=`, `?tab=`): shareable and
  idiomatic, but under Cache Components it needs `<Suspense>` around readers.
  There's no sharing need yet. Revisit when search is backed by the server.
