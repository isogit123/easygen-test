## How to run?
1. Clone the repo.
2. Run a MongoDB instance. You can use Docker for that. The API uses the default port (27017) to connect to the database.
3. Using a terminal, go to the backend and frontend directories and run 
```
npm start
```
in each directory
4. Open a browser and go to ```localhost:8000/signup``` This is the sign up page.
5. Open a browser and go to ```localhost:8000/signin``` This is the sign in page, which will redirect to the home page after successful login.
6. If you go to ```localhost:8000/home```, you will be redirected to login page. Note that the unauthorized error message will appear twice due to using React Strict Mode. This won't happen in production.