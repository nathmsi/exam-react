import {
    HANDLE_FIELD_VALUE_CHANGE,
    HANDLE_SUBMIT_FORM_RESPONSE,
    HANDLE_SUBMIT_FORM_LOADING,
    HANDLE_CHANGE_SELECTED_STEP
} from '../actions/types'


const INITIAL_STATE = {
    form: [
        { field: 'firstName', value: '', required: true, step: 3, errorMessage: '' },
        { field: 'lastName', value: '', required: true, step: 3, errorMessage: '' },
        { field: 'password', value: '', required: true, step: 3, errorMessage: '' },
        { field: 'country', value: '', required: true, step: 2, errorMessage: '' },
        { field: 'city', value: '', required: true, step: 2, errorMessage: '' },
        { field: 'street', value: '', required: true, step: 2, errorMessage: '' },
        { field: 'email', value: '', required: true, step: 1, errorMessage: '' },
        { field: 'phone', value: '', required: true, step: 1, errorMessage: '' },
        { field: 'gender', value: 'M', required: true, step: 1, errorMessage: '', isEnum: true, data: ['M', 'F'] },
        { field: 'married', value: '', required: true, step: 1, errorMessage: '', isCheckBox: true },
    ],
    isValidateStep: {
        step1: false,
        step2: false,
        step3: false,
    },
    stepElements: [
        { step: 1, title: 'personale' },
        { step: 2, title: 'address' },
        { step: 3, title: 'details' }
    ],
    apiResponse: {
        response: '',
        success: false,
        loading: false,
        message: ''
    },
    selectedStep: 1
};



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_FIELD_VALUE_CHANGE: {
            const newForm = state.form
            newForm.forEach(
                el => {
                    if (el.field === action.payload.field) {
                        el.value = action.payload.value
                        if (el.value === '') {
                            el.errorMessage = `${el.field} is required`
                        } else {
                            el.errorMessage = ''
                        }
                        if (el.field === 'email' && !validateEmail(el.value)) {
                            el.errorMessage = 'you need to enter a valid email'
                        }
                        if (el.field === 'phone' && !validatePhone(el.value)) {
                            el.errorMessage = 'you need to enter a valid phone'
                        }
                    }
                }
            )
            const isValidate = checkIfFormIsValidate(newForm)
            return {
                ...state, fields: [...newForm], isValidateStep: Object.assign({}, isValidate)
            }
        }
        case HANDLE_CHANGE_SELECTED_STEP:
            return {
                ...state, selectedStep: action.payload.selectedStep
            }
        case HANDLE_SUBMIT_FORM_LOADING: {
            const apiResponse = state.apiResponse
            apiResponse.loading = true
            return {
                ...state, apiResponse: Object.assign({}, apiResponse)
            }
        }
        case HANDLE_SUBMIT_FORM_RESPONSE: {
            const apiResponse = action.payload
            const formReset = resetForm([...state.form])
            return {
                ...state,  form: [...formReset], selectedStep: 1,  apiResponse, isValidateStep: {
                    step1: false,
                    step2: false,
                    step3: false,
                }
            }
        }
        default:
            return state;
    }
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function validatePhone(phone) {
    var re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    return re.test(phone);
}

function checkIfFormIsValidate(fields) {
    const step1 = fields.filter(el => el.step === 1).every(val => val.value !== '')
    const step2 = fields.filter(el => el.step === 2).every(val => val.value !== '')
    const step3 = fields.filter(el => el.step === 3).every(val => val.value !== '')
    return {
        step1,
        step2,
        step3
    }
}

function resetForm(form) {
    form && form.forEach(
        el => {
            el.value = ''
        }
    )
    return form
}


