import { useQuery } from '@tanstack/react-query';

export function useReactQuery(queryKey, fetchFn) {
  const [page, noOfRecords, filters] = queryKey;

  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchFn({ signal, page, noOfRecords, filters }),
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}
