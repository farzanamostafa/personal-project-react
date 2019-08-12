import React from 'react';
import ListComponent from './ListComponent';
import './../styles/AuthenticatedView.css';
import { apiEndPoints } from './../globalConstants';
import { connect } from 'react-redux';

class AuthenticatedView extends React.Component {
  constructor(props) {
    super(props);
    this.fetchPullData = this.fetchPullData.bind(this);
    this.fetchForkData = this.fetchForkData.bind(this);
  }

  fetchForkData() {
    const {username} = this.props.apple;

    fetch(apiEndPoints.getRepos(username))
    .then(response => response.json())
    .then(data => {
      const res = data.filter(repo => repo.fork).map(item => ({name: item.full_name, link: item.html_url, originalRepository: item.forks_url}));
      this.props.setForkedReposList(res);
      console.log(this.props.apple);
    })
    .catch(err => err);
  }

  fetchPullData() {
    const {username} = this.props.apple;

    fetch(apiEndPoints.getEvents(username))
    .then(response => response.json())
    .then(data => {
      const res = data
              .filter(event => event.type === "PullRequestEvent")
              .map(item => ({name: item.repo.name, status: item.payload.action}));
      this.props.setPullRequestsList(res);
    })
    .catch(err => err);
  }

  componentDidMount() {
    this.fetchPullData();
    this.fetchForkData();
  }

  render() {
    return (
      <div className="AuthenticatedView">
        <h1 className="AuthenticatedView--heading">{this.props.apple.username}</h1>
        
        <ListComponent title="Recent Forks" type="repoList" payload={this.props.apple.forkedRepositoriesList} />
        <ListComponent title="Recent Pull Requests" type="prList" payload={this.props.apple.pullEventsList} />

      </div>
      );
  }
}

const mapStateToProps = state => ({ apple: state });
const mapDispatchToProps = dispatch => {
	return {
    setPullRequestsList: (listOfRequests) => dispatch({type: 'SET_LIST_OF_PULL_REQUESTS', payload: listOfRequests}),
    setForkedReposList: (listOfRepos) => dispatch({type: 'SET_LIST_OF_FORKED_REPOSITORIES', payload: listOfRepos})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedView);
