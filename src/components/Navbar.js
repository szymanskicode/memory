import { Link } from 'react-router-dom';

const Navbar = () => {
  const closeNavbar = () => {
    const navbar = document.getElementById('hamburgerMenu');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  };

  return (
    <nav
      className='navbar fixed-top navbar-expand-lg navbar-light '
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
    >
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/' style={{ opacity: 1 }}>
          MEMORY
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#hamburgerMenu'
          aria-controls='hamburgerMenu'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='hamburgerMenu'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                onClick={() => closeNavbar()}
                className='nav-link'
                to='/game'
                style={{ opacity: 0.8 }}
              >
                Graj
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                onClick={() => closeNavbar()}
                className='nav-link'
                to='/scores'
                style={{ opacity: 0.8 }}
              >
                Wyniki
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
