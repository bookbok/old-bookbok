import React, { Component } from 'react';

export class Search extends Component {
    render() {
        return (
            <div className="input-group form-inline">
                <input type="search" className="form-control" placeholder="テキスト入力欄" />
                <span className="input-group-btn">
                    <button type="button" className="btn btn-light border">
                        <i className="fas fa-search" /><span className="search-button-text"> 検索</span>
                    </button>
                </span>
            </div>
        );
    }
}
