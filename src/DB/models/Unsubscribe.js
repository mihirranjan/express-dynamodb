module.exports = (DynamoDBModel) => {
    const Unsubscribe = new DynamoDBModel.Schema({
        Id: { type: String, key: 'hash'},
        AccountId: { type: Number, key: 'range'},
        CampaignId: Number,
        UnsubscribeReason: String
    })
    return Unsubscribe;
};
