export function getFormData(obj, formData = new FormData()) {

    function createFormData(obj, subKeyStr = '') {
        for (let i in obj) {
            let value = obj[i];
            let subKeyStrTrans = subKeyStr ? `${subKeyStr}[${i}]` : i;
            if (typeof (value) === 'object') {
                createFormData(value, subKeyStrTrans);
            } else {
                formData.append(subKeyStrTrans, value);
            }
        }
    }
    createFormData(obj);

    return formData;
}