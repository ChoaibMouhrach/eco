# User Api

## Description

These endpoints facilitate interaction with the authentication system.

> By default the system will have a default user for testing under the email john@gmail.com

## Config
|key|Value|
|:--|:--|
|Default Headers|`Content-Type : application/json`|

## Login

### Request
|Verb|Path|
|:--|:--|
|POST|`/login`|

#### Body 
|Key|Type|Validation|Description|
|:--|:--|:--|:--|
|email|`string`|Must be a valid email|This field should contain the email address of the user|
|password|`string`|Password length must be greater than or equal to 8|This field should contain the password for the user wishing to log in.|

### Response

```typescript
// RESPONSE STATUS 200
{
  body : {
    "_id": "64282940238cca3f04a079ca", // string
    "firstName": "jhon", // string
    "lastName": "doe", // string
    "email": "jhon@gmail.com", // string
    "deletedAt": null, // string | null
    "createdAt": "2023-04-01T12:53:20.829Z", // string
    "updatedAt": "2023-04-01T17:40:58.647Z", // string
    "__v": 18 // number
  },
  headers : {
    "set-cookie" : [
      "refreshToken=refreshToken",
      "accessToken=accessToken"
    ]
  }
 }
```
```typescript
// RESPONSE STATUS 400 IF EMAIL ADDRESS 
// DOES NOT EXIST OR THE PASSWORD 
// IS NOT CORRECT OR BOTH
{
  "message": "Email Address or Password is not correct"
}
```

## Register 

### Request
|Verb|Path|
|:--|:--|
|POST|`/register`|

#### Body
|Key|Type|Validation|Description|
|:--|:--|:--|:--|
|firstName|`string`|Minimum length of 3 characters and maximum length of 60 characters|The first name of the user|
|lastName|`string`|Minimum length of 3 characters and maximum length of 60 characters|The last name of the user|
|email|`string`|Must be a valid email address|The Email address of the user|
|password|`string`|Minimum length of 8 And must match Password Confirmation|The desired password of the user|
|password_confirmation|`string`|must match Password Confirmation|Password Confirmation of the password|

### Response
```typescript
// RESPONSE STATUS 201
{
  body : {
    "firstName": "camado", // string
    "lastName": "camado", // string
    "email": "camado@gmail.com", // string
    "deletedAt": null, // null | string
    "_id": "64295b23e45fd94cd775125a", // string
    "updatedAt": "2023-04-02T10:38:27.743Z", // string
    "createdAt": "2023-04-02T10:38:27.743Z", // string
    "__v": 0 // number
  },
  headers : {
    "set-cookie" : [
      "accessToken=accessToken" // string,
      "refreshToken=refreshToken" // string
    ]
  }
}
```
```typescript
// RESPONSE STATUS 400
{
  "message": "Email Address is already taken"
}
```
```typescript
// RESPONSE STATUS 400
{
  "errors": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "lastName"
      ],
      "message": "Required"
    }
  ]
}
```
```typescript
// RESPONSE STATUS 400
{
  "errors": [
    {
      "code": "too_small",
      "minimum": 8,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "String must contain at least 8 character(s)",
      "path": [
        "password"
      ]
    },
    {
      "code": "custom",
      "path": [
        "password"
      ],
      "message": "Password and Password confirmation does not match"
    }
  ]
}
```

## Logout

### Request
|Verb|Path|
|:--|:--|
|POST|`/logout`|

#### Headers
|Key|Value|
|:--|:--|
|Authorization|Bearer ${refreshToken}|

## Response
```typescript
// RESPONSE STATUS 204
{
  headers : {
    "set-cookie" : [
      "refreshToken=; Max-Age=0",
      "accessToken=; Max-Age=0"
    ]
  }
}
```
```typescript 
// RESPONSE STATUS 401
{
  "message": "unauthorized"
}
```

## Refresh

### Request
|Verb|Path|
|:--|:--|
|POST|`/refresh`|

#### Headers
|Key|Value|
|:--|:--|
|Authorization|Bearer ${refreshToken}|

### Response
```typescript
// RESPONSE STATUS 204
{
  headers : {
    "set-cookie" : [
      "refreshToken=refreshToken;",
      "accessToken=accessToken;"
    ]
  }
}
```
```typescript
// RESPONSE STATUS 401
{
  "message": "unauthorized"
}
````

## Verify

### Request
|Verb|Path|
|:--|:--|
|GET|`/verify`|

#### Headers
|Key|Value|
|:--|:--|
|Authorization|Bearer ${accessToken}|

## Response
```typescript
// RESPONSE STATUS 200
{
  "_id": "64282940238cca3f04a079ca", // string
  "firstName": "jhon", // string
  "lastName": "doe", // string
  "email": "jhon@gmail.com", // string
  "deletedAt": null, // string | null
  "createdAt": "2023-04-01T12:53:20.829Z", // string
  "updatedAt": "2023-04-01T17:40:58.647Z", // string
  "__v": 19 // number 
}
```
```typescript 
// RESPONSE STATUS 401
{
  "message": "unauthorized"
}
```
```typescript 
// RESPONSE STATUS 401
{
  "message": "token expired"
}
```

