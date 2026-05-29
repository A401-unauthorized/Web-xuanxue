from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Any
from uuid import UUID


class FortuneInputBase(BaseModel):
    pass


class MeihuaInput(FortuneInputBase):
    date: str
    time: str
    number1: Optional[int] = None
    number2: Optional[int] = None


class BaziInput(FortuneInputBase):
    name: str
    gender: str
    birthDate: str
    birthTime: str
    birthPlace: str
    calendarType: str = "solar"


class QimenInput(FortuneInputBase):
    date: str
    time: str
    location: str
    questionType: str


class FortuneResultBase(BaseModel):
    interpretation: str


class MeihuaResult(FortuneResultBase):
    hexagram: dict
    mutualHexagram: dict
    transformedHexagram: dict


class BaziResult(FortuneResultBase):
    yearPillar: dict
    monthPillar: dict
    dayPillar: dict
    hourPillar: dict
    fiveElements: dict


class QimenResult(FortuneResultBase):
    ninePalaces: list
    heavenPlate: dict
    earthPlate: dict
    humanPlate: dict
    spiritPlate: dict
    fortuneTeller: str
    fortuneBringer: str


class FortuneRecordCreate(BaseModel):
    fortune_type: str
    input_data: dict
    output_data: dict


class FortuneRecordResponse(BaseModel):
    id: UUID
    fortune_type: str
    input_data: dict
    output_data: dict
    created_at: datetime

    class Config:
        from_attributes = True


class ApiResponse(BaseModel):
    success: bool = True
    data: Optional[Any] = None
    error: Optional[dict] = None
