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
            <div>
                <ul>{timeLine}</ul>
            </div>
        );
    }
}
