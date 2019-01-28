import React, { Component } from 'react';
import { fetchBookList } from "../../actions";
import { store } from "../../store";


class IsbnBulkRegistrationView extends Component {
    constructor(props) {
        super(props);

        this.state = {  };
    }

    render() {
        return(
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 main-content p-5">
                    </div>
                </div>
            </div>
        );
    }
}

export default IsbnBulkRegistrationView;
