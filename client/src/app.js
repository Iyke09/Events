import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';
import Main from './components/Main';

function mapStateToProps(state) {
  return {
    centers: state.centers.center,
    single: state.centers.singleCenter,
    success: state.Notify.success,
    loader: state.Notify.loader,
    error: state.Notify.error,
    events: state.events.event,
    review: state.reviews,
    singleEvent: state.events.singleEvent,

    //user: state.user,
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
