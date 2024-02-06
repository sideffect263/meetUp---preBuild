from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Event, EventUpdate

router = APIRouter()



@router.post("/",response_description="create a new event", status_code=status.HTTP_201_CREATED ,response_model=Event)
def create_event(request:Request,event: Event = Body(...)):
    event = jsonable_encoder(event)
    new_event = request.app.database['events'].insert_one(event)
    created_event = request.app.database['events'].find_one({"_id": new_event.inserted_id})
    
    return created_event


@router.get('/',response_description='List of events',response_model=List[Event])
async def list_events(request:Request):
    events = list(request.app.mongodb['events'].find(limit=100))
    