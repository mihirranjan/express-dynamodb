# ExpressJS with DynamoDB
This is a sample example where we can connect to DynamoDB, prepare schema and utilize throughout the example.

### Instructions to run the code

1. Clone the repository
2. Create a .env file in the root directory consisting of the following properties:
```
    PORT=3000
    ACCESS_KEY=
    SECRET_KEY=
    REGION=
```
3. Run `npm i`
6. Run `npm start`
7. Please go to http://localhost:3000/api-docs/

![Screenshot 1](https://github.com/mihirranjan/express-dynamodb/blob/main/swagger-links.png)
![Screenshot 2](https://github.com/mihirranjan/express-dynamodb/blob/main/try-out-unsubscribe-reasons-post.png)
![Screenshot 3](https://github.com/mihirranjan/express-dynamodb/blob/main/try-out-unsubscribe-reasons-get.png)

### Architecture and Request/Response flow

Happy Path :
1. Get request through the router and pass it to the controller.
2. XSS attack could be added through router to validate any vulnerability (Not added in the code).
3. Once Controller has the req, that has to be go for a extra validation (propertName check, fieldname, value as int/string etc).
4. Once the req param is validated and they are ok, it will go to Methods (DM model operations) to do query/update/delete executions.
5. When Methods work is finished, it will return the response to the controller with status code.

Unhappy Path:
1. If there is any error at any stage (XSS, validation, Methods), it will throw an error with proper message.

### What I have added. Few more details for Reviewer

1. Created a DB folder which contains
    a. model (schema)
    b. init.js
2. init.js => Connect DB, Load schema, create tables (show message in console if table is created/exist)
NOTE - 
    a. I have added TestData schema to test how it should work when we have multiple tables to create.
    b. We could add update/alter table schema and use them in the same way
3. errors => Created some specific errors (HTTP and validation error) which extend error and HTTPerror respesctively.
4. libs => Create a constants file to keep every env variable data as a constant to use througout the application.
5. methods => created methods for SurveyController to update/query DynamoDB
6. swagger => A swagger UI to validate the request and response
7. validators => Added field and propertu validations
