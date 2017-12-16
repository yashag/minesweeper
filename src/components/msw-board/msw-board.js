import React, {Component} from 'react';
import './msw-board.scss';

import Row from '../msw-row/msw-row';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            board: null
        }

        this.handleCellClick = this.handleCellClick.bind(this);
        this.handleFlagClick = this.handleFlagClick.bind(this);
        this.checkWin = this.checkWin.bind(this);
    }

    componentWillMount() {
        this.generateBoard(this.props);
    }

    generateBoard = ({rows, cols}) => {
        let board = new Array(rows); 

        // creates a board with an empty mine field
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = {
                    location: {row: i, col: j},
                    revealed: false,
                    flagged: false,
                    adjacentMines: 0
                };
            }
        }

        this.addMinesToBoard(board, rows, cols);

        this.setState({board});
    }
    
    handleCellClick = (cell, flagClick = false) => {
        const {row, col} = cell.props.cellData.location;
        const clickedCell = this.state.board[row][col];

        if(!clickedCell.containsMine && clickedCell.adjacentMines === 0) {
            this.openSurroundingCells(row, col);
            this.forceUpdate();
        } else {
            clickedCell.revealed = true;
            this.forceUpdate();

            if(clickedCell.containsMine) {
                this.props.changeGameStatus("lost");
            }
        }
    }

    handleFlagClick(cell) {
        const {row, col} = cell.props.cellData.location;
        const clickedCell = this.state.board[row][col];

        clickedCell.flagged = !clickedCell.flagged;
        this.props.flagUsage(clickedCell.flagged);
        
        if(this.props.flags === 0 && clickedCell.flagged) {
            this.props.alertMessage("can't use anymore flags");
        }
        if(this.props.flags === 1 && clickedCell.flagged) {
            this.checkWin();
        }
    }

    checkWin() {
        let result = this.state.board.some(row => {
            return row.some(cell => {
                return (cell.containsMine && !cell.flagged) ||
                        (!cell.containsMine && cell.flagged);
            })
        });

        if(!result) {
            this.props.changeGameStatus("won");
        }
    }

    addMinesToBoard(board, rows, cols) {
        let availableMines = this.props.mines;

        while(availableMines > 0) {
            const mineX = Math.floor(Math.random() * rows);
            const mineY = Math.floor(Math.random() * cols);

            if(!board[mineX][mineY].containsMine) {
                board[mineX][mineY].containsMine = true;
                this.updateNeighboursMinesCount(board, mineX, mineY);
                availableMines--;
            }
        }

    }

    updateNeighboursMinesCount(board, x, y) {
        this.adjacentCells(x, y).forEach(([xCoordinate, yCoordinate]) => {
           board[xCoordinate][yCoordinate].adjacentMines++;
        });
    }

    openSurroundingCells(x, y) {
        const currentCell = this.state.board[x][y];

        if(currentCell.adjacentMines > 0) {
            currentCell.revealed = true;
        } else if (!currentCell.containsMine) {
            currentCell.revealed = true;

            this.adjacentCells(x, y).forEach(([xCoordinate, yCoordinate]) => {
                const adjacentCell = this.state.board[xCoordinate][yCoordinate];
                if(!adjacentCell.revealed && !adjacentCell.flagged) {
                    this.openSurroundingCells(xCoordinate, yCoordinate);
                }
            }, this);
        }
    }

    adjacentCells(x, y) {
        const adjacents =[
            [x - 1, y - 1],
            [x, y - 1],
            [x - 1, y],
            [x + 1, y + 1],
            [x + 1, y],
            [x, y + 1],
            [x + 1, y - 1],
            [x - 1, y + 1]
        ];

        return adjacents.filter(this.isOnBoard, this);
    }

    isOnBoard([x, y]) {
        return x >= 0 && x < this.props.rows && y >= 0 && y < this.props.cols;
    }

    render() {
        const boardRows = this.state.board.map((row, index) => {
            return <Row key={index} cells={row} cellClick={this.handleCellClick} flagClick={this.handleFlagClick} />;
        });

        return (
            <section className = "msw-board">
                <table className = "msw-board-grid" >
                    <tbody >
                        {boardRows}
                    </tbody>
                </table>
            </section>
        );
    }

}

export default Board;