import React from 'react'

const FooterForm = (props) => {
        const { selectedStep, stepElements, allStepIsValidate, stepIsValidate } = props
        return (
            <div className="formFooter">
                {selectedStep > 1 && <button className="buttonPrevious" onClick={() => props.handlePreviousStep(selectedStep - 1)}>Previous</button>}
                {selectedStep < stepElements.length && <button className={`${stepIsValidate ? '' : 'disabled'}`} onClick={() => props.handleSelevtedStepIsChanged(selectedStep + 1)}>Next</button>}
                {selectedStep === stepElements.length && <button className={`${allStepIsValidate ? '' : 'disabled'}`} onClick={() => props.handleSubmitForm()}>Submit</button>}
            </div>
        )
}

export default (FooterForm)
