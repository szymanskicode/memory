import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';

// Obrazki kart
import img1 from '../images/card1.jpg';
import img2 from '../images/card2.jpg';
import img3 from '../images/card3.jpg';
import img4 from '../images/card4.jpg';
import img5 from '../images/card5.jpg';
import img6 from '../images/card6.jpg';
import img7 from '../images/card7.jpg';
import img8 from '../images/card8.jpg';

const Game = (props) => {
  const { user } = props.data;
  const history = useHistory();

  // Lokalny state
  const [intervalId, setIntervalId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [cards, setCards] = useState([]);
  const [pick1, setPick1] = useState({});
  const [pick2, setPick2] = useState({});
  const [pairs, setPairs] = useState(0);
  const [error, setError] = useState('');

  // Przekieruj użytkownika jeżeli nie podał nazwy gracza
  useEffect(() => {
    !user && history.push('/');
  }, []);

  // Tasowanie kart przed rozpoczęciem gry
  useEffect(() => {
    const deck = [
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'A',
        value: 1,
        img: img1,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'B',
        value: 1,
        img: img1,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'C',
        value: 2,
        img: img2,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'D',
        value: 2,
        img: img2,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'E',
        value: 3,
        img: img3,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'F',
        value: 3,
        img: img3,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'G',
        value: 4,
        img: img4,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'H',
        value: 4,
        img: img4,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'I',
        value: 5,
        img: img5,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'J',
        value: 5,
        img: img5,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'K',
        value: 6,
        img: img6,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'L',
        value: 6,
        img: img6,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'M',
        value: 7,
        img: img7,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'N',
        value: 7,
        img: img7,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'O',
        value: 8,
        img: img8,
        blocked: false,
        active: false,
      },
      {
        id: uuidv4(),
        sort: Math.random() * 100,
        name: 'P',
        value: 8,
        img: img8,
        blocked: false,
        active: false,
      },
    ];

    deck.sort((a, b) => {
      return parseFloat(a.sort) - parseFloat(b.sort);
    });

    setCards(deck);
  }, []);

  // Start timera po rozpoczęciu gry
  useEffect(() => {
    if (gameStarted) {
      const iid = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      setIntervalId(iid);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted]);

  // Wybór kart
  const pickCard = async (id, value) => {
    // Wybór pierwszej karty
    if (Object.keys(pick1).length === 0) {
      setPick1({ id, value });
      const newCards = cards;
      newCards.forEach((card) => {
        if (card.id == id) {
          card.active = true;
          card.blocked = true;
        }
      });
      setCards(newCards);
    }

    // Wybór drugiej karty
    else {
      setPick2({ id, value });
      const newCards = cards;
      newCards.forEach((card) => {
        if (card.id == id) {
          card.active = true;
          card.blocked = true;
        }
        // Po wyboże drugiej karty zablokuj pozostałe
        card.blocked = true;
      });
      setCards(newCards);
    }
  };

  // Porónanie kart
  useEffect(() => {
    if (Object.keys(pick2).length !== 0 && pick1.value && pick2.value) {
      // Jeżeli karty do siebie pasują (value)
      if (pick1.value === pick2.value) {
        const newCards = cards;
        newCards.forEach((card) => {
          if (card.active !== true) {
            card.blocked = false;
          }
        });
        setCards(newCards);
        setPairs((prev) => prev + 1);
        setPick1({});
        setPick2({});
      }

      // Jeżeli karty do siebie nie pasują (value)
      else {
        setTimeout(() => {
          const newCards = cards;
          newCards.forEach((card) => {
            if (
              card.active === true &&
              (card.id === pick1.id || card.id === pick2.id)
            ) {
              card.active = false;
              card.blocked = false;
            } else {
              card.blocked = false;
            }
          });
          setPick1({});
          setPick2({});
        }, 2000);
      }
    }
  }, [pick2.value]);

  // Reset gry
  const handleReset = () => {
    clearInterval(intervalId);

    setGameStarted(false);
    setGameFinished(false);
    setSeconds(0);
    setPick1({});
    setPick2({});
    setPairs(0);

    const newCards = [...cards];
    newCards.forEach((card) => {
      card.sort = Math.random() * 100;
      card.active = false;
      card.blocked = false;
    });

    newCards.sort((a, b) => {
      return parseFloat(a.sort) - parseFloat(b.sort);
    });

    setCards(newCards);
  };

  // Zakończenie gry i zapisanie wyniku
  useEffect(() => {
    if (pairs === 8) {
      clearInterval(intervalId);
      setGameFinished(true);

      // Zapisanie danych do bazy danych
      const data = { name: user, time: seconds };

      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
          } else {
            throw Error;
          }
        })
        .catch((err) => {
          setError('Błąd bazy danych - wynik nie został zapisany.');
        });
    }
  }, [pairs]);

  return (
    <>
      {user && (
        <>
          <div className='container game-container'>
            <div className='game-wrapper'>
              <div className='row'>
                <div className='col-12'>
                  <div className='game-data-wrapper'>
                    <div className='player'>
                      <p className='player'>Gracz</p>
                      <h4 className='player'>{user}</h4>
                    </div>
                    <div className='reset'>
                      {gameStarted && (
                        <button
                          onClick={() => handleReset()}
                          className='btn btn-primary'
                        >
                          Restart
                        </button>
                      )}
                    </div>
                    <div className='time'>
                      <p className='time'>Czas</p>
                      <h4 className='time'>{seconds}</h4>
                    </div>
                  </div>
                </div>
                <div
                  className='col-12 text-center'
                  style={{ position: 'relative' }}
                >
                  {gameStarted &&
                    !gameFinished &&
                    cards.map((card) => (
                      <Card key={card.id} card={card} pickCard={pickCard} />
                    ))}

                  {(!gameStarted || gameFinished) && (
                    <div className='info-box'>
                      {!gameStarted && !gameFinished && (
                        <div className='info-content'>
                          <h4 style={{ marginBottom: '20px' }}>
                            Jesteś gotowy?
                          </h4>
                          <button
                            onClick={() => setGameStarted(true)}
                            className='btn btn-primary'
                          >
                            Rozpocznij
                          </button>
                        </div>
                      )}
                      {gameFinished && (
                        <div className='info-content'>
                          <h5 style={{ marginBottom: '20px' }}>KONIEC GRY</h5>
                          <p className='myscore'>TWÓJ WYNIK</p>
                          <h1>{seconds}</h1>
                          <Link to='/scores' className='btn btn-primary'>
                            Zobacz wyniki
                          </Link>
                          {error && (
                            <div className='alert alert-danger mt-2'>
                              {error}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!user && null}
    </>
  );
};

export default Game;
