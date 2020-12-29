import React, { Component } from 'react'
import { connect } from 'react-redux'
import i18n from '../translation/i18n';


const LANGUAGES = ['en','he']

export class SwitchLanguage extends Component {

    handleChangeInput(value) {
        console.log(value)
        if (LANGUAGES.includes(value)) {
            i18n.changeLanguage(value);
        }
    }

    render() {
        return (
            <div className="switchLanguage" >
                <select onChange={(e) => this.handleChangeInput(e.target.value)}>
                    {LANGUAGES && LANGUAGES.map(
                        (el, index) => (
                            <option key={index} value={el}>{el}</option>
                        )
                    )}
                </select>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchLanguage)
