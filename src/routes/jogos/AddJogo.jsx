import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { jogoAdded } from "./JogoSlice";

export function AddJogo() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [time1_id, setTime1_id] = useState("");
  const [time2_id, setTime2_id] = useState("");
  const [error, setError] = useState(null);

  const handleT1 = (e) => setTime1_id(e.target.value);
  const handleT2 = (e) => setTime2_id(e.target.value);

  const handleClick = () => {
    if (time1_id) {
      dispatch(
        jogoAdded({
          time1_id,
          time2_id,
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Preencha todos os campos");
    }

    setTime1_id("");
    setTime2_id("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add Jogo</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Time1</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="time1"
            id="nameInput"
            onChange={handleT1}
            value={time1_id}
          />
          <label htmlFor="nameInput">Time2</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="time2"
            id="nameInput"
            onChange={handleT2}
            value={time2_id}
          />
          {error && error}
          <button onClick={handleClick} className="btn-primary">
            Incluir
          </button>
        </div>
      </div>
    </div>
  );
}