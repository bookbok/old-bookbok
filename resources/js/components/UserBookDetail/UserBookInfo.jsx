import React, { Component } from "react";
import { getAuthUser } from "../../utils.js";

export class UserBookInfo extends Component {
    render() {
        if(!getAuthUser()) {
            const state = this.props.readingStatuses.filter(stat => (
                stat.id == this.props.readingStatus
            ))[0];
            return (
                <div className="text-muted">
                    <label>読書状況は <u>
                        {state.intl}
                    </u> です</label>
                    <label>Boksにネタバレを <b className="text-danger">
                        {this.props.isSpoiler ? '含みます' : '含みません'}
                    </b></label>
                    <hr />
                </div>
            );
        }

        // 読書状況の選択リスト
        const bindedStatuses = this.props.readingStatuses.map((stat) => (
            <option key={stat.id}
                value={stat.id}>
                {stat.intl}
            </option>
        ));

        return (
            <div>
                <div className="form-group">
                    <label>
                        読書状況
                    </label>
                    <select name="reading_status"
                        className="form-control form-control-sm"
                        value={this.props.readingStatus}
                        onChange={this.props.handleUpdate} >
                        {bindedStatuses}
                    </select>
                </div>

                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input id="spoiler_check"
                            type="checkbox"
                            name="is_spoiler"
                            className="form-check-input"
                            value="true"
                            onChange={this.props.handleUpdate}
                            checked={this.props.isSpoiler} />
                        <small>ネタバレを含む</small>
                    </label>
                </div>
                <hr />
            </div>
        );
    }
}

export default UserBookInfo;
