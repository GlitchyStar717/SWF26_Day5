
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import hashlib
from datetime import datetime
from json import JSONDecodeError



app = FastAPI()


# Add CORS middleware, This is necessary to allow your frontend to communicate with the backend. 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This should only be done in development. Not a safe thing to do in production code.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRegister(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# Database operations (JSON file)
def load_users():
    try:
        with open("database.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"users": []}

    except JSONDecodeError:
        return {"users": []}

def save_users(data):
    with open("database.json", "w") as f:
        json.dump(data, f, indent=2)

@app.post("/register")
async def register_user(user: UserRegister):
    users_data = load_users()
    # Check if user already exists
    for existing_user in users_data["users"]:
        if existing_user["username"] == user.username:
            raise HTTPException(status_code=400, detail="Username already exists")
    # Hash the password
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "created_at": datetime.now().isoformat()
    }
    users_data["users"].append(new_user)
    save_users(users_data)
    return {"message": "User registered successfully", "username": user.username}
    # Implementation with validation



# Assignment: Implement the login functionality.
# Create a POST endpoint "/login" that checks if the username and password match any user in the database.
# If credentials are correct, return a success message; otherwise, raise an HTTP 401 error.
# Hint: Don't forget to hash the password before checking it against the stored hashed password.
