import logo from '../logo.svg';
import { FaSave } from 'react-icons/fa';

const Header = ({
  initialBalance,
  finalBalance,
  setInitialBalance,
  setFinalBalance,
}) => {
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
        <input
          id='initialBalance'
          value={initialBalance}
          className='field'
          onChange={(e) => {
            setInitialBalance(e.target.value);
          }}
        ></input>
        <button
          id='saveInitialBalance'
          className='btn btn-outline-success'
          onClick={() => {
            setInitialBalance(initialBalance);
            setFinalBalance(initialBalance);
            document.getElementById('initialBalance').disabled = true;
            document.getElementById('saveInitialBalance').disabled = true;
            document.getElementById('amount').disabled = false;
            document.getElementById('type').disabled = false;
            document.getElementById('name').disabled = false;
            document.getElementById('btnSave').disabled = false;
            document.getElementById('btnCancel').disabled = false;
          }}
        >
          <FaSave />
        </button>
      </div>
    </div>
  );
};

export default Header;
