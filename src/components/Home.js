import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = (props) => {
  const { user, setUser } = props.data;
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sprawdzenie błędów w nazwie gracza
    if (username.trim().length < 1) {
      setError('Podaj nazwę gracza');
    } else if (username.trim().length > 10) {
      setError('Nazwa jest za długa (max 10 znaków)');
    } else {
      setError('');
      setFormValid(true);
      setUser(username.trim());
    }
  };

  // Przekierowanie użytkownika do /game po prawidłowym ustawieniu nazwy
  useEffect(async () => {
    if (user && formValid) {
      await setFormValid(false);
      history.push('/game');
    }
  }, [user]);

  return (
    <>
      <div className='offset'></div>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <form
              className='mb-3'
              style={{ maxWidth: '300px', margin: '0 auto' }}
              autoComplete='off'
            >
              <div className='mb-3'>
                <label
                  htmlFor='username'
                  className='form-label text-center'
                  style={{ display: 'block', fontSize: '20px' }}
                >
                  PODAJ NAZWĘ GRACZA
                </label>
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  type='text'
                  className='form-control'
                  id='username'
                />
              </div>
              {error && <div className='alert alert-danger'>{error}</div>}
              <button
                onClick={handleSubmit}
                className='btn btn-primary'
                style={{ display: 'block', margin: '0 auto' }}
              >
                Graj
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
