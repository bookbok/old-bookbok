import React from 'react';

export const Search = () => (

    <div>
        <div className="form-group">
            <div className="row">
                <div className="col-xs-4">
                    <input type="text" className="form-control" placeholder="テキスト入力欄" />
                </div>
                <span className="input-group-btn">
                    <button type="button" className="btn btn-default">検索</button>
                </span>
            </div>
        </div>
    </div>

)
