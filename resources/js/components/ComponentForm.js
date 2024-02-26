import React, { useRef, useState, useContext} from "react";
import ComponentRadioGroup from "./ComponentRadioGroup";
import ComponentInput from "./ComponentInput"
import ComponentFileLoader from "./ComponentFileLoader";
import Succes from "../assets/success-image.svg";
import ComponentPhoneInput from "./ComponentPhoneInput";
import {validateEmail, validateName, validationImg, validateForm, setErrors} from "./validate";
import {LocalContext} from "./Context";
/**
 *  component Form who render form and handle it
 * @returns 
 */
const Form = () => {
        /**
         * const status is status register user if true then hide form and show congrats
         */
    const [status,
        setStatus] = useState(false);
    const [errorMsg,
            setErrorMsg] = useState('');
    const form = useRef();
    const {setRe_Render} = useContext(LocalContext);
 /**
  * func what get token
  */
    async function getToken(){
      return await fetch(import.meta.env.VITE_APP_URL+'/api/v1/token')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data.token
            })
    }
/**
 * callback  onSubmit form who validate and send form
 * @param {Event} e 
 * @returns 
 */
    async function handleSubmit(e) {
        e.preventDefault();
        let token= await getToken();
        let keys={
            email: "email",
            name: "name",
            position_id: "position_id",
            phone: "phone",
            photo: "photo"
        };
        let formData = new FormData(form.current);
        formData.set("phone","+"+document.querySelector("input[name='phone']").value.replace(/[^\d]/g, ''))
        let status = await validateForm(formData, keys);
         if (status.succeed) {
            
            fetch(import.meta.env.VITE_APP_URL+'/api/v1/users', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Token': token
                    }
                })
                .then(function (response) {
                    
                    return response.json().then(data => ({http_code: response.status, body: data}));
                })
                .then(function (data) {
                    if (data.body.success) {
                        setStatus(true)
                        document
                            .querySelector(".registration_title")
                            .style
                            .display = "none";
                        setRe_Render(true);
                    } else {

                        switch(data.http_code)
                        {
                            case 422:
                                {
                                    setErrors(data.body.fails,keys);
                                   
                                }
                                break;
                            case 409:
                                    {
                                        setErrors({"email":[''],"phone":[""]},keys);
                                        setErrorMsg(data.body.message);
                                    }
                                    break;
                            default:
                                setErrorMsg(data.body.message);
                        }
                       
                    }
                })
               
                
         }
    }
    let errorNode='';
    if(errorMsg!='')
    {
        errorNode=<h5 className="text-red">{errorMsg}</h5>;
    }
    if (status == false) {
        return (
            <form
                className={"registration_form"}
                ref={form}
                onSubmit={handleSubmit}
                noValidate>
                    {errorNode}
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