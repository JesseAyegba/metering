let initialState = {
    name: "Jesse",
    token: "fkjasldk;fjkasd;ljf;kljasd;klfjasdfs",
}

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return({
                ...initialState,
                name: action.payload.name,
                token: action.payload.token,
            })
        case "LOGIN_FAIL":
            return({
                ...initialState,
            })
        default:
            return state;
    }
}