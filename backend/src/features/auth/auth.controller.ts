import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleSignup(req: Request, res: Response) {
  try {
    const { credential } = req.body as { credential?: string };

    if (!credential) {
      return res.status(400).json({ error: "Missing Google credential" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    return res.json({
      user: {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture
      }
    });
  } catch (error) {
    console.error("Google signup failed:", error);
    return res.status(401).json({ error: "Google signup failed" });
  }
}
