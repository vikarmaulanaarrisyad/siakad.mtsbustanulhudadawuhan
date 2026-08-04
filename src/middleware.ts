import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Example Role-based redirection logic
    if (path.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
      
      const role = token.role as string;
      const validDashboardPath = `/dashboard/${role.toLowerCase()}`;
      
      // If user tries to access root dashboard, redirect to their specific dashboard
      if (path === "/dashboard") {
         return NextResponse.redirect(new URL(validDashboardPath, req.url));
      }

      // If user tries to access another role's dashboard
      if (path.startsWith("/dashboard/") && !path.startsWith(validDashboardPath)) {
         return NextResponse.redirect(new URL(validDashboardPath, req.url));
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/login'
    }
  }
)

export const config = {
  matcher: ["/dashboard/:path*"]
}
