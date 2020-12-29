import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputField from './InputField'

import {
    handleFieldValueChange
} from '../store/actions'

export class FormStep extends Component {


    handleChange(field, value) {
        this.props.handleFieldValueChange(field, value)
    }
    render() {
        const { form } = this.props

        return (
            <div className="formStep">
                <form>
                    {
                        form && form.map(
                            (el, index) => (
                                <InputField
                                    key={index}
                                    handleChange={(field, value) => this.handleChange(field, value)}
                                    isEnum={el.isEnum}
                                    isCheckbox={el.isCheckBox}
                                    value={el.value}
                                    field={el.field}
                                    data={el.data}
                                    errorMessage={el.errorMessage} />
                            )
                        )
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    form: state.customer && state.customer.form && state.customer.form.filter(el => el.step === props.step)
})

const mapDispatchToProps = {
    handleFieldValueChange
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStep)
