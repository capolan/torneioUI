import { bindActionCreators } from "redux";
import { fetchJogos, jogoDeleted, jogoClean, jogoUpdated, jogoAdded } from "./JogoSlice";
import { useDispatch, useSelector } from "react-redux";

export function JogoList() {
  const dispatch = useDispatch();

  const { entjogos } = useSelector((state) => state.jogos);
  const loading = useSelector((state) => state.loading1);
  const { entities } = useSelector((state) => state.times);

  const handleDelete = (id) => {
    dispatch(jogoDeleted({ id }));
  };

  const handleClean = (id) => {
    dispatch(jogoClean({ id }));
  };

  const handlePlacar = (id) => {
    const time1Gol = Math.floor(Math.random() * 10);
    const time2Gol = Math.floor(Math.random() * 10);
    dispatch(
      jogoUpdated({
        id: id,
        time1Gol: time1Gol,
        time2Gol: time2Gol,
      })
    );

  };

  const dispatchChaining = () => async (dispatch) => {
    await Promise.all(
      [dispatch(jogoAdded())]
      );
    console.log("jogos criados");
    return dispatch(fetchJogos());
  };
  
  
  const handleGerar = () => {
    const actions = bindActionCreators({ dispatchChaining }, dispatch);
    actions.dispatchChaining().then(() => console.log("jogos atualizados")); // <-- thenable
  };


  const getTime = (id) => {
    const time = entities.find(tt=>tt.id === id);
    if (time !== undefined) {
      return time.nome;
    } else {
      return '------';
    }
  };

  const getPlacar = (id) => {
    const time = entjogos.find(tt=>tt.id === id);
    let placar="";
    if (time.time1Gol != null && time.time2Gol != null) {
      placar = time.time1Gol + " x " + time.time2Gol;
    }
    return placar;
  };

  console.log("entjogos",entjogos);
  console.log("loading",loading);
  return (
    <div className="container">
      <div className="row">
        <h1>Jogos</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => handleGerar()}
            className="btn-primary m-1"
          >
            Gerar Jogos
          </button>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
              <th>Id</th>
                <th>Time 1</th>
                <th>Placar</th>
                <th>Time 2</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entjogos.length &&
                entjogos.map(({ id, time1Id, time2Id }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{ getTime(time1Id) } </td>
                    <td>{ getPlacar(id) }</td>
                    <td>{ getTime(time2Id)}</td>
                    <td>
                      <button className="btn btn-warning mx-1" onClick={() => handleClean(id)}>Limpar</button>
                      <button className="btn btn-primary mx-1" onClick={() => handlePlacar(id)}>Placar</button>
                    </td>
                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(id)}>Remover</button>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}