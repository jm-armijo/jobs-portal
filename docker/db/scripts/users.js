var document = [
    {
        "_id" : ObjectId("5e5df7f450571fb3aecdcf21"),
        "companyId" : ObjectId("5e5df7fc6953acd3dc50fe8f"),
        "name": "Bob Markle",
        "username": "bob",
        "password": "bob",
        "role" : "user",
    },
    {
        "_id" : ObjectId("5e5df7f450571fb3aecdcf21"),
        "companyId" : ObjectId("5e5df7fc6953acd3dc50fe8f"),
        "name": "Mark Smith",
        "username": "mark",
        "password": "mark",
        "role" : "admin",
    }
];

db = db.getSiblingDB('core');
db.users.insert(document);
