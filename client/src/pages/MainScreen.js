import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormStep from '../components/FormStep'
import HeaderForm from '../components/HeaderForm'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import SwitchLanguage from '../components/SwitchLanguage'
import { withNamespaces } from 'react-i18next';
import FooterForm from '../components/FooterForm'
import {
    handleSelevtedStepIsChanged,
    handleSubmitFormCustomer,
    handleGetCountryFromAPI
} from '../store/actions'


export class MainScreen extends Component {

    componentDidMount() {
        this.props.handleGetCountryFromAPI && this.props.handleGetCountryFromAPI()
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
                    <FooterForm
                        selectedStep={selectedStep}
                        stepElements={this.props.stepElements}
                        handlePreviousStep={(selectedStep) => this.handlePreviousStep(selectedStep)}
                        handleSubmitForm={() => this.handleSubmitForm()}
                        handleSelevtedStepIsChanged={(selectedStep) => this.handleSelevtedStepIsChanged(selectedStep)}
                        allStepIsValidate={allStepIsValidate}
                        stepIsValidate={stepIsValidate}
                    />
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
    handleSubmitFormCustomer,
    handleGetCountryFromAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(MainScreen))
