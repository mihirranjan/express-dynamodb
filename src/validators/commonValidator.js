import { ValidationError } from "../errors";

const commonValidators = {
    fieldValidator(fieldName, fieldValue, regEx = null) {
        const unsubscribeReason = ["consideredSpam", "tooFrequent", "notInterested"];
        fieldValue = fieldValue.toString().trim();

        if (!fieldValue || fieldValue.toString().trim().length === 0) {
            throw new ValidationError(`${fieldName} cannot be empty`);
        }

        if (regEx) {
            const regex = new RegExp(regEx, 'g');
            if (!regex.test(fieldValue)) {
                throw new ValidationError(`Invalid ${fieldName}`);
            }
        }

        if (fieldName === 'unsubscribeReason' && !unsubscribeReason.map(u => u.toLocaleLowerCase()).includes(fieldValue.toLocaleLowerCase()) ) {
            throw new ValidationError('Unsunscribe reason not recognised');    
        }
    },

    propertyValidator: function(dataObject, fieldNames) {
        if (typeof dataObject === 'object') {
            fieldNames.map(function (fieldName) {
                if(!dataObject[fieldName]) {
                    throw new ValidationError(`${fieldName} is missing` );
                }
            })  
        } else {
            throw new ValidationError("Please send proper body param");
        }
    },
};

export default commonValidators;