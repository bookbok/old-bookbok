import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

{/* resource independent page */}
import Home from '../Home';
import { PrivacyPolicyView } from '../PrivacyPolicyView';
import { TermsOfServiceView } from '../TermsOfServiceView';
import Tutorial from '../Tutorial';

{/* resource page */}
import { ConnectedBookDetail, ConnectedUsersView, } from '../../containers';
import ConnectedBookList from '../BookListView';

{/* require login */}
import BokFlow from '../BokFlow';
import IsbnBulkRegistrationView from '../IsbnBulkRegistrationView';

{/* auth page */}
import { UserRegister } from '../UserRegister';
import Login from '../Login';
import { Logout } from '../Logout';
import EmailVerify from '../auth/EmailVerify';

{/* user page */}
import ConnectedUserDetail from '../UserDetail';
import UserBookshelf from '../UserBookshelf';
import UserBookDetail from '../UserBookDetail';
import LikeBokList from '../LikeBokList';
import LoveBokList from '../LoveBokList';
import FollowersView from '../FollowersView';
import FollowingsView from '../FollowingsView';

{/* setting page */}
import ProfileSetting from '../settings/Profile';

//react-router-dom
class Routes extends Component {
    render() {
        return (
            <Switch>
                {/* resource independent page */}
                <Route exact path="/" component={ Home } />
                <Route exact path="/home" component={ Home } />
                <Route exact path="/privacy" component={ PrivacyPolicyView } />
                <Route exact path="/terms_of_service" component={ TermsOfServiceView } />
                <Route exact path="/tutorial/:id" component={ Tutorial } />

                {/* resource page */}
                <Route exact path="/books" component={ ConnectedBookList } />
                <Route exact path="/books/:id" component={ ConnectedBookDetail } />
                <Route exact path="/users" component={ ConnectedUsersView } />

                {/* require login */}
                <Route exact path="/bok_flow" component={ BokFlow } />
                <Route exact path="/bulk_regist" component={ IsbnBulkRegistrationView } />

                {/* auth page */}
                <Route exact path="/register" component={ UserRegister } />
                <Route exact path="/user_register" component={ UserRegister } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/logout" component={ Logout } />
                <Route exact path="/auth/email/verify" component={ EmailVerify } /> // TODO: EmailVerifyに置き換える

                {/* user page */}
                <Route exact path="/users/:id" component={ ConnectedUserDetail } />
                <Route exact path="/users/:id/user_books" component={ UserBookshelf } />
                <Route exact path="/users/:userId/user_books/:userBookId" component={ UserBookDetail } />
                <Route exact path="/users/:id/likes" component={ LikeBokList } />
                <Route exact path="/users/:id/loves" component={ LoveBokList } />
                <Route exact path="/users/:id/followers" component={ FollowersView } />
                <Route exact path="/users/:id/followings" component={ FollowingsView } />

                {/* setting page */}
                <Route exact path="/settings/profile" component={ ProfileSetting } />

                <Route exact component={ Home } /> {/* TODO: Replace to 404 page component*/}
            </Switch>
        );
    }
}

export default Routes;
