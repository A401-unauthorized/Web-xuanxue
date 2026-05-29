from fastapi import APIRouter, HTTPException
from app.schemas.fortune import (
    MeihuaInput,
    MeihuaResult,
    BaziInput,
    BaziResult,
    QimenInput,
    QimenResult,
    ApiResponse,
)
from app.algorithms.meihua import MeihuaAlgorithm
from app.algorithms.bazi import BaziAlgorithm
from app.algorithms.qimen import QimenAlgorithm


router = APIRouter()


@router.post("/meihua", response_model=ApiResponse)
async def calculate_meihua(input_data: MeihuaInput) -> ApiResponse:
    """梅花易数排盘"""
    try:
        result = MeihuaAlgorithm.calculate(input_data)
        return ApiResponse(success=True, data=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/bazi", response_model=ApiResponse)
async def calculate_bazi(input_data: BaziInput) -> ApiResponse:
    """八字排盘"""
    try:
        result = BaziAlgorithm.calculate(input_data)
        return ApiResponse(success=True, data=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/qimen", response_model=ApiResponse)
async def calculate_qimen(input_data: QimenInput) -> ApiResponse:
    """奇门遁甲排盘"""
    try:
        result = QimenAlgorithm.calculate(input_data)
        return ApiResponse(success=True, data=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
