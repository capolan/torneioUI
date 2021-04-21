import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { timeUpdated } from "./TimeSlice";

export function EditTime() {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) => 
    state.times.entities.find((user) => user.id === userId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [nome, setName] = useState(user.nome);
  const [criadoEm, setEmail] = useState(user.criadoEm);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleClick = () => {
    if (nome && criadoEm) {
      dispatch(
        timeUpdated({
          id: userId,
          nome,
          criadoEm,
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Preencha os campos");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Editar</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Nome</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="nome do país"
            id="nameInput"
            onChange={handleName}
            value={nome}
          />
          <label htmlFor="emailInput">Data</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="data"
            readOnly
            id="emailInput"
            onChange={handleEmail}
            value={criadoEm}
          />
          {error && error}
          <button onClick={handleClick} className="btn-primary">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}