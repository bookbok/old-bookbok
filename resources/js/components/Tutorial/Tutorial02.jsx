import React from 'react';
import { Link } from 'react-router-dom';

class Tutorial02 extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>
                    BookBokではBokという、本を読んでいる間の呟きを投稿する仕組みがあります。
                    BookBokは呟き感覚で感じたこと、考えたことを記録することができます。
                    また、通常のSNSなどとは異なり、特定の本についての呟きを残すことができます。
                    これをBookBokではBok(ボック)と呼びます。このボックはひとつのページで管理されているので自分自身の感じたことや考えたことの足跡を一目で振り返ることができます。
                </p>

                <div className="text-center">
                    <Link to="/tutorial/3" className="btn btn-success">次へ進む</Link>
                </div>
            </div>
        );
    }
}

export default Tutorial02;

