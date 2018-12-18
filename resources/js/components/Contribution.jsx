import React from 'react';

export const Contribution = () => (

    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#BokModalCenter">
            BOKボタン
        </button>

        <div class="modal fade" id="BokModalCenter" tabindex="-1" role="dialog" aria-labelledby="BokModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">タイトル</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="閉じる">
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

