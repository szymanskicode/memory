import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = (props) => {
  const { user, setUser } = props.data;
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [usernameFlag, setUsernameFlag] = useState(false);
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Player name validation
    if (username.trim().length < 1) {
      setError('Podaj nazwę gracza.');
    } else if (username.trim().length > 10) {
      setError('Nazwa jest za długa (max 10 znaków).');
    } else {
      setError('');
      setFormValid(true);
      setUser(username.trim());
      setUsernameFlag((prev) => !prev);
    }
  };

  // If player name is set, redirect to game
  useEffect(async () => {
    if (user && formValid) {
      await setFormValid(false);
      history.push('/game');
    }
  }, [user, usernameFlag]);

  return (
    <>
      <div className='offset'></div>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
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
                  <h1 style={{ fontSize: '16px' }}>PODAJ NAZWĘ GRACZA</h1>
                </label>
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  type='text'
                  name='username'
                  className='form-control'
                  id='username'
                />
              </div>
              {error && <div className='alert alert-danger'>{error}</div>}
              <button
                type='submit'
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
