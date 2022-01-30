import commonValidators from "../commonValidator";

describe('fieldValidator', () => {
    test('throws error if field value is empty', () => {
        expect(() => commonValidators.fieldValidator("fieldName", "")).toThrow()
    });

    test('throws error if field value is not an integer', () => {
        expect(() => commonValidators.fieldValidator("fieldName", "test", /^[0-9]+$/g)).toThrow()
    });

    test('does not throw error if field value is not empty', () => {
        expect(() => commonValidators.fieldValidator("fieldName", "test")).not.toThrow()
    });

    test('does not throw error if field value is an integer', () => {
        expect(() => commonValidators.fieldValidator("fieldName", 1234,  /^[0-9]+$/g)).not.toThrow()
    });
});

describe('propertyValidator', () => {
    test('throws error if object is not defined', () => {
        expect(() => commonValidators.propertyValidator("test", ["accountId", "campaignId", "unsubscribeReason"])).toThrow()
    });

    test('throws error if any of the propert is missing', () => {
        expect(() => commonValidators.propertyValidator({
            "accountId": 1234,
            "campaignId": 3234,
            "unsubscribeReasonTest": "testdata"
          }, ["accountId", "campaignId", "unsubscribeReason"])).toThrow()
    });

    test('does not throw error if property is peresent', () => {
        expect(() => commonValidators.propertyValidator({
            "accountId": 1234,
            "campaignId": 3234,
            "unsubscribeReason": "consideredSpam"
          }, ["accountId", "campaignId", "unsubscribeReason"])).not.toThrow()
    });
});