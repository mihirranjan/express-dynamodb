import { HTTPError } from "../errors";
import commonValidators from "../validators/commonValidator";
import surveyMethod from '../methods/survey'
const { v4: uuidv4 } = require('uuid');

export default class SurveyController {
    static async updateUnsubscribeReasons(req, res) {
        const { accountId, campaignId, unsubscribeReason } = req.body;

        try {
            commonValidators.propertyValidator(req.body, ["accountId", "campaignId", "unsubscribeReason"]);
            commonValidators.fieldValidator("accountId", accountId, /^[0-9]+$/g);
            commonValidators.fieldValidator("campaignId", campaignId, /^[0-9]+$/g);
            commonValidators.fieldValidator("unsubscribeReason", unsubscribeReason);
            
            let requestParam = {"Id": uuidv4(), "AccountId": accountId, "CampaignId": campaignId,"UnsubscribeReason": unsubscribeReason}

            let response = await surveyMethod.updateSubscription(requestParam)

            if (response && response?.statusCode !== 200) {
                return res.status(response.statusCode).send({ errorMessage: response.message });  
            }
            return res.status(201).send(requestParam);
        } catch (e) {
            if (e instanceof HTTPError) {
                res.status(e.code).send({ errorMessage: e.message });
            } else {
                res.status(500).send("Error updating the unsubscribe reason");
            }
        }
    };

    static async getUnsubscribeReasons(req, res) {
        const { campaignId } = req.params;

        try {
            commonValidators.fieldValidator("campaignId", campaignId, /^[0-9]+$/g);

            const response = await surveyMethod.getSubscription({"CampaignId": campaignId})
            
            return res.status(201).send(response);
        } catch (e) {
            if (e instanceof HTTPError) {
                res.status(e.code).send({ errorMessage: e.message });
            } else {
                res.status(500).send("Error updating the unsubscribe reason");
            }
        }
    };
}