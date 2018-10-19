import { connect } from "react-redux";

import { TimeLine } from "./components/TimeLine";

export const ConnectedTimeLine = connect(
    state => state
)(TimeLine);
