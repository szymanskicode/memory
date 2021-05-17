import { useState, useEffect } from 'react';

const Scores = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/users?_sort=time&_order=asc&_limit=10')
      .then((response) => {
        if (response.status !== 200 && response.status !== 304) {
          throw Error;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTopUsers(data);
          setIsLoading(false);
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        setError(
          'Wystąpił problem z bazą danych. Uruchom: json-server --watch db.json --port 5000'
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className='offset'></div>
      <div className='container'>
        <div className='row'>
          {isLoading && (
            <div className='col-12 text-center'>Trwa wczytywanie danych...</div>
          )}
          {!isLoading && (
            <div className='col-12 top-users'>
              {!error && <p>TOP 10 GRACZY</p>}

              {topUsers.length > 0 && (
                <table
                  className='table table-dark table-hover'
                  style={{ opacity: 0.65, maxWidth: '400px', margin: '0 auto' }}
                >
                  <thead>
                    <tr>
                      <th scope='col'>GRACZ</th>
                      <th scope='col' style={{ textAlign: 'right' }}>
                        CZAS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topUsers.map((topUser) => {
                      return (
                        <tr key={Math.floor(Math.random() * 1000000)}>
                          <td>{topUser.name}</td>
                          <td style={{ textAlign: 'right' }}>{topUser.time}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {topUsers.length < 1 && !error && (
                <div className='alert alert-info'>
                  Brak wyników do wyświetlenia.
                </div>
              )}

              {error && <div className='alert alert-danger'>{error}</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Scores;
