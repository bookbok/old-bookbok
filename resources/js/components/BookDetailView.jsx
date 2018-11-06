import React, { Component } from "react";

export class BookDetailView extends Component {
    render() {
        const imgLink = "../../../public/hoge.png";
        const bookName = "各本のタイトルを取得して表示";
        const bookDisc = "各本の概要を取得して表示";

        return (
            <table border="1"><tbody>
                <tr>
                    <td><img src='{imgLink}' /></td>
                    <td><p>{bookName}</p></td>
                </tr>
                <tr>
                    <td colSpan="2">概要</td>
                </tr>
                <tr>
                    <td colSpan="2"><p>{bookDisc}</p></td>
                </tr>
            </tbody></table>
        );
    }
}
