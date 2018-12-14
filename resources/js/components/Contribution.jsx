import React from 'react';

export const Contribution = () => (

    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            BOKボタン
        </button>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">タイトル</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="閉じる">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                <div class="col">
                                    <input type="number" class="form-control" placeholder="開始ページ" />
                                </div>
                                <div class="col">
                                    <input type="number" class="form-control" placeholder="終了ページ" />
                                </div>
                                <div class="col">
                                    <input type="number" class="form-control" placeholder="該当行番号" />
                                </div>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="impressions-text" class="control-label">感想&nbsp;
                                        <span class="badge badge-danger">必須</span>
                                </label>
                                <textarea class="form-control" id="impressions-text" required></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                        <button type="submit" class="btn btn-primary">BOKを投稿</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

