import React from 'react';
import Avatar from "./ComponentAvatar"
import TestAva from "../assets/cropBkg.webp"
import ComponentTooltip from "./ComponentTooltip"


/**
 * Component what render usercard
 * @param {Object} props user data
 * @returns 
 */
const UserCard = (props) => {
    let Number= props.data.phone.match(/\d*(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/);
    let formatedNumber="+"+Number[1]+" ("+Number[2]+") "+Number[3]+" "+Number[4]+" "+Number[5]
    return (
        <div className={"user"}>
            <Avatar
                url={props.data.photo !== undefined
                ? props.data.photo
                : TestAva}/>
            <ComponentTooltip
                key={props.data.id + "_" + Math.floor(window.performance.now())+"name"}
                text={props.data.name}>
                <div className={"user_fullname"}>{props.data.name.length>25?props.data.name.substring(0,25)+"...":props.data.name}
                </div>
            </ComponentTooltip>
            <div className={"user_moreinfo"}>
                <ComponentTooltip key={props.data.id+"_"+Math.floor(window.performance.now())+"role"} text={props.data.position}>
                    <div className={"user_role"}>{props.data.position}
                    </div>
                </ComponentTooltip>
                <ComponentTooltip key={props.data.id+"_"+Math.floor(window.performance.now())+"email"} text={props.data.email}>
                <div className={"user_email"}>{props.data.email.length>40?props.data.email.substring(0,40)+"...":props.data.email}</div>
                </ComponentTooltip>
                <ComponentTooltip key={props.data.id+"_"+Math.floor(window.performance.now())+"phone"} text={formatedNumber}>
                    <div className={"user_phone"}>{formatedNumber}
                    </div>
                </ComponentTooltip>
            </div>
        </div>
    );
}

export default UserCard;
