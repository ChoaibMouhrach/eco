# Category Api

## Description

Thoes endpoints helps interacting with the categories collection.

## Config
|key|Value|
|:--|:--|
|Base Url|` /categories `|
|Default Headers|`Content-Type : application/json`|

## List Categories

### Request
|Verb|Path|
|:--|:--|
|GET|`/`|

### Query Params
|Key|Type|Default behaviour|Description|
|:--|:--|:--|:--|
|?search=|string|Retrieve the initial 8 documents.|Utilize it to search the entire collection of categories by name and id.|
|?sort=|( "_id" \| "createdAt" \| "updatedAt" \| "deletedAt" \| "name" )|Fetch the first 8 documents|Utilize it to sort the entire collection of categories.|
|?order=|( "desc" \| "asc" )|Fetch the first 8 documents|Utilize it to order the sorted collection of categories.|
|?fields=|( "_id" \| "name" \| "image" \| "A few or all of the prior fields delimited by a comma." )|Retrieve the initial 9 documents.|Utilize it to specify the fields of each document in the entire collection of categories.|
|?trash=|boolean|Retrieve the initial 8 documents that have not been deleted.|Utilize it to display the soft deleted documents in the entire collection of categories.|

### Response
```typescript
// RESPONSE STATUS 200
{
  "data": [
    {
      "_id": "64268f929e274f15b7e9782c", // string
      "name": "0.7140886833214848", // string
      "__v": 0, // number
      "createdAt": "2023-03-31T16:58:42.901Z",// string (timestamp)
      "deletedAt": "2023-03-31T17:04:56.837Z",// string | null (timestamp)
      "updatedAt": "2023-03-31T16:58:42.901Z" // string (timestamp)
    },
  ],
  "limit": 8,   // number
  "skip": 0,    // number
  "count": 28,  // number
  "page": 1,    // number
}
```

## Create new Category

> Requires being authorized

### Request
|Verb|Path|
|:--|:--|
|POST|`/`|

#### Headers
|Key|Value|
|:--|:--|
|Content-Type|multipart/form-data;|
|Authorization|Bearer ${accessToken}|

#### Body

> **Hint:** use FormData

|Key|Type|Description|
|--|--|--|
|name|string|The name of the category|
|image?|file|The Image of the category|

### Response
```typescript
// RESPONSE STATUS 201
{
  "name": "v12", // string
  "image" : null, // null | string ( image path )
  "deletedAt": null, // null | string (timestamp)
  "_id": "6428295b238cca3f04a079d5", // string
  "createdAt": "2023-04-01T12:53:47.700Z",  // string (timestamp)
  "updatedAt": "2023-04-01T12:53:47.700Z",  // string (timestamp)
  "__v": 0
}
```
```typescript
// RESPONSE STATUS 400
{
    "message": "Category already exist"
}
```

## Update Exisiting Category

> Requires being authorized

### Request
|Verb|Path|
|:--|:--|
|PATCH|`/:id`|

#### Headers
|Key|Value|
|:--|:--|
|Content-Type|multipart/form-data;|
|Authorization|Bearer ${accessToken}|

#### Body

> **Hint:** use FormData

|Key|Type|Description|
|--|--|--|
|name?|string|The name of the category|
|image?|file|The Image of the category|

### Response
```typescript
// RESPONSE STATUS 204
```
```typescript
// RESPONSE STATUS 404
{
    "message": "Category not found"
}
````
```typescript
// RESPONSE STATUS 400
{
    "message": "The provided id is invalid"
}
```
```typescript
// RESPONSE STATUS 400
{
  "errors": [
    {
      "path": [ "name" ],
      "message": "Name already exists"
    }
  ]
}
```
```typescript
// RESPONSE STATUS 400
{
  message : "Nothing to update"
}
```
## Delete Category

### Request
|Verb|Path|
|:--|:--|
|DELETE|`/:id`|

#### Headers
|Key|Value|
|:--|:--|
|Content-Type|application/json|
|Authorization|Bearer ${accessToken}|

## Response
```typescript
// RESPONSE STATUS 204
```
```typescript 
// RESPONSE STATUS 404
{
    "message": "Category not found"
}
```
