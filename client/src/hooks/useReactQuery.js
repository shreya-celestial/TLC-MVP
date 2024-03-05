import { useQuery } from '@tanstack/react-query';

export function useReactQuery(queryKey, fetchFn) {
  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchFn({ signal, queryKey }),
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}
