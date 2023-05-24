# Tool Library
A full-stack web application simulating a tool lending library. This app features a functional database, RESTful API, thoughtful component hierarchy, routing, authentication, and user profiles for searching and reserving tools.

Try it out here: ([mshirk-tool-library.surge.sh](https://mshirk-tool-library.surge.sh/))

## Features

- Browse for tools to borrow, filtering results by title
- View tool details and notes, if available
- Reserve a tool via calendar, using [FullCalendar](https://fullcalendar.io/docs#toc)
- Return borrowed tools and view active and past reservations

## User Flow
### Sign Up
Sign up with a username, email and password. Passwords are hashed using bcrypt.

### Search Page
User can search all tools or filter by title. Results include details such as tool brand, model number, condition and description

### Tool Detail
Additional notes and details about the tools are displayed. All current reservations for a tool are display view interactable calendar. If registered, a user can place a reservation for a selected date range.

### User Profile
Displays current and past reservations with the ability to return currently borrowed tools. Current reservations display due date. Users can also update their username or email.

## Tech Stack
- Frontend: React, JavaScript, FullCalendar, Bootstrap, AJAX, HTML, CSS
- Backend: Node.js, Express, PostgreSQL, SQLAlchemy
- Testing: jest Framework, including unit and integration tests

## Run Locally
1. Clone repository
    ```
    $ git clone https://github.com/mshirk2/capstone-2
    ```
2. Navigate to project directory backend and install packages
    ```
    $ npm install
    ```
3. Setup tool_library database
    ```
    $ createdb tool_library
    $ psql tool_library < tool_library.sql
    ```
4. Start server
    ```
    $ node server.js
    ```
5. Navigate to project directory frontend, and install packages
    ```
    $ npm install
    ```
6. Start app
    ```
    npm start
    ```

### Run Tests
After installing locally, you can run tests as follows:
1. Create PostgresQL test database and setup tables
    ```
    $ createdb tool_library_test
    $ psql tool_library_test < tool_library.sql
    ```
2. Run Tests
    ```
    $ npm test
    ```
3. Or run a specific test file
    ```
    $ npm test <file.js>
    ```

## Credits
Thanks to the [West Philly Tool Library](https://westphillytools.org/) for tool data.

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
