import Movement from './Movement';

const History = ({
  historyCount,
  setHistoryCount,
  movements,
  setMovements,
  finalBalance,
  setFinalBalance,
  setTypeFilter
}) => {
  const handleSearch = ({ target }) => {
    const searchTerm = target.value;
    let filteredMovements = null;
    if (searchTerm === '') {
      filteredMovements = movements.map((movement) => ({
        ...movement,
        hidden: false,
      }));
    } else {
      filteredMovements = movements.map((movement) => {
        if (
          movement.description
            .toLowerCase()
            .includes(target.value.toLowerCase())
        ) {
          return { ...movement, hidden: false };
        } else {
          return { ...movement, hidden: true };
        }
      });
    }
    setMovements(filteredMovements);
  };

  return (
    <div className='card'>
      <div className='head'>
        <h2 className='title'>Historial de Movimientos</h2>
        <strong className='btn btn-primary historyCount'>{historyCount}</strong>
      </div>

      <div className='content'>
        <div className='row'>
          <div className='col-lg-5 col-md-5 col-sm-5'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 search-row'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Buscar'
                  onChange={handleSearch}
                ></input>
              </div>
            </div>
          </div>
          <div className='col-lg-7 col-md-7 col-sm-7'>
            <div className='row'>
              <div className='col-lg-4 col-md-4 col-sm-4'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='typeFilter'
                    id='all'
                    defaultChecked
                    onChange={() => {
                      document.getElementById('all').checked = true;
                      setTypeFilter('all');
                    }}
                  ></input>
                  <label className='form-check-label'>Todos</label>
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-4'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='typeFilter'
                    id='income'
                    onChange={() => {
                      document.getElementById('income').checked = true;
                      setTypeFilter('income');
                    }}
                  ></input>
                  <label className='form-check-label'>Ingreso</label>
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-4'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='typeFilter'
                    id='expense'
                    onChange={() => {
                      document.getElementById('expense').checked = true;
                      setTypeFilter('expense');
                    }}
                  ></input>
                  <label className='form-check-label'>Gasto</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {movements.map((movement) => (
          <Movement
            key={movement.id}
            movement={movement}
            movements={movements}
            setMovements={setMovements}
            finalBalance={finalBalance}
            setFinalBalance={setFinalBalance}
            historyCount={historyCount}
            setHistoryCount={setHistoryCount}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
