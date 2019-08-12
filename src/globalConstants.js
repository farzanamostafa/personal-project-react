export const copy = {
	"confirmUser": "Checking if user exists",
	"invalidUsername": "This is not a valid username."
}

export const apiEndPoints = {
	getUser: username => `https://api.github.com/users/${username}`,
	getRepos: username => `https://api.github.com/users/${username}/repos`,
	getEvents: username => `https://api.github.com/users/${username}/events`
}
