module.exports = (DynamoDBModel) => {
    const TestData = new DynamoDBModel.Schema({
        Id: { type: String, key: 'hash'},
        Name: String
    })
    return TestData;
};
