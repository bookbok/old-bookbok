import React, { Component } from "react";
import PropTypes from 'prop-types';
import { getAuthUser } from "../../utils.js";

export class UserBookInfo extends Component {
    render() {
        const currentUser = getAuthUser();
        if(!currentUser || currentUser.id != this.props.userId) {
            const state = this.props.readingStatuses.filter(stat => (
                stat.id == this.props.readingStatus
            ))[0];
            return (
                <div className="text-muted mt-3">
                    <div>本のステータスは 「<span className="text-success">
                        {state.intl}
                    </span>」 です</div>
                    <div>Boksにネタバレを <b className="text-success">
                        {this.props.isSpoiler ? '含みます' : '含みません'}
                    </b></div>
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
                        本のステータス
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

UserBookInfo.propTypes = {
    readingStatuses: PropTypes.array,
    handleUpdate: PropTypes.func.isRequired,
    userId: PropTypes.string,
    readingStatus: PropTypes.string,
    isSpoiler: PropTypes.bool.isRequired,
};

export default UserBookInfo;
