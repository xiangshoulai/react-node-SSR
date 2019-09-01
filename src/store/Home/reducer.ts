import {
    HOME_INIT_FAIL,
    HOME_INIT_START,
    HOME_INIT_SUCCESS
} from "./actionType";

const initState = {
    initStatus: 'start',
    datas: null,
    loading: false
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case HOME_INIT_START:
            return { ...state, initState: "start", ...action }
        case HOME_INIT_SUCCESS:
            return { ...state, initState: "success", ...action }
        case HOME_INIT_FAIL:
            return { ...state, initState: "fail", ...action }
        default:
            return state;
    }
}
