import { getModels, getConfig } from '../DB/init'
const DynamoDBModel = require('dynamodb-model');

const surveyMethod = {
    updateSubscription: async function (params) {
        const db = getModels();
        const unsubscribe = new DynamoDBModel.Model("Unsubscribe", db.Unsubscribe, getConfig());
    
        return await new Promise(function (resolve) {
            unsubscribe.putItem(params, function (err, item) {
                err ? resolve(err) : resolve(item);
            })
        })
    },

    getSubscription: async function (params) {
        const db = getModels();
        const unsubscribe = new DynamoDBModel.Model("Unsubscribe", db.Unsubscribe, getConfig());
        const responseData = await new Promise(function (resolve) {
            unsubscribe.scan(params, function (err, data) {
                err ? resolve(err) : resolve(data);
            })
        })

        let dateList = {}
        let total = 0
        if (responseData && responseData?.length > 0) {
            ["consideredSpam", "tooFrequent", "notInterested"].map(reason => {
                dateList[reason] = responseData.filter(r => r.UnsubscribeReason === reason) ? responseData.filter(r => r.UnsubscribeReason === reason).length: 0
                total += dateList[reason]
            })
        }

        return {...params, data: {...dateList, total}}
    }
};

export default surveyMethod;