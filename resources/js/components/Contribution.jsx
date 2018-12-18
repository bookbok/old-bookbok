import React from 'react';

export const Contribution = () => (

    <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            BOKボタン
        </button>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">タイトル</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="閉じる">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input type="number" className="form-control" placeholder="開始ページ" />
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" placeholder="終了ページ" />
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" placeholder="該当行番号" />
                                </div>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="impressions-text" className="control-label">感想&nbsp;
                                        <span className="badge badge-danger">必須</span>
                                </label>
                                <textarea className="form-control" id="impressions-text" required></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                        <button type="submit" className="btn btn-primary">BOKを投稿</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

