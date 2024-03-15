import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import UserContext from '../store/userContext';

export function useReactQuery(queryKey, fetchFn, options, sleep) {

  const { user } = useContext(UserContext)
  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchFn({ signal, queryKey, sleep, user }),
    ...options,
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}
