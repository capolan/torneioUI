import { fetchJogos, jogoDeleted } from "./JogoSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function JogoList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.jogos);
  const { times } = useSelector((state) => state.times);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(jogoDeleted({ id }));
  };

  const getTimeName = (id) => {
    const time = times.find(tt=>tt.id === id);
    return time;
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Times</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(fetchJogos())}
            className="btn-primary m-1"
          >
            Carregar
          </button>
        </div>
        <div className="two columns">
          <Link to="/add-user">
            <button className="btn-primary m-1">Novo</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Time 1</th>
                <th>Time 2</th>
                <th>Açoes</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, time1_id, time2_id }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{getTimeName(time1_id)}</td>
                    <td>{getTimeName(time2_id)}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(id)}>Remover</button>
                      <Link to={`/edit-jogo/${id}`}>
                        <button className="btn btn-primary">Editar</button>
                      </Link>
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