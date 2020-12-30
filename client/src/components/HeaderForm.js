import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next';

import {
    handleSelevtedStepIsChanged
} from '../store/actions'

export class HeaderForm extends Component {

    handleSelevtedStepIsChanged(step) {
        if (this.isStepValid(step)) {
            this.props.handleSelevtedStepIsChanged(step)
        }
    }

    isStepValid(step) {
        const { isValidateStep } = this.props
        return isValidateStep[Object.keys(isValidateStep)[step - 1]]
    }

    render() {
        const { selectedStep, stepElements, t } = this.props
        
        return (
            <div className="headerForm">
                {
                    stepElements && stepElements.map(
                        (el, index) => (
                            <div key={index} className={`stepContainer ${this.isStepValid(el.step) ? '' : 'disabled'}`} onClick={() => this.handleSelevtedStepIsChanged(el.step)}>
                                <span className={`dot ${selectedStep >= el.step || this.isStepValid(el.step) ? 'active' : ''}`}>
                                    {el.step}
                                </span>
                                <span className={`title ${selectedStep >= el.step || this.isStepValid(el.step) ? 'active' : ''}`}>{t(el.title)}</span>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isValidateStep: state.customer && state.customer.isValidateStep,
    selectedStep: state.customer && state.customer.selectedStep,
    stepElements: state.customer && state.customer.stepElements
})

const mapDispatchToProps = {
    handleSelevtedStepIsChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(HeaderForm))
