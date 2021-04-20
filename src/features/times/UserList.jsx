import { fetchUsers, userDeleted } from "./UserSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.times);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Times</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(fetchUsers())}
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
                    <Link to={`/edit-player/${id}`}>
                        <button className="btn btn-warning mx-1">Jogadores</button>
                      </Link>
                      <Link to={`/edit-user/${id}`}>
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