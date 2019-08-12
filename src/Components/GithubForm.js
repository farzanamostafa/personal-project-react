import React from 'react';
import { connect } from 'react-redux';
import { copy, apiEndPoints } from './../globalConstants';

class GithubForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      errorMessage: copy.invalidUsername
    }
    this.fetchData = this.fetchData.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) { this.setState({ username: e.target.value }); }

  handleSubmit(e) {
    e.preventDefault();
    this.props.isValidatingUser(true);

    if (this.state.username.length === 0) {
      this.props.isValidatingUser(false);
      return;
    }

    this.props.setUsername(this.state.username);

    this.fetchData();
  }

  fetchData() {
    const { username } = this.props.apple.username;
    const checkUserUrl = apiEndPoints.getUser(username);

    fetch(checkUserUrl)
      .then(response => {
        if (response.status === 200) {
        this.props.isValidatingUser(false);
          return response.json();
        }

        throw Error("User not found.");
      })
      .then(data => {
        this.props.usernameIsValid(true);
        this.props.setUsername(this.state.username);
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const isValidatingUser = this.props.apple.isValidatingUser;

    return (
        <form action="submit" onSubmit={this.handleSubmit} className="Form">
          <label className="Form--Label">Github Username</label>
          <input
            name="username"
            value={this.state.username}
            placeholder="Type something here..."
            className="Form--Input"
            onChange={this.handleChange} />
          <button className="Form--Submit">Get User</button>

          {/* {
            (this.state.isValidatingUser) &&
            (<p>{this.state.errorMessage}</p>)
          } */}
          {
            (isValidatingUser) &&
            (<p>Checking if username exists...</p>)
          }
        </form>
    );
  }
}

const mapStateToProps = state => ({ apple: state });
const mapDispatchToProps = dispatch => {
	return {
		setUsername: (username) => dispatch({type: "SET_USERNAME", payload: username}),
    usernameIsValid: (bool) => dispatch({type: "SET_USER_VALID", payload: bool}),
    isValidatingUser: (value) => dispatch({type: "SET_VALIDATING_USER", payload: value})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GithubForm);
