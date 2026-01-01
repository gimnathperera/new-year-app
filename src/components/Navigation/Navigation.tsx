import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <Link 
        to="/" 
        className={location.pathname === '/' ? 'active' : ''}
      >
        Countdown
      </Link>
      <Link 
        to="/gift" 
        className={location.pathname === '/gift' ? 'active' : ''}
      >
        Open Gift
      </Link>
    </nav>
  );
};

export default Navigation;

