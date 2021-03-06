# My-Kanban-Board

This server has:
- RESTful endpoint for asset's CRUD Operation
- JSON Formatted response


## RESTful Endpoints

### POST /register
  * Request header
    ```
    no needed
    ```
  * Request Body
    ```
    {
      "email": "<email_for_register>"
      "password": "<password_for_register>"
    }
    ```
  * Response(201)
    ```
    {
      "id" : "<id_generated_by_system>"
      "email" : "<registered_email>"
      "password": "<registered_hashed_password>",
      "organization": "<defaultValue('Hacktiv8')>",
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "2020-03-20T07:15:12.149Z"
    }
    ```
  * Response(400)
    ```
    {
      "message" : "<ValidationError>"
    }
    ```

 ### POST /login
  * Request header
    ```
    no needed
    ```
  * Request Body
    ```
    {
      "email": "<email_for_login>"
      "password": "<password_for_login>"
    }
    ```
  * Response(200)
    ```
    {
      "token": "<access_token_JWT>"
    }
    ```
  * Response(400)
    ```
    {
      "message" : "<ValidationError>"
    }
    ```
  * Response(404)
    ```
    {
      "message" : "Email Not Found"
    }
    ```

 ### POST /googleSignIn
  * Request header
    ```
    no needed
    ```
  * Request Body
    ```
    {
      "id_token": "<token_id_generated_by_google>"
    }
    ```
  * Response(200)
    ```
    {
      "token": "<access_token_JWT>"
    }
    ```
  * Response(500)
    ```
    {
      "message" : "Internal Server Error"
    }
    ```

### GET /tasks
  * Request header
    ```
    accessToken : "<token_by_localStorage>"
    ```
  * Request Body
    ```
    no needed
    ```
  * Response (200)
    ```
    [
      {
        "id": 1,
        "title": "<task_title>",
        "category": "<task_category>",
        "UserId" : "<task_created_by_user_with_id>",
        "UserEmail": "<task_created_by_user_whit_email>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
      },
      {
        "id": 2,
        "title": "<task_title>",
        "category": "<task_category>",
        "UserId" : "<task_created_by_user_with_id>",
        "UserEmail": "<task_created_by_user_whit_email>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
        }
     ]
     ```
  * Response (404) - Data Not Found
    ```
    {
      message: "Data Not Found"
    }
    ```
  * Response (500) - Internal Server Error
    ```
    {
      "message": "Internal Server Error"
    }
    ```

### POST /tasks
  * Request header
    ```
    accessToken : "<token_by_localStorage>"
    ```
  * Request Body
    ```
    {
      "title": "<name to get insert into>",
      "category": "<category to get insert into>"
    }
    ```
  * Response (201)
    ```
    {
      "id": <given id by system>,
      "title": "<added_title>",
      "category": "<added category>",
      "UserId" : "<added_by_user_with_id>",
      "UserEmail": "<added by_user_with_email>"
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "2020-03-20T07:15:12.149Z",
    }
    ```
  * Response (400)
    ```
    {
      "message": "<ValidationError>"
    }
    ```
  * Response (500)
    ```
    {
      "message" : "Internal Server Error"
    }
    ```

### GET /tasks/:id
  * Request header
    ```
    accessToken : "<token_by_localStorage>"
    ```
  * Request Body
    ```
    no needed
    ```
  * Response (200)
    ```
    {
        "id": 1,
        "title": "<task_title>",
        "category": "<task_category>",
        "UserId" : "<task_created_by_user_with_id>",
        "UserEmail": "<task_created_by_user_whit_email>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
     }
     ```
  * Response(404)
    ```
    {
      "message": "Data Not Found"
    }
    ```
  * Response (500) - Internal Server Error
    ```
    {
      "message": "Internal Server Error"
    }
    ```

### PUT /tasks/:id
  * Request header
    ```
    accessToken : "<token_by_localStorage>"
    ```
  * Request Body
    ```
    {
    "title": "<title_for_update>",
    "category": "<task_category_for_update>"
    }
    ```
  * Response (200)
    ```
    {
      "id": "<generatedsystemid>",
      "title": "<task updated title>",
      "category": "<task updated category>",
      "UserId" : "<userid_that_update_task>",
      "UserEmail": "<userEmail_that_update_task>"
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "<updated date and time>",
    }
    ```
  * Response(404)
    ```
    {
      "message": "Data Not Found"
    }
    ```
  * Response(400)
    ```
    {
      "message": "<ErrorValidation>"
    }
    ```
  * Response (500) - Internal Server Error
    ```
    {
      "message": "Internal Server Error"
    }
    ```

### DELETE /tasks/:id
  * Request header
    ```
    accessToken : "<token_by_localStorage>"
    ```
  * Request Body
    ```
    no needed
    ```
  * Response (200)
    ```
    {
      "id": <deleted_id>,
      "title": "<deleted task title>",
      "category": "<deleted task category>",
      "UserId" : "<deleted task from userid>",
      "UserEmail": "<deleted task from useremail>"
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "2020-03-20T07:15:12.149Z,
    }
    ```
 * Response(404)
   ```
   {
     "message": "Data Not Found"
   }
    ```
 * Response (500) - Internal Server Error
   ```
   {
     "message": "Internal Server Error"
   }
   ```
