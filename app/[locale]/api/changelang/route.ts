import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  const response = NextResponse.json(
    {
      Message: "Language Changed successfully.",
    },
    { status: 200 }
  );
  await response.cookies.set("lang", reqBody, {
    httpOnly: true,
    //    maxAge: 60 * 60 * 2, // 2 hours in seconds
  });

  return response;
  //   return NextResponse.json(
  //     {
  //       Message: "Language Changed successfully.",
  //     },
  //     { status: 200 }
  //   );
}
