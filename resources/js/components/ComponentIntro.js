import React from "react";
import Background from "../assets/cropBkg.webp"
import Button from "./ComponentButtton";
/**
 * ComponentIntro what render main content
 * 
 * @returns 
 */
const ComponentIntro = () => {
    return (
        <main className={"intro"}>
                    <div className={"intro_contaner"}>
                        <div className={"intro_block"}>
                            <h1 className={"intro_title"}>
                                Test assignment for back end from old test assignment front-end developer
                            </h1>
                            <p className={"intro_desc"}>
                                What defines a good front-end developer is one that has skilled knowledge of
                                HTML, CSS, JS with a vast understanding of User design thinking as they'll be
                                building web interfaces with accessibility in mind. They should also be excited
                                to learn, as the world of Front-End Development keeps evolving.
                            </p>
                            <Button scrollTo={".registration"} type={"intro_button"}>Sign up</Button>
                        </div>
                    </div>
                    <div className={"intro_bkgcontainer"}>
                        <img
                            src={Background}
                            className={"intro_bkg"}
                            alt="Background"/>
                    </div>
                </main>
    )
}
export default ComponentIntro;