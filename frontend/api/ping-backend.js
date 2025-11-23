export default async function handler(req, res) {
  try {
    const warmupUrl = process.env.BACKEND_WARMUP_URL;
    await fetch(warmupUrl);
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}

// vercel stuff to keep the server on