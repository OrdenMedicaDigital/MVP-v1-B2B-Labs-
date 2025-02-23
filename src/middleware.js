export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*", "/admin/dashboard/:path*"], callbacks:{
    pages: {
      signIn: "/",
    } 
}
}