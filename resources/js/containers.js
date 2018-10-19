import { connect } from "react-redux";

import { TimeLine } from "./components/TimeLine";
import { getTimeLine } from "./actions";

export const ConnectedTimeLine = connect(
    state => state
)(TimeLine);
