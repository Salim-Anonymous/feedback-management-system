migrate((db) => {
  const collection = new Collection({
    "id": "byx9q06gzcay902",
    "created": "2023-05-24 17:01:58.394Z",
    "updated": "2023-05-24 17:01:58.394Z",
    "name": "audios",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eoj8qdnt",
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
  const collection = dao.findCollectionByNameOrId("byx9q06gzcay902");

  return dao.deleteCollection(collection);
})
