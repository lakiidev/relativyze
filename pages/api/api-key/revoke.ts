import { withMethods } from "@/app/lib/api-middlewares/with-methods";
import { authOptions } from "@/app/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import type { RevokeApiData } from "@/types/api";
import { db } from "@/app/lib/db";
import { z } from "zod";
const handeler = async (
  req: NextApiRequest,
  res: NextApiResponse<RevokeApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );
    if (!user) {
      return res.status(401).json({ error: "Unauthorized", success: false });
    }

    const validApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });
    if (!validApiKey) {
      return res
        .status(500)
        .json({ error: "This api key could not be revoked", success: false });
    }

    await db.apiKey.update({
      where: {
        id: validApiKey.id,
      },
      data: {
        enabled: false,
      },
    });

    return res.status(200).json({ error: null, success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues, success: false });
    }

    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};

export default withMethods(["POST"], handeler);
