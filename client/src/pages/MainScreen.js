import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormStep from '../components/FormStep'
import HeaderForm from '../components/HeaderForm'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import SwitchLanguage from '../components/SwitchLanguage'
import { withNamespaces } from 'react-i18next';

import {
    handleSelevtedStepIsChanged,
    handleSubmitFormCustomer
} from '../store/actions'

import yelp from '../api/yelp'

export class MainScreen extends Component {

    async componentDidMount() {
        let response = await yelp.get('/customer');
        console.log(response)
    }



    handleSelevtedStepIsChanged(selectedStep) {
        if (this.isCurrentStepValid()) {
            this.props.handleSelevtedStepIsChanged(selectedStep)
        }
    }

    handlePreviousStep(selectedStep) {
        this.props.handleSelevtedStepIsChanged(selectedStep)
    }

    handleSubmitForm() {
        if (this.isAllStepValid()) {
            this.props.handleSubmitFormCustomer(this.props.form)
        }
    }

    isAllStepValid() {
        const { isValidateStep } = this.props
        const allStepIsValidate = Object.keys(isValidateStep).every(key => isValidateStep[key])
        return allStepIsValidate
    }

    isCurrentStepValid() {
        const { selectedStep, isValidateStep, t } = this.props
        return isValidateStep[Object.keys(isValidateStep)[selectedStep - 1]]
    }

    render() {
        const { selectedStep, apiResponse, t } = this.props
        const stepIsValidate = this.isCurrentStepValid()
        const allStepIsValidate = this.isAllStepValid()

        return (
            <div className="mainSceen">
                <Modal show={!apiResponse.loading && apiResponse.message} text={apiResponse.message} success={apiResponse.success} />
                {apiResponse.loading && <Loading />}
                <div className="formContainer">
                    <SwitchLanguage />
                    <span className="FormTitle">{t('Customer details')}</span>
                    <HeaderForm />
                    <FormStep step={selectedStep} />
                    <div className="formFooter">
                        {selectedStep > 1 && <button className="buttonPrevious" onClick={() => this.handlePreviousStep(selectedStep - 1)}>Previous</button>}
                        {selectedStep < this.props.stepElements.length && <button className={`${stepIsValidate ? '' : 'disabled'}`} onClick={() => this.handleSelevtedStepIsChanged(selectedStep + 1)}>Next</button>}
                        {selectedStep === this.props.stepElements.length && <button className={`${allStepIsValidate ? '' : 'disabled'}`} onClick={() => this.handleSubmitForm()}>Submit</button>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isValidateStep: state.customer && state.customer.isValidateStep,
    selectedStep: state.customer && state.customer.selectedStep,
    stepElements: state.customer && state.customer.stepElements,
    form: state.customer && state.customer.form,
    apiResponse: state.customer && state.customer.apiResponse
})

const mapDispatchToProps = {
    handleSelevtedStepIsChanged,
    handleSubmitFormCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(MainScreen))
