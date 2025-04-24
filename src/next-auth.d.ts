import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            success: boolean,
            token: string|null,
            user: {
                name: string,
                email: string,
                role: string,
                createdAt: string
                id: string,
                username:username,
                profileImg: string
            },
        iat: number,
        exp: number,
        jti: string
        }
    }
}