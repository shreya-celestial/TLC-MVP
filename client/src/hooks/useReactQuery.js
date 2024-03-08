import { useQuery } from '@tanstack/react-query';

export function useReactQuery(queryKey, fetchFn, options, sleep) {
  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchFn({ signal, queryKey, sleep }),
    ...options,
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}
