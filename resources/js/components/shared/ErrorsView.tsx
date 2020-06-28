import * as React from 'react';

interface Props {
    errors: string | Array<any>;
}

export class ErrorsView extends React.Component<Props> {
    render() {
        const errors = this.props.errors;
        if (!errors) {
            return <div />;
        }

        // 文字列、配列、オブジェクトどれでも対応する処理
        let composedErrors;
        if (typeof errors === 'string') {
            composedErrors = <li key={0}>{errors}</li>;
        } else {
            composedErrors = <div />;
        }

        return (
            <div className="errors-font">
                <ul className="text-danger">{composedErrors}</ul>
            </div>
        );
    }
}
