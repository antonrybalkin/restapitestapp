/**
 * func what validate email
 * @param {string} Email text
 * @returns {Boolean} status validtion 
 */
export function validateEmail(Email) {
    return Email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) != null
}
/**
 * func what validate name
 * @param {string} text  name
 * @returns {Boolean} status validtion
 */
export function validateName(text) {
    return text.length >= 2 && text.length <= 60
}
/**
 * func what validate position id 
 * @param {Int16Array} id  position id 
 * @returns {Boolean} status validtion
 */
export function validateId(id) {
    return id < 10&&id > 0
}
/**
 * func what get dimention from file
 * @param {URL} uri file
 * @returns {Object} with height and width
 */
const getDimention = uri => new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
        resolve({height: img.height, width: img.width})
    }
    img.src = uri
})
/**
 * func what validate img 
 * @param {File} file file
 * @returns {Boolean} status
 */
export async function validationImg(file) {
    const fileAsDataURL = window
        .URL
        .createObjectURL(file);
    const propertis = await getDimention(fileAsDataURL);
    let size = file.size / 10000000 < 5;
    let status = {
        valid: false,
        error: []
    }
    if (!size) {
        status
            .error
            .push("Size file is too big, img must be up to 5 Mb")
    }

    if (propertis.height < 70 && propertis.width < 70) {
        status
            .error
            .push("Too low dimention, img should be 70x70 or larger")
    }

    status.valid = size == true && propertis.height >= 70 && propertis.width >= 70

    return status;

}
/**
 * func what validate form
 * @param {FormData} fromdata fromdata
 * @param {Object} keys object with key for set error
 * @returns {Object} object with status result
 */
export async function validateForm(fromdata, keys) {

    if (keys == undefined) {
        return {succeed: false, error: "No data keys"}
    }
    if (fromdata == null) {
        return {succeed: false, error: "No data"}
    }

    let photo = false;
    if (keys.photo != undefined && fromdata.get(keys.photo).size != 0) {
        photo = await validationImg(fromdata.get("photo"));
    }
    const name = validateName(fromdata.get(keys.name));
    const email = validateEmail(fromdata.get(keys.email));
    const role = fromdata.get(keys.position_id) !== null
        ? validateId(fromdata.get(keys.position_id))
        : false;
    const phone = fromdata
        .get("phone")
        .match(/^[\+]{0,1}380([0-9]{9})$/) != null;

    if (!role) {
        document
            .querySelector(".registration_fieldset .input_error")
            .classList
            .remove("hide");
        document
            .querySelector(".registration_fieldset .input_error")
            .innerText = "Please select position"
        document
            .querySelector(".registration_fieldset")
            .classList
            .add("error")
    }
    if (!name) {
        document
            .querySelector(".input[name='" + keys.name + "'] ~ .input_error")
            .classList
            .remove("hide");
        document
            .querySelector(".input[name='" + keys.name + "'] ~ .input_error")
            .innerText = "Please fill field name"
        document
            .querySelector(".input[name='" + keys.name + "']")
            .classList
            .add("error")
    }
    if (!email) {
        document
            .querySelector(".input[name='" + keys.email + "'] ~ .input_error")
            .classList
            .remove("hide");
        document
            .querySelector(".input[name='" + keys.email + "'] ~ .input_error")
            .innerText = "Please fill field email"
        document
            .querySelector(".input[name='" + keys.email + "']")
            .classList
            .add("error")
    }
    if (!photo) {
        document
            .querySelector(".file_error")
            .classList
            .remove("hide");
        document
            .querySelector(".file_error")
            .innerText = "Please choose file"
        document
            .querySelector(".file_input")
            .classList
            .add("error")
    }
    if (!phone) {
        document
            .querySelector(".input[name='" + keys.phone + "'] ~ .input_error")
            .classList
            .remove("hide");
        document
            .querySelector(".input[name='" + keys.phone + "'] ~ .input_helper")
            .classList
            .add("hide");
        document
            .querySelector(".input[name='" + keys.phone + "'] ~ .input_error")
            .innerText = "Please fill field phone"
        document
            .querySelector(".input[name='" + keys.phone + "']")
            .classList
            .add("error")
    }

    return {
        succeed: phone && name && email && role && photo && true,
        detail: {
            photo: photo,
            name: name,
            email: email,
            role: role,
            phone: phone
        }
    }
}
