import yelp from '../../api/yelp';

import {
    HANDLE_FIELD_VALUE_CHANGE,
    HANDLE_CHANGE_SELECTED_STEP,
    HANDLE_SUBMIT_FORM_RESPONSE,
    HANDLE_SUBMIT_FORM_LOADING,

    COUNTRY_GET_API_LOADING,
    COUNTRY_GET_API_RESPONSE
} from './types'




export const handleFieldValueChange = (field, value) => {
    return async (dispatch) => {
        dispatch({
            type: HANDLE_FIELD_VALUE_CHANGE,
            payload: {
                field,
                value
            }
        });
    }
}

export const handleSelevtedStepIsChanged = (selectedStep) => {
    return async (dispatch) => {
        dispatch({
            type: HANDLE_CHANGE_SELECTED_STEP,
            payload: {
                selectedStep
            }
        });
    }
}

export const handleSubmitFormCustomer = (form) => {
    return async (dispatch) => {
        try {
            console.log(form)
            dispatch({
                type: HANDLE_SUBMIT_FORM_LOADING,
            });
            const objToSend = {}
            form.forEach(element => {
                objToSend[element.field] = element.value
            });
            const response = await yelp.post('/customer/', {
                ...objToSend
            });
            console.log(response.data);
            if(response && response.data && response.data.success) {
                dispatch({
                    type: HANDLE_SUBMIT_FORM_RESPONSE,
                    payload: {
                        loading: false,
                        success: true,
                        message: 'the form has been sent successfully'
                    }
                })
            } else {
                dispatch({
                    type: HANDLE_SUBMIT_FORM_RESPONSE,
                    payload: {
                        loading: false,
                        success: false,
                        message: 'error: failed to post customer details form'
                    }
                })
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: HANDLE_SUBMIT_FORM_RESPONSE,
                payload: {
                    loading: false,
                    success: false,
                    message: 'error: failed to post the form'
                }
            })
        }
    }
}

export const handleGetCountryFromAPI = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: COUNTRY_GET_API_LOADING,
            });
            const response = await yelp.get('/country/');
            console.log(response.data);
            if(response && response.data && response.data.success) {
                dispatch({
                    type: COUNTRY_GET_API_RESPONSE,
                    payload: {
                        loading: false,
                        success: true,
                        country: response.data.country
                    }
                })
            } else {
                dispatch({
                    type: COUNTRY_GET_API_RESPONSE,
                    payload: {
                        loading: false,
                        success: false,
                        message: 'error: failed to get country details form'
                    }
                })
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: COUNTRY_GET_API_RESPONSE,
                payload: {
                    loading: false,
                    success: false,
                    message: 'error: failed to post the form'
                }
            })
        }
    }
}

