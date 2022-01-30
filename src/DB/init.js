import fs from 'fs'
import { isArguments } from 'lodash';
import path from 'path'
import constants from '../libs/constants'

const basename = path.basename(__filename);
const DynamoDBModel = require('dynamodb-model');
let db = {};

async function createSchema() {
    try {
        fs
        .readdirSync(__dirname + "/models")
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            let modelName = file.split('.')
            const model = require(path.join(__dirname + "/models", file))(DynamoDBModel);
            db[modelName[0]] = model;
        });
    
        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
    
        return db;
      } catch (err) {
        console.log(`Error creating models: ${err}` );
      }
}

export function getConfig() {
    return {
        region: constants.REGION,
        accessKeyId: constants.ACCESS_KEY,
        secretAccessKey: constants.SECRET_KEY,
    }
}

export async function initDynamoDB() {
    db = await createSchema();

    console.log(`NOTE - Migration script can be added for update/alter tables in this method`);
    Object.entries(db).forEach( async([tableName, schema]) =>  {
        const model = new DynamoDBModel.Model(tableName, schema, getConfig());
        const response = await new Promise(function (resolve) {
            model.createTable(function (err, data) {
                err ? resolve(err) : resolve(data);
            })
        })

        if (response && response?.statusCode) {
            console.log(response.message);
        } else {
            console.log(`${response.TableDescription.TableName} has been created`);
        }
    });
}

export function getModels() {
    if (db === null) {
      throw new Error('DB schema has not yet prepared');
    }
    return db;
}