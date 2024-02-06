import uuid
from typing import Optional
from pydantic import BaseModel, Field



class Event(BaseModel):
    name: str
    location: str
    date: str
    time: str
    description: str
    lat : float
    long : float
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    
    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "name": "Don Quixote",
                "date": "Miguel de Cervantes",
                "time": "..."
            }
        }


class EventUpdate(BaseModel):
    name: Optional[str]
    location: Optional[str]
    date: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "title": "Don Quixote",
                "author": "Miguel de Cervantes",
                "synopsis": "Don Quixote is a Spanish novel by Miguel de Cervantes..."
            }
        }