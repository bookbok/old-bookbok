import React, { Component } from "react";
import { fetchBookDetail } from "../actions.js";
import { store } from "../index";

export class UsersBookshelf extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        //const bookId = parseInt(this.props.match.params.id);
        //store.dispatch(fetchBookDetail(bookId));
    };

    render() {
        //const book = this.props.bookDetail;

        return (
            <table border="1"><tbody>
                <tr>
                    <td><img src="hoge.png" /></td>
                    <td><p>ユーザーの本棚画面</p></td>
                </tr>
            </tbody></table>
        );
    }
}
