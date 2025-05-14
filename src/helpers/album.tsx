import useSWR from "swr";
import { Album } from "../constants/types/album";

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

export const useGetAlbums = (param?: any) => {
    const { data, error, isLoading, mutate } = useSWR('https://jsonplaceholder.typicode.com/albums', fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
};

export const useGetAlbumById = (id: number) => {
    const { data, error, isLoading, mutate } = useSWR<Album>(`https://jsonplaceholder.typicode.com/albums/${id}`, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
}

