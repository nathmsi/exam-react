import yelp from '../../api/yelp';

import {
    HANDLE_FIELD_VALUE_CHANGE,
    HANDLE_CHANGE_SELECTED_STEP,
    HANDLE_SUBMIT_FORM_RESPONSE,
    HANDLE_SUBMIT_FORM_LOADING
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
            console.log(objToSend)
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
                        message: 'error'
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
                    message: 'error'
                }
            })
        }
    }
}

