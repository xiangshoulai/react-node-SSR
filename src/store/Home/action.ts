import {
    HOME_INIT_FAIL,
    HOME_INIT_SUCCESS,
    HOME_INIT_START
} from "./actionType";

//init

export const homeInitStart = () => ({
    type: HOME_INIT_START
})

export const homeSuccess = (res: any) => ({
    res,
    type: HOME_INIT_SUCCESS
})

export const homeFail = (res: any) => ({
    type: HOME_INIT_FAIL,
    res
})