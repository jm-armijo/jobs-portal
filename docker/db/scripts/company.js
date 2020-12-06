var document = {
    "_id" : ObjectId("5e5df7fc6953acd3dc50fe8f"),
    "name": "PredictiveHire",
    "address": "15 Newton St"
};

db = db.getSiblingDB('core');
db.company.insert(document);
