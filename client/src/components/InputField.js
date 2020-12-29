import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next';



const InputField = (props) => {
    const [value, setValue] = useState(props.value)
    const {
        field,
        errorMessage,
        handleChange,
        isCheckbox,
        isEnum,
        data,
        t
    } = props
    const handleChangeInput = (value) => {
        setValue(value)
        handleChange(field, value)
    }
    useEffect(() => {
        setValue(props.value)
    }, [props.field])
    return (
        <div className="inputField">
            {
                !isEnum && !isCheckbox ?
                    <div>
                        <input className="form__field" type="input" id={field} value={value} onChange={(e) => handleChangeInput(e.target.value)} placeholder={field} />
                        <label className="form__label">{t(field)}</label>
                    </div>
                    : null}
            { isCheckbox ?
                <div className="customCheckBox" >
                    <label className="container">
                        <input type="checkbox" defaultChecked={value} onChange={(e) => handleChangeInput(!value)} />
                        <span className="checkmark">{t(field)}</span>
                    </label>
                </div>
                : null}
            { isEnum ?
                <div className="customSelect" >
                    <label className="selectLabel">{t(field)}</label>
                    <select onChange={(e) => handleChangeInput(e.target.value)}>
                        {data && data.map(
                            (el, index) => (
                                <option key={index} value={el}>{t(el)}</option>
                            )
                        )}

                    </select>
                </div>
                : null}
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </div>
    )
}

export default withNamespaces()(InputField)