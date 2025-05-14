import useSWR from "swr";
import { User } from "../constants/types/user";

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

export const useGetAllUsers = (param?: any) => {
    const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher)
    return {
        data,
        error,
    }
};

export const useGetAllAlbumForUser = (param?: any) => {
    const { data, error } = useSWR<User[]>('https://jsonplaceholder.typicode.com/users', fetcher)
    return {
        data,
        error,
    }
};

export const useGetUserById = (id: number) => {
    const { data, error, isLoading, mutate } = useSWR<User>(`https://jsonplaceholder.typicode.com/users/${id}`, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
}


