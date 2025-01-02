## API Documentation

### Authentication Routes

#### POST /auth/register
- **Description**: Registers a new user.
- **Request**:
  - **Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "phone": int, //TODO - change to string
      "password": "string",
      "role": int
    }
    ```
- **Response**:
  - `201 Created`: Returns a JSON object with a token.

#### POST /auth/login
- **Description**: Logs in an existing user.
- **Request**:
  - **Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Response**:
  - `200 OK`: Returns a JSON object with a token.
  - `404 Not Found`: Email not registered
  - `401 Unauthorized`: Password is wrong.

#### GET /auth
- **Description**: Retrieves the profile of the authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  - `200 OK`: Returns a JSON object with the user profile.

### Chat Routes


#### GET /chats
- **Description**: Retrieves all chats for the authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  - `200 OK`: Returns a JSON array of chats.

#### GET /chats/latest
- **Description**: Retrieves the latest chat for the authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  - `200 OK`: Returns a JSON object with the latest chat.

#### GET /chats/:id
- **Description**: Retrieves a chat by its ID for the authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  - `200 OK`: Returns a JSON object with the chat.
  - `404 Not Found`: Returns an error message.

#### POST /chats
- **Description**: Creates a new chat for the authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Request**:
  - **Body**:
    ```json
    {
      "prompt": "string",
      "response": "string",
      "rating": "integer"
    }
    ```
- **Response**:
  - `201 Created`: Returns a JSON object with the created chat.

#### PUT /chats/:id
- **Description**: Updates a chat by its ID for the authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Request**:
  - **Body**:
    ```json
    {
      "prompt": "string",
      "response": "string",
      "rating": "integer"
    }
    ```
- **Response**:
  - `204 No Content`: Successfully updated
  - `404 Not Found`: Returns an error message if chat not found.

#### DELETE /chats/:id
- **Description**: Deletes a chat by its ID for the authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  - `204 No Content`: Successfully deleted
  - `404 Not Found`: Returns an error message if chat not found.
