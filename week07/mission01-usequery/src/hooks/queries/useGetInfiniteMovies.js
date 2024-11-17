import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useGetMovies } from './useGetMovies'

function useGetInfiniteMovies(category) {
  return useInfiniteQuery({
        queryFn: ({pageParam}) => useGetMovies({category, pageParam}),
        queryKey: ['movies', category],
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage, allPages);
            // const lastMovie = lastPage.results[lastPage.results.length - 1];
            const lastMovie = lastPage.results.at(-1);

            return lastMovie ? allPages?.length + 1 : undefined;
        }
    })
}

export {useGetInfiniteMovies}