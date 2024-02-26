import React from "react";
import Logo from "../assets/Logo.svg"
import Button from "./ComponentButtton";
/**
 * 
 * Component Header what render header 
 * @returns 
 */
const Header = () => {
    return (
        <header className={"header"}>
                <div className={"header_wrapper"}>
                    <div className={"header_logo"}>
                        <img src={Logo} alt="logo"/>
                    </div>
                    <div className={"header_buttons"}>
                        <Button type={"header_button"} scrollTo={".users"}>Users</Button>
                        <Button type={"header_button"} scrollTo={".registration"}>Sign up</Button>
                    </div>
                </div>
            </header>
    )
}
export default Header;