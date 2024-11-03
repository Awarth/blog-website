# Blog Post Application

A full-stack MERN (MongoDB, Express, React, Node.js) application to manage and display blog posts. This app enables users to create, edit, view, and delete blog posts, including image uploads. It also includes loading animations, error handling, and image previews.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [File Structure](#file-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **CRUD Operations**: Create, Read, Update, and Delete posts.
- **Image Upload**: Supports image upload with previews.
- **Loading Animations**: Displays loading spinner during data fetching or submission.
- **Error Handling**: Provides clear error messages for network or server issues.
- **Responsive Design**: User-friendly interface on desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Other**: Axios, React Router, React Hot Toast

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**:

   - For the backend, navigate to the backend folder:
     ```bash
     cd backend
     npm install
     ```

   - For the frontend, navigate to the frontend folder:
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   Refer to the [Environment Variables](#environment-variables) section below to configure environment variables for your application.

4. **Start the Application**:
   - Start the backend server:
     ```bash
     npm run server
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

5. **Open in Browser**:
   Navigate to `http://localhost:3000` to view the app.

## Environment Variables

Create a `.env` file in the backend root with the following variables:

```plaintext
PORT=5000
MONGODB_URI=<your-mongodb-uri>
BASE_URL=http://localhost:5000
```

Make sure to replace `<your-mongodb-uri>` with your actual MongoDB connection string.

## File Structure

```plaintext
├── frontend
│   ├── src
│   │   ├── components      # Reusable UI components
│   │   ├── pages           # Application pages (Detailed, NewPost)
│   │   ├── utility         # Utility functions (formatting, etc.)
│   │   ├── constants.js    # API base URL and constants
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # Entry point
│   │   └── styles.css      # Global styles
└── backend
    ├── controllers         # Request handlers
    ├── models              # MongoDB schemas
    ├── routes              # API endpoints
    ├── server.js           # Server setup
    └── .env                # Environment variables
```

## Usage

### Creating a New Post

1. Navigate to the `New Post` page.
2. Enter the title, description, and content of your post.
3. Upload an image if desired.
4. Click `Submit` to save your post.

### Viewing Post Details

1. From the main page, select a post to view its details.
2. You can edit or delete the post from the details page if necessary.

## API Endpoints

| Method | Endpoint              | Description                  |
| ------ | ---------------------- | ---------------------------- |
| POST   | `/post`               | Create a new post            |
| GET    | `/post/:id`           | Get a single post by ID      |
| PATCH  | `/post/:id`           | Update a post                |
| DELETE | `/post/:id`           | Delete a post                |
| PATCH  | `/post/:id/img`       | Update post image            |

## Contributing

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make changes and commit them.
4. Push to the branch and create a pull request.

## License

This project is licensed under the MIT License.

---

Feel free to reach out with any issues or suggestions for improvement!
