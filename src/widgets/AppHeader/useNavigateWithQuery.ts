import { useLocation, useNavigate } from 'react-router-dom';

export function useNavigateWithQuery() {
  const navigate = useNavigate();
  const location = useLocation();

  return (pathname: string) => {
    navigate({
      pathname,
      search: location.search
    });
  };
}
