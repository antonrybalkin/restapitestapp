import React from 'react';
/**
 * Component what render radiobtn with props
 * @param {Object} props 
 * {
 * reqired::bool - for require option
 * name::string - data for name input  
 * value::string - data for value input
 * text::string - name for label 
 * }
 * @returns 
 */
const ComponentRadioBTN = (props) => {
    if (props.reqired) {
        return (
            <label className={"role"}>{props.text}
                <input
                    type="radio"
                    name={props.name}
                    required
                    className={"role_option"}
                    onChange={() => {
                    document
                        .querySelector(".registration_fieldset .input_error")
                        .classList
                        .add("hide");
                    document
                        .querySelector(".registration_fieldset")
                        .classList
                        .remove("error")
                }}
                    value={props.value}/>
                <span className={"role_mark"}></span>
            </label>
        );
    } else {
        return (
            <label className={"role"}>{props.text}
                <input
                    type="radio"
                    name={props.name}
                    className={"role_option"}
                    onChange={() => {
                    document
                        .querySelector(".registration_fieldset .input_error")
                        .classList
                        .add("hide");
                    document
                        .querySelector(".registration_fieldset")
                        .classList
                        .remove("error")
                }}
                    value={props.value}/>
                <span className={"role_mark"}></span>
            </label>
        );
    }
}

export default ComponentRadioBTN;