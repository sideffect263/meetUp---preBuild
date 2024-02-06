#creat a farmstack fastapi app
from fastapi import FastAPI , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime
from pymongo import MongoClient

app = FastAPI()



@app.get("/")
async def root():
    return {"message": "Hello World"}


from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://:@map.xkbb8us.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
