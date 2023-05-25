migrate((db) => {
  const collection = new Collection({
    "id": "sxq56fb3jna0rnr",
    "created": "2023-05-24 17:01:08.327Z",
    "updated": "2023-05-24 17:01:08.327Z",
    "name": "videos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "g0rzsmhb",
        "name": "field",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sxq56fb3jna0rnr");

  return dao.deleteCollection(collection);
})
