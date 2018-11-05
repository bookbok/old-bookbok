import React, { Component } from "react";

export class TimeLine extends Component {
    render() {
        if(this.props.timeLine == []){
            return;
        }
        const timeLine = this.props.timeLine.map((v, i) => (
            <li key={i}>
                {v.name}
            </li>
        ));
        return (
            <table>
		<tr>
		  <td>画像</td>
		  <td>本のタイトル</td>
		</tr>
		<tr>
		  <td colspan="2">本の説明</td>
		</tr>
            </table>
        );
    }
}
