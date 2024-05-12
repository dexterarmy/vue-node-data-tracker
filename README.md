## Technologies version : 

1. Node -> 20.9.0
2. npm -> 10.1.0
3. vueJS -> 3


## Run the Application : 

1. Clone the project and go inside the project's root folder.
2. Now go inside vue-project folder and run : 
```
npm install
npm run dev --host 0.0.0.0
```
3. Now go inside the node folder which is parallel to vue-project folder and run : 
```
npm install
npm run dev
```

4. Go inside vue-project/src/ folder and change the backendURL variable in socket.js file to the url on which your backend is running
 const backendURL =  "http://<backend_api_url>:3000";

5. Try to run both frontend and backend on your public IP address. 
