import React, { Component } from 'react';

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = { q: "" };
    }

    render() {
        return (
            <div className="input-group form-inline">
                <input type="search"
                    className="form-control"
                    placeholder="テキスト入力欄"
                    onChange={e => this.setState({ q: e.target.value })} />
                <span className="input-group-btn">
                    <button type="button" className="btn btn-light border" onClick={() => this.props.handleSubmit(this.state.q)}>
                        <i className="fas fa-search" /><span className="search-button-text"> 検索</span>
                    </button>
                </span>
            </div>
        );
    }
}
