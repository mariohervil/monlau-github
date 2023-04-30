import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default withClerkMiddleware(() => {
  console.log("Middleware Running");
  return NextResponse.next();
});

/*
export const allowSignupFromIP = async ({ ctx }, next) => {
  const session = await getSession(ctx.req, ctx.res);
  const allowedIPs = ["192.168.0.1", "10.0.0.1"];
  const userIP = session.user.ip;

  if (!allowedIPs.includes(userIP)) {
    ctx.res.statusCode = 403;
    ctx.res.end("Access denied");
  } else {
    await next();
  }
};

*/

export const config = {
  matcher: ["/((?!static|.*\\..*|_next|favicon.ico).*)", "/"],
};
