+51


Original file line number	Diff line number	Diff line change
@@ -0,0 +1,51 @@
# 📝 Simple Spring Boot and React To-Do App with Login and JWT Authentication
## 📌 User API
- **`POST /user/login`** (Public)  
  Send username and password to the backend to receive a JWT token in response.
- **`POST /user/register`** (Public)  
  Send email, username, and password to create a new account.
- **`POST /user/me`** (Requires JWT)  
  Send the current JWT token to retrieve user information.  
  > _Note: This endpoint exists solely to fetch user info because the JWT payload only contains the email._
---
## ✅ Task API
- **`GET /task/user/{userId}`** (Requires JWT)  
  Get all tasks belonging to the specified user.
- **`POST /task`** (Requires JWT)  
  Create a new task.
- **`PUT /task/{taskId}`** (Requires JWT)  
  Update an existing task.
- **`DELETE /task/{taskId}`** (Requires JWT)  
  Delete a task.
---
## 🔐 JWT Authentication Flow
After logging in, the client receives a JWT token and includes it in the `Authorization` header for all protected API requests:
```http
Authorization: Bearer <JWT-TOKEN>
```
---
## 🧾 Example JWT Payload
```json
{
  "sub": "user123",
  "iat": 1710000000,
  "exp": 1710600000
}
```
