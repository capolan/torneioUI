import { bindActionCreators } from "redux";
import { fetchJogos, jogoClean, jogoUpdated, jogoAdded } from "./JogoSlice";
import { useDispatch, useSelector } from "react-redux";

export function JogoList() {
  const dispatch = useDispatch();

  const { entjogos } = useSelector((state) => state.jogos);
  const loading = useSelector((state) => state.loading1);
  const { entities } = useSelector((state) => state.times);

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
campeao();
  };

  const campeao = () => {
    const times = entities.map(obj => ({...obj, ponto:0}));

    console.log("times",times);
    const placar = entjogos.filter(s=>s.time1Gol !== undefined);
    placar.map(({id, time1Id, time2Id, time1Gol, time2Gol},i) => {
      if (time1Gol === time2Gol) {
        let t1 = times.find(s=>s.id === time1Id);
        t1.ponto= t1.ponto+1;
        let t2 = times.find(s=>s.id === time2Id);
        t2.ponto= t2.ponto+1;
      }
      if (time1Gol > time2Gol) {
        let t1 = times.find(s=>s.id === time1Id);
        t1.ponto= t1.ponto+3;
      }
      if (time1Gol < time2Gol) {
        let t1 = times.find(s=>s.id === time2Id);
        t1.ponto= t1.ponto+3;
      }
    });
    console.log("campeao",times);
  };

  const dispatchChaining = () => async (dispatch) => {
    await Promise.all(
      [dispatch(jogoAdded())]
      );
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
              {entjogos!==undefined && entjogos.length &&
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
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}