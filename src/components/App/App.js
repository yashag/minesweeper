import React, { Component } from 'react';
import Rodal from 'rodal';
import logo from '../../assets/images/mine.svg';
import './App.scss';
// include styles
import 'rodal/lib/rodal.css';

import Board from '../msw-board/msw-board';
import Settings from '../msw-settings/msw-settings';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gameStatus: "pending",
      message: "",
      showResult: false,
      rows: 10,
      cols: 10,
      mines: 10,
      flags: 10
    };

    this.changeGameStatus = this.changeGameStatus.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.closeResults = this.closeResults.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.flagUsage = this.flagUsage.bind(this);
  }

  changeGameStatus(newStatus) {
    this.setState({gameStatus: newStatus, message: newStatus, showResult: true});
  }

  showAlert(alertMessage) {
    this.setState({message: alertMessage, showResult: true});
  }

  closeResults() {
    this.setState({showResult: false});
  }

  createBoard({rows, cols, mines}) {
    if(typeof rows === "string") rows = parseInt(rows, 10);
    if(typeof cols === "string") cols = parseInt(cols, 10);
    if(typeof mines === "string") mines = parseInt(mines, 10);

    this.setState({
      gameStatus: "pending",
      rows,
      cols,
      mines,
      flags: mines
    }, () => {
      this.refs['gameBoard'].generateBoard({rows, cols});
    });
  }

  flagUsage(usage) {
    let change = 1;
    if(usage) change = -1;

    this.setState({
      flags: this.state.flags + change
    })
  }
  
  render() {
    return (
      <div className="msw-app">
        <Rodal
          visible={this.state.showResult}
          onClose={this.closeResults}
          className="msw-results">
          <header className="msw-results-header">Game Results</header>
          <main className="msw-results-body">You {this.state.message}!</main>
          <button className="msw-results-confirm" onClick={this.closeResults}>close</button>
        </Rodal>

        <header className="msw-header">
          <div className="msw-logo">
            <img src={logo} className="msw-logo-img" alt="logo" />
            <h1 className="msw-title">Minsweeper</h1>
          </div>

          <Settings createBoard={this.createBoard}
                    rows={this.state.rows}
                    cols={this.state.cols}
                    mines={this.state.mines}
                    flags={this.state.flags} />
        </header>

        <Board  ref={'gameBoard'}
                changeGameStatus={this.changeGameStatus}
                alertMessage={this.showAlert}
                flagUsage={this.flagUsage}
                rows={this.state.rows} 
                cols={this.state.cols}
                mines={this.state.mines}
                flags={this.state.flags} />
      </div>
    );
  }
}

export default App;
