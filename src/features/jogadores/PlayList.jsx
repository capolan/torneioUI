import { useLocation } from "react-router-dom";
import { playerDeleted } from "./PlaySlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function PlayerList() {
  const { pathname } = useLocation();
  const timeId = parseInt(pathname.replace("/player-list/", ""));

  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.players);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(playerDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Jogadores</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <Link to={`/add-player/${timeId}`}>
            <button className="btn btn-primary m-1">Novo Jogador</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entities!== undefined && entities.length &&
                entities.filter(s=>s.timesId === timeId).map(({ id, nome }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{nome}</td>
                    <td>
                      <Link to={`/edit-player/${id}`}>
                        <button className="btn btn-primary mx-1">Editar</button>
                      </Link>
                      <button className="btn btn-danger mx-1" onClick={() => handleDelete(id)}>Remover</button>
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