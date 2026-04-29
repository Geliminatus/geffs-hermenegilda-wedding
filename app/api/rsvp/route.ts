import { NextResponse } from "next/server";

const GIST_ID = process.env.RSVP_GIST_ID!;
const TOKEN = process.env.GITHUB_TOKEN!;
const FILE = "rsvps.json";

type RSVP = {
  id: string;
  name: string;
  contact: string;
  attending: boolean;
  guests: number;
  message?: string;
  created_at: string;
};

async function readGist(): Promise<{ rsvps: RSVP[] }> {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);
  const gist = await res.json();
  const raw: string = gist.files[FILE]?.content ?? "[]";
  return { rsvps: JSON.parse(raw) };
}

async function writeGist(rsvps: RSVP[]) {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: { [FILE]: { content: JSON.stringify(rsvps, null, 2) } },
    }),
  });
  if (!res.ok) throw new Error(`GitHub write failed: ${res.status}`);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, contact, attending, guests, message } = body;
    if (!name || !contact || attending === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { rsvps } = await readGist();

    const entry: RSVP = {
      id: crypto.randomUUID(),
      name: String(name).trim(),
      contact: String(contact).trim(),
      attending: Boolean(attending),
      guests: Number(guests) || 0,
      message: message ? String(message).trim() : undefined,
      created_at: new Date().toISOString(),
    };

    rsvps.push(entry);
    await writeGist(rsvps);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RSVP error:", err);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }
}

// Optional: read all RSVPs (useful for checking responses)
export async function GET() {
  try {
    const { rsvps } = await readGist();
    return NextResponse.json({ rsvps, count: rsvps.length });
  } catch (err) {
    return NextResponse.json({ error: "Failed to read RSVPs" }, { status: 500 });
  }
}
