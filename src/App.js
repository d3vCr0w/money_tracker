import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import History from './components/History';
import Register from './components/Register';

function App() {
  const [initialBalance, setInitialBalance] = useState(150000);
  const [finalBalance, setFinalBalance] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [typeFilter, setTypeFilter] = useState('all');
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    setMovements((movements) => [...movements].map((movement) => ({
      ...movement,
      hidden: typeFilter === 'all' ? false : movement.type !== typeFilter
    })))
    // console.log(movements);
  }, [typeFilter]);

  return (
    <div className='app'>
      <div>
        <Header
          initialBalance={initialBalance}
          finalBalance={finalBalance}
          setInitialBalance={setInitialBalance}
          setFinalBalance={setFinalBalance}
        />
      </div>
      <div className='content-wrapper'>
        <div className='col'>
          <Register
            movements={movements}
            setMovements={setMovements}
            setHistoryCount={setHistoryCount}
            finalBalance={finalBalance}
            setFinalBalance={setFinalBalance}
            typeFilter={typeFilter}
          />
        </div>
        <div className='col'>
          <History
            historyCount={historyCount}
            setHistoryCount={setHistoryCount}
            movements={movements}
            setMovements={setMovements}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            finalBalance={finalBalance}
            setFinalBalance={setFinalBalance}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
