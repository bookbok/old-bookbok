import React from 'react';

export const Review = () => (

    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ReviewModalCenter">
            レビューを投稿する
        </button>

        <div class="modal fade" id="ReviewModalCenter" tabindex="-1" role="dialog" aria-labelledby="ReviewModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="閉じる">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                <div class="col">レビューのタイトルを記入してください
                                    <input type="text" class="form-control" placeholder="この本をズバリ一言で！" />
                                </div>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="impressions-text" class="control-label">ここにレビューを記入してください&nbsp;
                                        <span class="badge badge-danger">必須</span>
                                </label>
                                <textarea class="form-control" id="impressions-text" required placeholder="1冊を読み終えてどうだったか。これから読む人に伝えたいこと。"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                        <button type="submit" class="btn btn-primary">レビューを投稿</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

)
