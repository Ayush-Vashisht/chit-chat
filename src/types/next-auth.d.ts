type UserId = string

declare module 'next-auth/jwt' {
    interface JWT {
      id: UserId
    }
  }
  
  declare module 'next-authh' {
    interface Session {
      user: User & {
        id: UserId
      }
    }
  }