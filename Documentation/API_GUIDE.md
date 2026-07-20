# My Top 10 - API Guide

**Document Version**: 2  
**Product Version**: 3   
**Date**: July 2026  
[Version History](#version-history)

## Index
- [Authorization](#authorization) <!-- D2/P3 -->
    - [Log In](#log-in) <!-- D2/P3 -->
    - [Get Current Login Details](#get-current-login-details) <!-- D2/P3 -->
    - [Change Password](#change-password) <!-- V2 -->
    - [Log Out](#log-out) <!-- D2/P3 -->
- [GET End Points](#get-end-points) <!-- D2/P3 -->
    - [GET List Content](#get-list-content) <!-- D2/P3 -->
- [POST End Points](#post-end-points) <!-- D2/P3 -->
    - [POST Content To List](#post-content-to-list) <!-- D2/P3 -->
- [PUT End Points](#put-end-points) <!-- D2/P3 -->
    - [Update Existing Content](#update-existing-concent) <!-- D2/P3 -->

## Authorization  <!-- D2/P3 -->

### Log In  <!-- D2/P3 -->

| Element | Value |
|----------|-------------|
|     Method     |      POST       |
|     URL     |      https://my-top-10.onrender.com/auth/login       |
| Content-Type | application/json |
| Body | raw / JSON |

#### Body Text
```json
{
  "username": "username",
  "password": "password"
}

```

#### Response Body
```json
{
    "id": 1,
    "username": "user"
}

```

### Get Current Login Details  <!-- D2/P3 -->

| Element | Value |
|----------|-------------|
|     Method     |      GET       |
|     URL     |      https://my-top-10.onrender.com/auth/me       |
| Content-Type | application/json |

#### Response Body
```json
{
    "id": 1,
    "username": "username",
    "created_at": "2026-07-18T21:42:51.950Z"
}

```

### Change Password  <!-- D2/P3 -->

| Element | Value |
|----------|-------------|
|     Method     |      POST       |
|     URL     |      https://my-top-10.onrender.com/auth/change-password       |
| Content-Type | application/json |
| Body | raw / JSON |

#### Body Text
```json
{
  "currentPassword": "currentpassword",
  "newPassword": "newpassword"
}

```

#### Response Body
```json
{
    "message": "Password updated"
}

```

### Log Out <!-- D2/P3 -->

| Element | Value |
|----------|-------------|
|     Method     |      POST       |
|     URL     |      https://my-top-10.onrender.com/auth/logout       |


#### Response Body
```json
{
    "message": "Logged out"
}

```

##  GET End points  <!-- D2/P3 -->
The GET End Points display all of the list details respective of the chosen end point.

**Important**: These API calls require authentication. Log in to the API server first (via Postman or your preferred client).

### GET List Content  <!-- D2/P3 -->


| Element | Value |
|----------|-------------|
|     Method     |      GET       |
|     Movies URL     |      https://my-top-10.onrender.com/movies       |
|     Games URL     |      https://my-top-10.onrender.com/games       |
|     Shows URL     |      https://my-top-10.onrender.com/shows       |

#### Response Body (Movies)
```json
[
    {
        "id": 1,
        "title": "Halloween",
        "genre": "Horror",
        "year": "1978"
    },
    {
        "id": 2,
        "title": "Never Hike In The Snow",
        "genre": "Horror",
        "year": "2021"
    }
]
```

## POST End Points  <!-- D2/P3 -->

The POST End Points allow users to add content to lists through API calls.

**Important**: These API calls require authentication. Log in to the API server first (via Postman or your preferred client).

### POST Content To List  <!-- D2/P3 -->

| Element | Value |
|----------|-------------|
|     Method     |      POST       |
|     Movies URL     |      https://my-top-10.onrender.com/movies       |
|     Games URL     |      https://my-top-10.onrender.com/games       |
|     Shows URL     |      https://my-top-10.onrender.com/shows       |
| Content-Type | application/json |
| Body | raw / JSON |

#### Request Body
```JSON
{
    "title": "Title",
    "genre": "Genre",
    "year": Year
}
```

#### Response Body
```JSON
{
    "id": 1,
    "title": "LOST",
    "genre": "Mystery",
    "year": "2002"
}
```

## PUT End Points <!-- D2/P3 -->

### Update Existing Content <!-- D2/P3 -->
Replace the `#` with the `id` of the object that you would like to update.

| Element | Value |
|----------|-------------|
|     Method     |      POST       |
|     Movies URL     |      https://my-top-10.onrender.com/movies/#       |
|     Games URL     |      https://my-top-10.onrender.com/games/#       |
|     Shows URL     |      https://my-top-10.onrender.com/shows/#       |
| Content-Type | application/json |
| Body | raw / JSON |

#### Request Body
```JSON
{
    "title": "Title",
    "genre": "Genre",
    "year": Year
}
```

#### Response Body
```JSON
{
    "id": 1,
    "title": "Halloween",
    "genre": "Horror",
    "year": "2018"
}
```

## DELETE End Points <!-- D2/P3 -->

### Delete Content <!-- D2/P3 -->
Replace the `#` with the `id` of the object that you would like to delete.

| Element | Value |
|----------|-------------|
|     Method     |      POST       |
|     Movies URL     |      https://my-top-10.onrender.com/movies/#       |
|     Games URL     |      https://my-top-10.onrender.com/games/#       |
|     Shows URL     |      https://my-top-10.onrender.com/shows/#       |

#### Response Body
```JSON
{
    "message": "Deleted"
}
```

## Version History

### Version 2
- **17 - 20**: Updated documentation to reflect changes made after moving from JSON Server to Express.js.
  - Most significant change in regard to API enables users to use a public URL.
  - Previously, users had to download the application and run npm. This is no longer required. 

### Version 1
#### July 2026
- **16**: Initial document published