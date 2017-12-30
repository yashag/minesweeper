import React, { Component } from 'react';
import './msw-settings.scss';
import flagImg from '../../assets/images/flag.svg';

class Settings extends Component {

    constructor(props) {
        super(props);

        this.submitBoard = this.submitBoard.bind(this);
    }

    submitBoard(event) {
        event.preventDefault();

        const rows = event.target[0].value;
        const cols = event.target[1].value;
        const mines = event.target[2].value;
        this.props.createBoard({rows, cols, mines});
    }

    render() {
        return (
            <section className="msw-settings">
                <form className="msw-settings-form" onSubmit={this.submitBoard}>
                    <div className="msw-settings-input-container">
                        <label htmlFor="rows" className="msw-settings-label">rows</label>
                        <input type="number" name="rows" className="msw-settings-input" placeholder="rows"
                        min="1" max="30" defaultValue={this.props.rows} />
                    </div>
                    
                    <div className="msw-settings-input-container">
                        <label htmlFor="cols" className="msw-settings-label">cols</label>
                        <input type="number" name="cols" className="msw-settings-input" placeholder="columns"
                        min="1" max="30" defaultValue={this.props.cols} />
                    </div>
                    
                    <div className="msw-settings-input-container">
                        <label htmlFor="mines" className="msw-settings-label">mines</label>
                        <input type="number" name="mines" className="msw-settings-input" placeholder="mines"
                        min="1" max="899" defaultValue={this.props.mines} />
                    </div>

                    <input type="submit" className="msw-settings-generate" value="Generate board!" />
                </form>

                <div className="msw-settings-stats">
                    <div className="msw-settings-stats-flags">
                    <img src={flagImg} alt="Flag" />
                    <span> Number of flags: {this.props.flags} </span>
                    </div>
                </div>
            </section>
        );
    }

}

export default Settings;