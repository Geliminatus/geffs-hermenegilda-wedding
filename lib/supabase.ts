// RSVPs are stored in a private GitHub Gist via /api/rsvp.
// No external database account required.

export type RSVPInsert = {
  name: string;
  contact: string;
  attending: boolean;
  guests: number;
  message?: string;
};

export async function submitRSVP(data: RSVPInsert): Promise<void> {
  const res = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
}
