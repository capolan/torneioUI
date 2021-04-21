//import { bindActionCreators } from "redux";
import { useState } from "react";
import {  List } from 'reactstrap';
import { jogoClean, jogoUpdated  } from "./JogoSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Spinner } from 'react-bootstrap';

export function JogoList() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  };

  const campeao = () => {
    const times = entities.map(obj => ({...obj, ponto:0}));

    console.log("times",times);
    const placar = [...entjogos];
    placar.map(({id, time1Id, time2Id, time1Gol, time2Gol},i) => {
      if (time1Gol === null || time2Gol === null) return null;

      console.log(`${time1Id} ${time1Gol} | ${time2Id}   ${time2Gol}`)
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
      return null;
    });
    let maxPontos=0;
    let timeCampeao=null;
    console.log("times",times);
    times.forEach((item,i) => {
        if (item.ponto > maxPontos) {
          timeCampeao = item;
          maxPontos = item.ponto;
        }
    })
  
    console.log("campeao",timeCampeao);
    return times;
  };

  const handleClassificacao = () => {
    const tt =campeao();
    console.log("Classificacao", tt);
    handleShow();
  }
 /*
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
*/

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

  const MyModal = () => {
    const times = campeao().sort((a,b) => a.ponto>b.ponto? -1:1);
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Classificação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <table className="u-full-width table table-striped">
            <thead>
              <tr>
                <th>Time</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {times!==undefined && times.length &&
                times.map(({ nome, ponto }, i) => (
                  <tr key={i}>
                    <td>{nome}</td>
                    <td>{ponto} </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <List type="unstyled">
                    <li><span className="badge badge-info mt-3">Vitória: 3 pontos para vencedor</span></li>
                    <li><span className="badge badge-info mt-1">Empate: 1 ponto para cada time</span></li>
                    </List>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Jogos</h1>
      </div>
      <button className="btn btn-success mx-1" onClick={() => handleClassificacao()}>Classificação</button>
      <MyModal/>
      <div className="row">
        {loading ? (
           <Spinner animation="border" role="status">
           <span className="sr-only">Carregando...</span>
          </Spinner>
      ) : (
          <>
          <table className="u-full-width table table-striped">
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
                    <List type="unstyled">
                    <li><span className="badge badge-info mt-3">Limpar: apaga o resultado do jogo</span></li>
                    <li><span className="badge badge-info mt-1">Placar: gera o resultado da partida</span></li>
                    </List>
                    </>
          
        )}
      </div>
    </div>
  );
}