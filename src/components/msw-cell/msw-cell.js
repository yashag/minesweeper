import React, { Component } from 'react';
import './msw-cell.scss';

class Cell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flagged: false,
            revealed: false
        };

        this._handleClick = this._handleClick.bind(this);
        this._handleRightClick = this._handleRightClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        const {revealed, flagged} = newProps.cellData;
        const changes = {};

        if(newProps.cellData.hasOwnProperty("revealed")) changes.revealed = revealed;
        if(newProps.cellData.hasOwnProperty("flagged")) changes.flagged = flagged;

        this.setState(changes);
    }
    
    _handleClick(event) {
        event.preventDefault();

        if(!this.state.flagged) {
            this.props.cellClick(this);
        }
    }

    _handleRightClick(event) {
        event.preventDefault();

        if(!this.state.revealed) {
            this.setState({flagged: !this.state.flagged}, () => {
                this.props.flagClick(this);
            });
        }
    }

    render() {
        let baseClass = 'msw-board-cell', classes = `${baseClass}` , value = '';

        if(this.state.revealed) {
            if(this.props.cellData.containsMine) {
                classes = `${baseClass} msw-mine`;
            } else {
                classes = `${baseClass} msw-revealed`;
                value = this.props.cellData.adjacentMines || '';
            }
        } else if(this.state.flagged) {
            classes = `${baseClass} msw-flagged`;
        }

        return (
            <td className={classes} onClick={this._handleClick} onContextMenu={this._handleRightClick}>
                {value}
            </td>
        );
    }

}

export default Cell;