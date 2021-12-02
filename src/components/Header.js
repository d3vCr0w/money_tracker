import logo from '../logo.svg';
import { useState } from 'react';

const Header = () => {
  const [initialBalance, setInitialBalance] = useState(10000000);
  const [finalBalance, setFinalBalance] = useState(initialBalance);

  return (
    <div className='header'>
      <img src={logo} className='' alt='logo' />
      <h1>Money Tracker</h1>
      <div className='balance'>
        Saldo Final
        <br />
        <input disabled value={finalBalance} className='field'></input>
      </div>
      <div className='balance'>
        Saldo Inicial
        <br />
        <input disabled value={initialBalance} className='field'></input>
      </div>
    </div>
  );
};

export default Header;
