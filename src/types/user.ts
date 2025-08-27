export interface User {
    firstName: string,
    lastName: string,
    email: string,
    role: 'ARTIST' | 'COMPANY' | 'ADMIN',
    profilePicture: string,
    rating: number,
    industry: string,
    bio: string,
    createdAt: Date
}