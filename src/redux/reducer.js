const initialState = {
	isValidUser: false,
	username: "",
	isValidatingUser: false,
	forkedRepositoriesList: [],
	pullEventsList: []
};

export const reducer = (state = initialState, action) => {
	const newState = {...state};

	switch(action.type) {
		case "SET_USER_VALID": {
			newState.isValidUser = action.payload;
			return newState;
		}
        case "SET_VALIDATING_USER": {
            newState.isValidatingUser = action.payload;
			return newState;
        }
		case "SET_USERNAME": {
            newState.username = action.payload;
			return newState;
		}
		case "SET_LIST_OF_PULL_REQUESTS": {
            newState.pullEventsList = action.payload;
			return newState;
		}
		case "SET_LIST_OF_FORKED_REPOSITORIES": {
            newState.forkedRepositoriesList = action.payload;
			return newState;
        }
		default: {
			return newState;
		}
	}
}
