migrate((db) => {
  const collection = new Collection({
    "id": "njl3km2mqkzovcz",
    "created": "2023-05-24 17:02:23.560Z",
    "updated": "2023-05-24 17:02:23.560Z",
    "name": "others",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fi1dlpqq",
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
  const collection = dao.findCollectionByNameOrId("njl3km2mqkzovcz");

  return dao.deleteCollection(collection);
})
