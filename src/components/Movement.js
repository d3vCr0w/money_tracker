import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import NumberFormat from 'react-number-format';

const Movement = ({ description, amount, type, hidden }) => {
  const handleDelete = () => {};

  return (
    <div className={'movement ' + (hidden ? 'hidden' : '')}>
      <div className='description'>
        <button className='btn btn-outline-success'>
          <FaEdit />
        </button>
        <button className='btn btn-outline-danger'>
          <FaTrashAlt />
        </button>
        {description}
      </div>
      <div className={`amount ${type} `}>
        <NumberFormat
          value={amount}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
    </div>
  );
};

export default Movement;
