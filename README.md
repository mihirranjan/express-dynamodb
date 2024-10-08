# ExpressJS with DynamoDB
This is a sample example where we can connect to DynamoDB, prepare schema, and utilise throughout the example.

### Instructions to run the code

1. Clone the repository
2. Create a.env file in the root directory consisting of the following properties:
```
PORT=3000
ACCESS_KEY=
SECRET_KEY=
REGION=
```
3. Run `npm i`
6. Run `npm start`
7. Please go to http://localhost:3000/api-docs/.
8. 
![Screenshot 2](https://github.com/mihirranjan/express-dynamodb/blob/main/try-out-unsubscribe-reasons-post.png)
![Screenshot 3](https://github.com/mihirranjan/express-dynamodb/blob/main/try-out-unsubscribe-reasons-get.png)

### Architecture and Request/Response Flow

Happy Path:
1. Get the request through the router and pass it to the controller.
2. XSS attacks could be added through the router to validate any vulnerability (not added in the code).
3. Once the controller has the request, that has to go for extra validation (propertName check, fieldname, value as int/string, etc.).
4. Once the request parameter is validated and they are ok, it will go to Methods (DM model operations) to do query, update, or delete executions.
5. When Methods work is finished, it will return the response to the controller with a status code.

Unhappy Path:
1. If there is any error at any stage (XSS, validation, methods), it will throw an error with a proper message.

### What included

1. Created a DB folder that contains
a. model (schema)
    b. init.js
2. init.js => Connect DB, load schema, create tables (show message in console if table is created or exists)
NOTE - 
a. I have added TestData schema to test how it should work when we have multiple tables to create.
b. We could add an update/alter table schema and use them in the same way.
3. errors: Created some specific errors (HTTP and validation error) that extend error and HTTPerror respesctively.
4. libs: Create a constants file to keep every env variable data as a constant to use throughout the application.
5. methods: created methods for SurveyController to update/query DynamoDB
6. Swager: A Swager UI to validate the request and response
7. Validators: Added field and propertu validations
