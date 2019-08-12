import React from 'react';
import { connect } from 'react-redux';

class ListComponent extends React.Component {
	render() {
		const payload = this.props.payload || [];
		const listType = this.props.type || "";

		switch(listType) {
			case ("prList"): {
				return (
					<div>
						<h2 className="AuthenticatedView--ListHeading">{this.props.title}</h2>
						<ul className="AuthenticatedView--list">
							{
								(payload.length !== 0) &&
								payload.map((item, key) => <li id={`pr_${key}`}><a href="#{item.html_url}">{item.name}<br/>Status: {item.status}</a></li>)
							}
							{
								(payload.length === 0) &&
								<p>No pull requests to show.</p>
							}
						</ul>
					</div>
				);
			}
			case ("repoList"): {
				return (
					<div>
						<h2 className="AuthenticatedView--ListHeading">{this.props.title}</h2>
						<ul className="AuthenticatedView--list">
							{
								(payload.length !== 0) &&
								payload.map((item, key) => <li id={`fork_${key}`}><a href={item.link}>{item.name}</a>Forked from: {item.originalRepository}</li>)
							}
							{
								(payload.length === 0) &&
								<p>No repositories to show.</p>
							}
						</ul>
					</div>
				);
			}
			default: {
				return <div></div>;
			}
		}

		
	}
}

const mapStateToProps = state => ({ state: state });
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
