import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import History from './components/History';
import Register from './components/Register';

function App() {
  const [initialBalance, setInitialBalance] = useState(150000);
  const [finalBalance, setFinalBalance] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [typeFilter, setTypeFilter] = useState('all');
  const [movements, setMovements] = useState([]);

  const handleTypeSearch = (selectedType) => {
    console.log('Inside handleTypeSearch');
    let filteredMovements = null;

    console.log(document.getElementById(selectedType));

    if (selectedType === 'all') {
      filteredMovements = movements.map((movement) => ({
        ...movement,
        hidden: false,
      }));
    } else {
      filteredMovements = movements.map((movement) => {
        if (movement.type === selectedType) {
          return { ...movement, hidden: false };
        } else {
          return { ...movement, hidden: true };
        }
      });
    }
    setMovements(filteredMovements);
  };

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
            handleTypeSearch={handleTypeSearch}
            typeFilter={typeFilter}
          />
        </div>
        <div className='col'>
          <History
            historyCount={historyCount}
            setHistoryCount={setHistoryCount}
            movements={movements}
            setMovements={setMovements}
            handleTypeSearch={handleTypeSearch}
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
