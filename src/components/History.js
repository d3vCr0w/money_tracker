import Movement from './Movement';

const History = ({ historyCount, movements }) => {
  return (
    <div className='card'>
      <div className='head'>
        <h2 className='title'>Historial de Movimientos</h2>
        <strong className='btn btn-primary historyCount'>{historyCount}</strong>
      </div>

      <div className='content'>
        {movements.map((movement) => (
          <Movement
            key={movement.id}
            description={movement.description}
            amount={movement.amount}
            type={movement.type}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
