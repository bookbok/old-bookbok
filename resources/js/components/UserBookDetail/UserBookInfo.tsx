import * as React from 'react';
import { getAuthUser } from '../../utils';

interface Props {
    readingStatuses: Array<{ name: string; id: number; intl: string }>;
    handleUpdate: any;
    userId?: number | string;
    readingStatus: number | string;
    isSpoiler: boolean;
}

export class UserBookInfo extends React.Component<Props> {
    render() {
        const currentUser = getAuthUser();
        if (!currentUser || currentUser.id != this.props.userId) {
            const state = this.props.readingStatuses.filter(
                stat => stat.id == this.props.readingStatus
            )[0];
            return (
                <div className="text-muted mt-3">
                    <div>
                        本のステータスは 「<span className="text-success">{state.intl}</span>」 です
                    </div>
                    <div>
                        Boksにネタバレを{' '}
                        <b className="text-success">
                            {this.props.isSpoiler ? '含みます' : '含みません'}
                        </b>
                    </div>
                    <hr />
                </div>
            );
        }

        // 読書状況の選択リスト
        const bindedStatuses = this.props.readingStatuses.map(stat => (
            <option key={stat.id} value={stat.id}>
                {stat.intl}
            </option>
        ));

        return (
            <div className="mt-3">
                <div className="form-group">
                    <label>本のステータス</label>
                    <select
                        name="reading_status"
                        className="form-control form-control-sm"
                        value={this.props.readingStatus}
                        onChange={this.props.handleUpdate}
                    >
                        {bindedStatuses}
                    </select>
                </div>

                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input
                            id="spoiler_check"
                            type="checkbox"
                            name="is_spoiler"
                            className="form-check-input"
                            value="true"
                            onChange={this.props.handleUpdate}
                            checked={this.props.isSpoiler}
                        />
                        <small>ネタバレを含む</small>
                    </label>
                </div>
                <hr />
            </div>
        );
    }
}

export default UserBookInfo;
