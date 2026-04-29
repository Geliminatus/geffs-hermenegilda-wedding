# Geff & Hermenegilda Wedding Website

A modern, elegant wedding website built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — dark navy + gold design system
- **Framer Motion** — scroll animations, page transitions
- **Supabase** — RSVP form storage
- **React Hot Toast** — notifications
- **Lucide React** — icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Create the Supabase `rsvps` table

Run this SQL in your Supabase SQL editor:

```sql
create table rsvps (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  contact text not null,
  attending boolean not null,
  guests int not null default 0,
  message text,
  created_at timestamptz default now()
);

alter table rsvps enable row level security;

create policy "Allow public insert" on rsvps
  for insert with check (true);
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, countdown, and highlights |
| `/story` | Animated timeline of the couple's story |
| `/details` | Ceremony info, dress code, travel tips, map |
| `/schedule` | Day-of timeline (14:00 → 22:00) |
| `/rsvp` | RSVP form with Supabase integration |
| `/gifts` | Payment details (CRDB Bank + M-Pesa) |
| `/gallery` | Responsive photo grid with lightbox |

## Deploy to Vercel

```bash
npm run build   # verify clean build first
```

Then connect your GitHub repo to [vercel.com](https://vercel.com) and add the two environment variables in the Vercel dashboard.

## Customization

- **Hero image**: Replace the CSS gradient in `components/Hero.tsx` with a real `next/image` background
- **Gallery photos**: Replace the picsum seeds in `components/ImageGallery.tsx` with real wedding photos
- **Story content**: Edit the `timeline` array in `app/story/page.tsx`
- **Colors**: Adjust `navy`, `gold`, and `soft-white` in `tailwind.config.ts`
