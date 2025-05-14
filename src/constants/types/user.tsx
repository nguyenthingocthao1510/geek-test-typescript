export interface User {
    id?: number,
    name?: string,
    username?: string,
    email?: string,
    address?: Address,
    phone?: string,
    website?: string,
}

export type Address = {
    street?: string,
    suit?: string,
    city?: string,
    zipcode?: string,
    geo?: {
        lat?: number,
        lng?: number,
    }
}