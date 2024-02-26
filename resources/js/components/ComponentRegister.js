import React from "react";
import ComponentForm from "./ComponentForm";
/**
 * Component what render section with title and form
 * 
 * @returns 
 */
const ComponentRegister = () => {
    return (
        <section className={"registration"}>
            <h2 className={"registration_title"}>Working with POST request</h2>
            <ComponentForm></ComponentForm>
        </section>
    )
}
export default ComponentRegister;