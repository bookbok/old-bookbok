import React, { Component } from 'react';

export class Search extends Component {
    render() {
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-xs-4">
                        <input type="text" className="form-control" placeholder="テキスト入力欄" />
                    </div>
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-light border">
                            <i className="fas fa-search"></i> 検索
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}
