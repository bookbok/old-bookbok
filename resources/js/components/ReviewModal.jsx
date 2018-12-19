import React, { Component } from "react";
import ReactDOM from 'react-dom';

export class ReviewModal extends Component {
/*    constructor(props) {
        super(props);

        this.state = { title: "", body: "" };

        this.handleChange = this.handleChange.bind(this);
    }
  */  
 
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ReviewModalCenter">
                    レビューを投稿する
                </button>

                <div className="modal fade" id="ReviewModalCenter" tabIndex="-1" role="dialog" aria-labelledby="ReviewModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="閉じる">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col">レビューのタイトルを記入してください
                                            <input type="text" className="form-control" placeholder="この本をズバリ一言で！" />
                                        </div>
                                    </div>
                                    <div className="form-group" className="mt-5">
                                        <label htmlFor="impressions-text" className="control-label">ここにレビューを記入してください&nbsp;
                                                <span className="badge badge-danger">必須</span>
                                        </label>
                                        <textarea className="form-control" id="impressions-text" required placeholder="1冊を読み終えてどうだったか。これから読む人に伝えたいこと。"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                                <button type="submit" className="btn btn-primary">レビューを投稿</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
