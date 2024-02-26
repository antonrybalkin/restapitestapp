import React, {useEffect, useRef, useState, useContext} from "react";
import ComponentRadioGroup from "./ComponentRadioGroup";
import ComponentInput from "./ComponentInput"
import ComponentFileLoader from "./ComponentFileLoader";
import Succes from "../assets/success-image.svg";
import ComponentPhoneInput from "./ComponentPhoneInput";
import {validateEmail, validateName, validationImg, validateForm} from "./validate";
import {LocalContext} from "./Context";
/**
 *  component Form who render form and handle it
 * @returns 
 */
const Form = () => {
    const [token,
        setToken] = useState("");
        /**
         * const status is status register user if true then hide form and show congrats
         */
    const [status,
        setStatus] = useState(false);
    const form = useRef();
    const {setRe_Render} = useContext(LocalContext);
 /**
  * hook what get token
  */
    function getToken(){
        fetch(import.meta.env.VITE_APP_URL+'/api/v1/token')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setToken(data.token)
            })
    }
/**
 * callback  onSubmit form who validate and send form
 * @param {Event} e 
 * @returns 
 */
    async function handleSubmit(e) {
        e.preventDefault();
        getToken();
        let formData = new FormData(form.current);
        formData.set("phone","+"+document.querySelector("input[name='phone']").value.replace(/[^\d]/g, ''))
        let status = await validateForm(formData, {
            email: "email",
            name: "name",
            position_id: "position_id",
            phone: "phone",
            photo: "photo"
        });
         if (status.succeed) {

            fetch(import.meta.env.VITE_APP_URL+'/api/v1/users', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Token': token
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.success) {
                        setStatus(true)
                        document
                            .querySelector(".registration_title")
                            .style
                            .display = "none";
                        setRe_Render(true);
                    } else {}
                })
         }
    }

    if (status == false) {
        return (
            <form
                className={"registration_form"}
                ref={form}
                onSubmit={handleSubmit}
                noValidate>
                <ComponentInput
                    key={"name"}
                    type={"text"}
                    name={"name"}
                    reqired={true}
                    validator={validateName}
                    placeholder={"Your name"}></ComponentInput>
                <ComponentInput
                    key={"email"}
                    type={"email"}
                    name={"email"}
                    reqired={true}
                    validator={validateEmail}
                    placeholder={"Email"}></ComponentInput>
                <ComponentPhoneInput
                    key={"phone"}
                    name={"phone"}
                    reqired={true}
                    placeholder={"Phone"}></ComponentPhoneInput>
                <label className={"registration_roleblock"} htmlFor={"role"}>
                    <p className={"registration_roletitle"}>Select your position</p>
                    <ComponentRadioGroup id={"role"} name={"position_id"} reqired={true}></ComponentRadioGroup>
                </label>
                <ComponentFileLoader
                    validator={validationImg}
                    name={"photo"}
                    reqired={true}
                    placeholer={"Upload your photo"}/>
                <input type="submit" className="registration_submit" value="Sign up"/>
            </form>
        )
    } else {
        return (
            <div className={"registration_succes"}>
                <h2 className={"registration_succestitle"}>User successfully registered</h2>
                <img src={Succes} className={"registration_succesimg"} alt="succes"></img>
            </div>
        )
    }
}
export default Form;