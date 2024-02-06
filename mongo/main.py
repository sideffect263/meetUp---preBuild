
from pymongo.mongo_client import MongoClient
from fastapi import FastAPI, HTTPException, Body , routing ,Request
from typing import List
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel, Field, HttpUrl, conlist, confloat
import routes


app = FastAPI()

uri = "mongodb+srv://admin:asdfqwer1234@map.xkbb8us.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    
db = client.events

events = db["events"]

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(routes, tags=["books"], prefix="/book")