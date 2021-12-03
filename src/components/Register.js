import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({
  movements,
  setMovements,
  setHistoryCount,
  finalBalance,
  setFinalBalance,
  handleTypeSearch,
  typeFilter,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('income');
  const [message, setMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description === '') {
      setModalTitle('Error');
      setMessage('El campo nombre no puede estar vacío');
      showModal();
      return;
    }
    if (amount <= 0) {
      setModalTitle('Error');
      setMessage('La cantidad debe ser numérico y mayor a cero');
      showModal();
      return;
    }
    if (type === 'expense') {
      if (parseFloat(finalBalance) - parseFloat(amount) < 0) {
        setModalTitle('Error');
        setMessage(
          'No cuenta con saldo suficiente para realizar este movimiento'
        );
        showModal();
        return;
      } else {
        setModalTitle('Información');
        setMessage('Registro Exitoso!');
        showModal();
      }
    }
    if (type === 'income') {
      setModalTitle('Información');
      setMessage('Registro Exitoso!');
      showModal();
    }

    const newMovement = {
      id: uuidv4(),
      description,
      amount,
      type,
      hidden: false,
    };

    setMovements([...movements, newMovement]);
    setAmount(0);
    setDescription('');
    setHistoryCount(movements.length + 1);

    if (type === 'income') {
      setFinalBalance(parseFloat(finalBalance) + parseFloat(amount));
    } else {
      setFinalBalance(parseFloat(finalBalance) - parseFloat(amount));
    }
  };

  const handleNameChange = ({ target }) => {
    setDescription(target.value);
  };

  const handleAmountChange = ({ target }) => {
    setAmount(target.value);
  };

  const handleTypeChange = ({ target }) => {
    setType(target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='card'>
      <div className='head'>
        <h2 className='title'>Registro</h2>
      </div>
      <div className='content'>
        <form onSubmit={handleSubmit} className='form'>
          <div className='form-group'>
            <label>Tipo de Movimiento</label>
            <select
              id='type'
              className='form-control'
              disabled
              onChange={handleTypeChange}
            >
              <option value='income'>Ingreso</option>
              <option value='expense'>Gasto</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Nombre</label>
            <input
              type='text'
              id='name'
              className='form-control'
              disabled
              value={description}
              onChange={handleNameChange}
            ></input>
          </div>
          <div className='form-group'>
            <label>Cantidad</label>
            <input
              type='number'
              id='amount'
              className='form-control'
              disabled
              value={amount}
              onChange={handleAmountChange}
            ></input>
          </div>
          <br />
          <button
            id='btnCancel'
            className='btn btn-outline-danger'
            disabled
            type='button'
            onClick={() => {
              setDescription('');
              setAmount(0);
              setType('income');
            }}
          >
            Cancelar
          </button>
          <button
            id='btnSave'
            type='submit'
            className='btn btn-outline-success'
            disabled
          >
            Agregar
          </button>
        </form>
      </div>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-outline-primary' onClick={hideModal}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
