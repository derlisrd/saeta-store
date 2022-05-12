import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { APPNAME } from '../Config/globales';

// ----------------------------------------------------------------------

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = APPNAME;

  }, [pathname]);

  return null;
}
