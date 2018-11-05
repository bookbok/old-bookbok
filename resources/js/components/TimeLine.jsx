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
	const imgLink = "../../../public/hoge.png";
	const bookDetail = <table border="1"><tbody>
			       <tr>
				   <td><img src='{imgLink}' /></td><td>本のタイトル</td>
			       </tr>
               		       <tr>
				   <td colSpan="2">本の説明</td>
			       </tr>
			   </tbody></table>
        return (
	    bookDetail
        );
    }
}
