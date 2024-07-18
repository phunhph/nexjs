import { NextApiRequest, NextApiResponse } from "next";

export const requireAuth = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  const isAuthenticated = !!req.cookies.accessToken;

  if (!isAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
