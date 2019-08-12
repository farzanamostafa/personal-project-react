import React from 'react';
import { connect } from 'react-redux';

import './../styles/App.css';
import GithubForm from './GithubForm';
import AuthenticatedView from './AuthenticatedView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidUser: false,
      username: "",
      updateParentState: ({isValidUser, username}) => {
        // console.log(isValidUser, username);
        this.setState({isValidUser: isValidUser, username: username});
      }
    }
  }

  render() {
    // const {isValidUser, username, updateParentState} = this.state;
    // const isValidUser = false; //this.props;
    // console.log(this.props.app);
    // console.log(this.props.app);
    const isValidUser = this.props.app.isValidUser;

    return (
        <div className="App">
          {
            (!isValidUser && <GithubForm />)
          }
          {
            (isValidUser && <AuthenticatedView />)
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({ app: state });
const mapDispatchToProps = dispatch => {
	return {
		
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
