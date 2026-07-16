# My Top 10 - API Guide

**Version**: Pre-Release  
**Date**: N/A

## Index
- Postman Instructions
- Movie APIs
- Game APIs 
- Show APIs
- Environment Variables
- Testing

## Postman Instructions
Postman can be used to pull, create, edit, and delete data contained within the Media Database application. Postman can also be used to run various tests. 

### Prerequisites
- General postman knowledge
- General API knowledge 
- Postman files from the Media Database GitHub repository

### Steps to Install and Use Postman
- Download Postman [here](https://www.postman.com/downloads/)
- Install Postman
- Download the Media Database ZIP file from GitHub [here](https://github.com/ExpandOutward/mediadb/tree/main)
- Unzip the file
- In Postman, click the **Import** button at the top right of the screen
- Navigate to the unzipped file > Postman
- Select both of the files listed below
    - `My Top 10 API.postman_collection.json`
    - `My Top 10.postman_environment.json`
- In Postman, click into the Collections tab to ensure that the collection has been successfully imported
    - MediaDB API as the Parent folder
    - movies, games, shows as Child folders
    - Each Child folder should have two GET requests along with ADD, UPDATE, and DELETE requests
- In Postman, click into the Environments tab to ensure that the Environment Variables are present
    - base_url : http://localhost:3000
    - movie_id : 999
    - game_id : 999
    - show_id : 999

## Movie APIs

**IMPORTANT**: The URLs shared below will only work if JSON Server is running. Please see `USER_GUIDE.md` in the Documents folder for information on installing and running JSON Server.

### GET Movies

The GET Movies API pulls all movies from the `mediadb.json` file and displays them in the Postman response body.

**Method**: GET  
**URL**: http://localhost:3000/movies  
**Example Response**:
```JSON
[
    {
        "title": "The Matrix",
        "genre": "Action",
        "year": "1999",
        "id": 1
    },
    {
        "title": "Halloween",
        "genre": "Horror",
        "year": "1978",
        "id": 2
    }
]
```

### GET A Movie

The GET A Movie API pulls a single movie from the `mediadb.json` file respective to the id and displays it in the response body.

**Method**: GET  
**URL**: http://localhost:3000/movies/#
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/movies/1    
**Example Response**:
```JSON
{
    "title": "The Matrix",
    "genre": "Action",
    "year": "1999",
    "id": 1
}
```

### POST A Movie
The POST A Movie API sends an object to the `mediadb.json`, adding it to the movies object.

**Method**: POST  
**URL**: http://localhost:3000/movies  
**Body**:

```JSON
{
    "title": "Text String Here",
    "genre": "Text String Here",
    "year": 1500 - Current Year
}
```

**Example Response**:
```JSON 
{
    "id": 3,
    "title": "Obsession",
    "genre": "Horror",
    "year": 2026
}
```

### Update A Movie
The Update A Movie API sends a PUT request the `mediadb.json`, updating the movie object respective to the id included in the URL.

**Method**: PUT  
**URL**: http://localhost:3000/movies/#  
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/movies/1    
**Example Response**:
**Body:**
```JSON
{
    "id": 1-10,
    "title": "Text String Here",
    "genre": "Text String Here",
    "year": 1500 - Current Year
}
```
**Example Response**:

```JSON 
{
    "id": 5,
    "title": "Bloodsport",
    "genre": "Action",
    "year": 1988
}
```

### Delete A Movie
The Delete A Movie API sends a DELETE request the `mediadb.json`, deleting the movie object respective to the id included in the URL.


**Method**: DELETE  
**URL**: http://localhost:3000/movies/#
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/movies/1    
**Example Response**:

```JSON 
{}
```

## Game APIs

### GET Games
The GET Games API pulls all games from the `mediadb.json` file and displays them in the Postman response body.

**Method**: GET  
**URL**: http://localhost:3000/games  
**Example Response**:
```JSON
[
    {
        "title": "Donkey Kong Country",
        "genre": "Action",
        "year": "1994",
        "id": 1
    },
    {
        "title": "Mortal Kombat",
        "genre": "Fighting",
        "year": "1992",
        "id": 2
    }
]
```

### GET A Game

The GET A Game API pulls a single game from the `mediadb.json` file respective to the id and displays it in the response body.


**Method**: GET  
**URL**: http://localhost:3000/games/#
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/games/1    
**Example Response**:
```JSON
{
    "title": "Donkey Kong Country",
    "genre": "Action",
    "year": "1994",
    "id": 1
}
```

### POST A Game

The POST A Game API sends an object to the `mediadb.json`, adding it to the games object.

**Method**: POST  
**URL**: http://localhost:3000/games  
**Body**:
```JSON
{
    "title": "Text String Here",
    "genre": "Text String Here",
    "year": 1500 - Current Year
}
```
**Example Response**:
```JSON
{
    "title": "Resident Evil",
    "genre": "Survival Horror",
    "year": "1996",
    "id": 3
}

```

### Update A Game

The Update A Game API sends a PUT request the `mediadb.json`, updating the game object respective to the id included in the URL.

**Method**: PUT  
**URL**: http://localhost:3000/games/#  
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/games/1    
**Example Response**:
**Body:**
```JSON
{
    "id": 1-10,
    "title": "Text String Here",
    "genre": "Text String Here",
    "year": 1500 - Current Year
}
```
**Example Response**:

```JSON 
{
    "id": 5,
    "title": "Mortal Kombat",
    "genre": "Fighting",
    "year": 1992
}
```

### Delete A Game
The Delete A Game API sends a DELETE request the `mediadb.json`, deleting the game object respective to the id included in the URL.

**Method**: DELETE  
**URL**: http://localhost:3000/games/#
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/games/1    
**Example Response**:

```JSON 
{}
```

## Show APIs

### GET Shows
The GET Shows API pulls all shows from the `mediadb.json` file and displays them in the Postman response body.

**Method**: GET  
**URL**: http://localhost:3000/shows  
**Example Response**:
```JSON
[
    {
        "title": "Tales From The Crypt",
        "genre": "Horror",
        "year": "1988",
        "id": 1
    },
    {
        "title": "LOST",
        "genre": "Mystery",
        "year": "2002",
        "id": 2
    }
]
```

### GET A Show

The GET A Movie API pulls a single movie from the `mediadb.json` file respective to the id and displays it in the response body.

**Method**: GET  
**URL**: http://localhost:3000/games/#
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/games/1    
**Example Response**:
```JSON
    {
        "title": "Tales From The Crypt",
        "genre": "Horror",
        "year": "1988",
        "id": 1
    }
```

### POST A Show

The POST A Show API sends an object to the `mediadb.json`, adding it to the shows object.

**Method**: POST  
**URL**: http://localhost:3000/shows  
**Body**:
```JSON
{
    "title": "Text String Here",
    "genre": "Text String Here",
    "year": 1500 - Current Year
}
```
**Example Response**:
```JSON
{
    "title": "Widow's Bay",
    "genre": "Horror",
    "year": "2026",
    "id": 3
}
```
### Update A Show

The Update A Show API sends a PUT request the `mediadb.json`, updating the show object respective to the id included in the URL.

**Method**: PUT  
**URL**: http://localhost:3000/games/#  
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/games/1    
**Example Response**:
**Body:**
```JSON
{
    "id": 1-10,
    "title": "Text String Here",
    "genre": "Text String Here",
    "year": 1500 - Current Year
}
```
**Example Response**:

```JSON 
{
    "id": 5,
    "title": "Married With Children",
    "genre": "Comedy",
    "year": 1987
}
```

### Delete A Show
The Delete A Show API sends a DELETE request the `mediadb.json`, deleting the show object respective to the id included in the URL.

**Method**: DELETE  
**URL**: http://localhost:3000/shows/#
- **Note**: Replace the `#` with the `id` of the movie.  

**Example**: http://localhost:3000/shows/1    
**Example Response**:

```JSON 
{}
```

## Environment Variables

## Testing