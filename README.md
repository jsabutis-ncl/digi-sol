# DigiSol — Digital ROSCA Platform

A modern, community-powered **Rotating Savings and Credit Association (ROSCA)** platform built with Next.js. Inspired by the Safe{Wallet} interface, DigiSol brings traditional savings circles into the digital age.

## What is a ROSCA?

A ROSCA is a group savings scheme where members contribute a fixed amount each period, and one member receives the total pool each round on a rotating basis. It's a centuries-old practice used worldwide for community finance.

## Features

- **Pool Management** — Create, join, and manage savings pools
- **Round Tracking** — Visual progress through each pool's rotation cycle
- **Contribution Tracking** — Monitor pending, paid, and overdue contributions
- **Member Management** — Invite members, manage roles, track trust scores
- **Smart Guarantor System** — Add guarantors for extra pool security
- **Instant Payouts** — Automated distribution when it's a member's turn
- **Turn Swapping** — Negotiate position swaps with other members
- **Bank Integration** — Connect bank accounts for automatic contributions

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Font:** Geist Sans / Geist Mono

## Getting Started

```bash
cd code/digi-sol
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Theme variables & base styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home dashboard
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx     # Main app shell (header + sidebar + content)
│   │   ├── Header.tsx       # Top navigation bar
│   │   └── Sidebar.tsx      # Left sidebar with navigation
│   └── dashboard/
│       ├── PoolBalance.tsx          # Total pool value display
│       ├── PendingContributions.tsx # Contribution tracker
│       ├── NewFeatures.tsx          # Feature announcements
│       ├── QuickActions.tsx         # Quick action cards
│       ├── PoolProgress.tsx         # Round rotation timeline
│       └── CommunityStats.tsx       # Community overview stats
```

## Design

Dark theme with green accent (#12FF80), modeled after the Safe{Wallet} interface pattern — sidebar navigation, contextual pool info, and a dashboard-centric layout.
