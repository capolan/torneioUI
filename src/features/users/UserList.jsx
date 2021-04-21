import { fetchTimes, timeDeleted } from "./TimeSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function TimeList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(timeDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Times</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(fetchTimes())}
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
                <th>Nome</th>
                <th>Criado em</th>
                <th>Açoes</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, nome, criadoEm }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{nome}</td>
                    <td>{criadoEm}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(id)}>Remover</button>
                      <Link to={`/edit-user/${id}`}>
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