# Media Database
## User Guide
A database application that allows users to add, edit, and delete titles based on their media type.

## Index
- Prerequisites
- Steps to Install and Run
- Navigation
- Functionality
- Troubleshooting

## Prerequisites
- Basic computer / command line skills
- GitHub account (optional)
- Node.js installed
- Modern web browser 

## Steps to Install and Run
1. Download the Media Database URL from [GitHub](https://github.com/ExpandOutward/mediadb)
    1. Click the **green Code button**
    2. Click the **Download ZIP** URL
2. Unzip the file
3. Open terminal / command prompt and point to the unzipped folder
4. Run `npm install`, which will install JSON Server on your machine
5. Run `npm start`, which will run JSON Server on your machine
6. Open `public/index.html` or visit URL [http://127.0.0.1:3000/public/index.html](http://127.0.0.1:3000/public/index.html)
7. Verify that content is showing in the respective tables

### Navigation
The Media Database contains multiple media-types organized in respective tabs. The Movies tab is the default tab that will load upon opening the application. Click the tabs to load tables containing data for each respective media type.

## Functionality
**Important**: JSON Server MUST be running in order for movies to be displayed, added, edited, or deleted.

### Display Content
1. The user opens the application or clicks a tab
2. The media type respective to the chosen tab sends a GET request to JSON Server
3. JSON Server provides the data from `mediadb.json`,` which is then displayed in a table

### Add Content
1. Click into the tab respective to the media type that you would like to add
2. Input a title, genre, and the year that the content was published
3. Click the green **Add Movie button**
4. A POST request is sent to JSON Server which adds the content to the `mediadb.json` file
5. A confirmation message will confirm that the content has been successfully added, click **OK**
6. A follow up GET request is sent to display the new data

## Edit Content
1. Click into the tab respective to the media type that you would like to edit
2. The Edit Movie modal will display
3. Change any of the fields to the desired value
4. Click the **Saved Changes button** to commit the changes
5. The above action will send a PUT request to JSON Server, updating values in the `mediadb.json` file
6. A confirmation message will confirm that the content has been successfully updated, click **OK**
7. A follow up GET request is sent to display the edited data

## Delete Content
1. Click into the tab respective to the media type that you would like to delete
2. Click the Delete button in the row containing the media type that you would like to remove
3. You will be prompted to confirm that you want to delete the item, click **OK**
4. A DELETE request will be sent to JSON server, removing the deleted item from mediadb.json 
5. A confirmation message will confirm that the content has been deleted, click **OK**
6. A follow up GET request is sent to display the remaining data

## Troubleshooting

### Issue: No data is showing in the tables

#### Is JSON Server running? 
- Visit URL [http://127.0.0.1:3000/public/index.html](localhost:3000) in your browser
    - This site can't be reached (or similar verbiage): JSON Server is not running