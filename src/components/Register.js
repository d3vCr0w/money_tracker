import { useState } from 'react';
import { uuid } from 'uuidv4';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({
  movements,
  setMovements,
  setHistoryCount,
  finalBalance,
  setFinalBalance,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (description === '') {
      setModalTitle('Error');
      setError('El campo nombre no puede estar vacío');
      showModal();
      return;
    }
    if (amount <= 0) {
      setModalTitle('Error');
      setError('La cantidad debe ser numérico y mayor a cero');
      showModal();
      return;
    }
    if (type === 'expense') {
      if (parseFloat(finalBalance) - parseFloat(amount) < 0) {
        setModalTitle('Error');
        setError(
          'No cuenta con saldo suficiente para realizar este movimiento'
        );
        showModal();
        return;
      } else {
        setModalTitle('Información');
        setError('Registro Exitoso!');
        showModal();
      }
    }
    if (type === 'income') {
      setModalTitle('Información');
      setError('Registro Exitoso!');
      showModal();
    }

    const newMovement = { id: uuid(), description, amount, type };
    setMovements([...movements, newMovement]);
    setAmount(0);
    setDescription('');
    setHistoryCount(movements.length + 1);
    if (type == 'income') {
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

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('income');
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');

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
            onClick={() => {
              setAmount(0);
              setDescription('');
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
        <Modal.Body>{error}</Modal.Body>
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
