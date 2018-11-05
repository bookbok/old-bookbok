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
    const bookName = "各本のタイトルを取得して表示";
    const bookDisc = "各本の概要を取得して表示";

    const bookDetail = <table border="1"><tbody>
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
    return (
      bookDetail
    );
  }
}
