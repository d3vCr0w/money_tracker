import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import NumberFormat from 'react-number-format';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const Movement = ({
  movement,
  movements,
  setMovements,
  finalBalance,
  setFinalBalance,
  setHistoryCount,
  historyCount,
}) => {
  const [newDescription, setNewDescription] = useState(movement.description);
  const [newAmount, setNewAmount] = useState(movement.amount);
  const [newType, setNewType] = useState(movement.type);
  const [message, setMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (newDescription === '') {
      setMessage('El campo nombre no puede estar vacío');
      showModal();
      return;
    }
    if (newAmount <= 0) {
      setMessage('La cantidad debe ser numérico y mayor a cero');
      showModal();
      return;
    }
    if (newType === 'expense') {
      if (parseFloat(finalBalance) - parseFloat(newAmount) < 0) {
        setMessage(
          'No cuenta con saldo suficiente para realizar este movimiento'
        );
        return;
      }
    }
    if (movement.type === 'expense') {
      setFinalBalance(parseFloat(finalBalance) + parseFloat(movement.amount));
    } else {
      setFinalBalance(parseFloat(finalBalance) - parseFloat(movement.amount));
    }

    movements.map((item) => {
      if (item.id === movement.id) {
        item.description = newDescription;
        item.amount = newAmount;
        item.type = newType;
        item.hidden = false;
        return item;
      }
      return item;
    });

    setMovements(movements);

    if (newType === 'income') {
      setFinalBalance(parseFloat(finalBalance) + parseFloat(newAmount));
    } else {
      setFinalBalance(parseFloat(finalBalance) - parseFloat(newAmount));
    }

    hideModal();
  };

  const handleDelete = (id) => {
    const { type, amount } = movements.find((item) => item.id === id);
    if (type === 'expense') {
      setFinalBalance(parseFloat(finalBalance) + parseFloat(amount));
    } else {
      setFinalBalance(parseFloat(finalBalance) - parseFloat(amount));
    }
    movements = movements.filter((item) => item.id !== id);

    setHistoryCount(historyCount - 1);

    setMovements(movements);
  };

  const handleNameChange = ({ target }) => {
    setNewDescription(target.value);
  };

  const handleAmountChange = ({ target }) => {
    setNewAmount(target.value);
  };

  const handleTypeChange = ({ target }) => {
    setNewType(target.value);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={'movement ' + (movement.hidden ? 'hidden' : '')}>
      <div className='description'>
        <button
          className='btn btn-outline-success'
          onClick={() => {
            setModalTitle('Editar Movimiento');
            showModal();
          }}
        >
          <FaEdit />
        </button>
        <button
          className='btn btn-outline-danger'
          onClick={() => {
            handleDelete(movement.id);
          }}
        >
          <FaTrashAlt />
        </button>
        {movement.description}
      </div>
      <div className={`amount ${movement.type} `}>
        <NumberFormat
          value={movement.amount}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={'alert alert-danger ' + (message === '' ? 'hidden' : '')}
            role='alert'
          >
            {message}
          </div>
          <form className='form'>
            <div className='form-group'>
              <label>Tipo de Movimiento</label>
              <select
                id='type'
                className='form-control'
                onChange={handleTypeChange}
                defaultValue={newType}
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
                value={newDescription}
                onChange={handleNameChange}
              ></input>
            </div>
            <div className='form-group'>
              <label>Cantidad</label>
              <input
                type='number'
                id='amount'
                className='form-control'
                value={newAmount}
                onChange={handleAmountChange}
              ></input>
            </div>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            id='btnSave'
            type='submit'
            className='btn btn-outline-success'
            onClick={() => {
              console.log('inside click');
              handleSubmit();
            }}
          >
            Guardar
          </button>
          <button
            id='btnCancel'
            className='btn btn-outline-danger'
            type='button'
            onClick={hideModal}
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Movement;
