import useSWR from 'swr';

export const useGetAvatarForUser = (name: string) => {
    const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&rounded=true&size=50`;
    const { data, error } = useSWR(url, (url) => Promise.resolve(url));

    return {
        data,
        error,
    };
};
