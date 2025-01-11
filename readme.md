## PROJECT OVERVIEW

* The project "Course Helper" is a web application designed to help users manage and organize their courses. It provides functionalities for users to register, login, add, edit, and delete courses. The application is built using a modern tech stack with a focus on user experience and security.

### Frontend

The frontend of the application is built using React and Next.js. It leverages Material-UI for styling and components, and Axios for making HTTP requests to the backend. The frontend is responsible for rendering the user interface and handling user interactions.

#### Key Features:
- **User Authentication**: Users can register and login to the application. The authentication state is managed using cookies.
- **Course Management**: All users can view the courses listed by other users. Logined users can add, edit, and delete courses the courses they have added. The course data is displayed in a list format with options to view more details, edit, or delete each course.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.

#### Important Files:
- `page.jsx`: Contains the main logic for user authentication and course management. It handles user registration, login, and course CRUD operations.
- `components/ui/shimmer-button.jsx`: A custom button component with a shimmer effect used throughout the application.
- `styles/globals.css`: Contains global styles for the application.

### Backend

The backend of the application is built using Node.js and Express. It uses ***Prisma*** as the ORM to interact with a ***PostgreSQL*** database. The cloud database used in this project is ***Neon DB*** The backend is responsible for handling API requests, performing business logic, and interacting with the database.

#### Key Features:
- **User Authentication**: The backend provides endpoints for user registration and login. It uses JWT for authentication and authorization.
- **Course Management**: The backend provides endpoints for adding, editing, and deleting courses. Each course is associated with a user who created it.
- **Error Handling**: The backend includes robust error handling to ensure that meaningful error messages are returned to the frontend.
- **Utilities Files**: Basic utiliies files like ***ApiResponse.js***, ***ApiErrors.js*** and ***AsyncHandler.js*** are used to make the code more clean. These files use JavaScript OOPs concept and Error Handling Concept.

#### Important Files:
- `controllers/auth.controller.js`: Contains the logic for user registration and login.
- `controllers/course.controller.js`: Contains the logic for adding, editing, and deleting courses.
- `middlewares/auth.middleware.js`: Middleware for verifying JWT tokens and protecting routes.
- `routes/auth.routes.js`: Defines the routes for user authentication.
- `routes/course.routes.js`: Defines the routes for course management.
- `db.js`: Configures the Prisma client to interact with the PostgreSQL database (Neon DB).

### How to Run the Project

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/course-helper.git
   cd course-helper

2. **Setup for backend folder**
    1.  #### open terminal and run following commands ####
    ```sh
    cd backend

    npm i # Install all the packages used in the backend folder
    ```

    2. #### Make a ***.env*** file like as mentioned in ***.env.local*** file

    3. #### Make a account on ***NeonDB*** to use the cloud database. Make a database and paste the connection string in the .env file.

    4. #### Open Terminal and start the server 
    ```sh
    nodemon index.js
    ```

3. **Setup for Frontend Folder**
    1.  #### open terminal and run following commands ####
    ```sh
    cd frontend

    npm i # Install all the packages used in the frontend folder
    ```

    2. #### Make a ***.env*** file like as mentioned in ***.env.local*** file

    3. #### Open Terminal and start the server 
    ```sh
    npm run dev
    ```
    