# README

## Run On Your Local
1. Clone repository (git clone https://github.com/nishant23122000/highlevel-repo).
2. Navigate to highlevel-repo folder.
3. write **npm install** in terminal.
4. write **npm run dev** in terminal.
5. visit **http://localhost:8080/** in browser.
6. **check video.mp4 (available in repo) for more UI experience**


## Project Production Link 
 **link : https://limitless-plateau-08659.herokuapp.com/**
## File Structure
1. api
  - client
     - Contains Angular code.
   - controller
     - Contains business logic of REST API.
   - dist
     - Contains static angular build files.
   - model
     - Contains all model structure.
   - routes
     - Contains API routes as per mention in given instructions.
     
## End-Points

  1. /setup
    - POST {name,balance}
     RESPONSE { _id, name, transactionid, balance , date }
     STATUS 200
  2. /transact/:walletid
    - POST {amount, description}
     RESPONSE {amount, description, walletid, balance,type}
     STATUS 200
  3. /transactions/:walletid
    - GET {params: walletid}
     RESPONSE {_id, amount, description, walletid, balance, type, date}
     STATUS 200
  4. /wallet/id
    - GET {params : id}
     RESPONSE {_id, name, balance, created_date}
 
   
