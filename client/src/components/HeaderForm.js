import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next';

export class HeaderForm extends Component {
    render() {
        const { selectedStep, stepElements, t } = this.props
        console.log(t("Home"))
        return (
            <div className="headerForm">
                {
                    stepElements && stepElements.map(
                        (el, index) => (
                            <div key={index} className="stepContainer">
                                <span className={`dot ${selectedStep >= el.step ? 'active' : ''}`}>
                                    {el.step}
                                </span>
                                <span className={`title ${selectedStep >= el.step ? 'active' : ''}`}>{t(el.title)}</span>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(HeaderForm))
