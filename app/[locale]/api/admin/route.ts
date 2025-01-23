import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { ua } = userAgent(req);

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  const data = {
    ok: true,
    ip: req.headers.get("x-forwarded-for"),
    ip_address: ip,
    user_agent: ua,
  };

  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
