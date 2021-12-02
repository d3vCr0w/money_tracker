import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import History from './components/History';
import Register from './components/Register';

function App() {
  const [initialBalance, setInitialBalance] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [movements, setMovements] = useState([]);

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
          />
        </div>
        <div className='col'>
          <History
            historyCount={historyCount}
            movements={movements}
            setHistoryCount={setHistoryCount}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
