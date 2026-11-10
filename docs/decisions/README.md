# Architecture decision records

An architecture decision record (ADR) captures one significant decision: the
context, what was decided, and the consequences. ADRs explain *why* the
codebase looks the way it does. For *what* changed and when, see
[progress.md](../progress.md).

Each record notes its **origin**:

- **Project owner:** an explicit choice made by the project owner. Revisit it
  with them.
- **Implementation default:** a choice made during implementation. It's open to
  revisit if needs change.

## Index

| ADR | Decision | Status | Origin | Date |
| --- | --- | --- | --- | --- |
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions | Accepted | Project owner | 2026-11-09 |
| [0002](0002-build-the-new-design-proposal.md) | Build the "New design proposal" | Accepted | Project owner | 2026-11-09 |
| [0003](0003-nextjs-app-router-with-cache-components.md) | Next.js 16 App Router with Cache Components and `src/` | Superseded by ADR-0013 | Implementation default | 2026-11-09 |
| [0004](0004-shadcn-ui-on-radix.md) | shadcn/ui on Radix (`radix-nova`) | Accepted | Implementation default | 2026-11-09 |
| [0005](0005-atomic-design-over-shadcn-primitives.md) | Atomic Design layered over shadcn primitives | Accepted | Project owner | 2026-11-09 |
| [0006](0006-brand-tokens-and-design-breakpoints.md) | Brand tokens and design-specific breakpoints | Accepted | Implementation default | 2026-11-09 |
| [0007](0007-custom-duotone-icon-set.md) | Custom two-tone icon set | Accepted | Implementation default | 2026-11-09 |
| [0008](0008-scoped-react-context-for-client-state.md) | Scoped React context for client state | Accepted | Implementation default | 2026-11-09 |
| [0009](0009-data-access-layer-over-fixtures.md) | Data access layer over illustrative fixtures | Accepted | Implementation default | 2026-11-09 |
| [0010](0010-placeholder-routes-for-unbuilt-sections.md) | Placeholder routes for unbuilt sections | Accepted | Project owner | 2026-11-09 |
| [0011](0011-temporary-imagery-cropped-from-prototype.md) | Temporary imagery cropped from the prototype | Accepted | Project owner | 2026-11-09 |
| [0012](0012-npm-as-package-manager.md) | npm as the package manager | Accepted | Implementation default | 2026-11-09 |
| [0013](0013-vite-and-react-router-instead-of-nextjs.md) | Vite and React Router instead of Next.js | Accepted | Project owner | 2026-11-09 |
| [0014](0014-lucide-icons-for-standard-controls.md) | Lucide icons for standard controls | Accepted | Project owner | 2026-11-09 |
| [0015](0015-type-scale-tokens.md) | Type scale tokens with a 12px minimum | Accepted | Project owner | 2026-11-09 |
| [0016](0016-figma-library-on-obra-community-kit.md) | Figma library on the Obra shadcn/ui Community kit | Superseded by ADR-0018 | Project owner | 2026-11-09 |
| [0017](0017-independent-figma-library.md) | An independent Ourigin Figma library based on shadcn/ui | Superseded by ADR-0018 | Project owner | 2026-11-09 |
| [0018](0018-fresh-figma-design-system.md) | A fresh Figma design system in two new files | Accepted | Project owner | 2026-11-10 |

## Writing a new ADR

Write one when a decision is costly to reverse, changes how others work, or
picks one option over reasonable alternatives (a library, a pattern, a
structural rule).

1. Copy [template.md](template.md) to `NNNN-short-title.md`, using the next
   number.
2. Fill it in with status **Proposed**. Change the status to **Accepted** once
   the team agrees.
3. Add it to the index above and mention it in [progress.md](../progress.md).
4. Don't rewrite an accepted ADR. To change a decision, write a new ADR that
   supersedes it:
   - set the old one's status to `Superseded by ADR-NNNN`
   - link back from the new one.

Statuses: `Proposed`, `Accepted`, `Deprecated`, `Superseded by ADR-NNNN`.
