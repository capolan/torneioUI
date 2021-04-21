import { timeDeleted } from "./TimeSlice";
import { useDispatch, useSelector } from "react-redux";
import {  List } from 'reactstrap';

import { Link } from "react-router-dom";

export function TimeList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.times);
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
          <Link to="/add-user">
            <button className="btn btn-primary m-1">Novo Time</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <>
          <table className="u-full-width table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Criado em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, nome, criadoEm, jogadores }, i) => (
                  <tr key={i} className={ jogadores >=5 ? "bg-info":""}>
                    <td>{id}</td>
                    <td>{nome}</td>
                    <td>{criadoEm}</td>
                    <td>
                    <Link to={`/player-list/${id}`}>
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
          <br/>
          <List type="unstyled">
          <li><span className="badge badge-info mt-3">Times com mais 5 jogadores</span></li>
          <li><span className="badge badge-info mt-1">Ao remover um time, remove os jogadores e os jogos</span></li>
          </List>
          </>
        )}
      </div>
    </div>
  );
}