import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQueryParams(paramName?: string) {
  const { search } = useLocation();
  return useMemo(() => {
    const urlSearchParams = new URLSearchParams(search);
    return paramName ? urlSearchParams.get(paramName) : urlSearchParams;
  }, [search, paramName]);
}
