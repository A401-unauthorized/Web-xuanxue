# backend/main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.meihua.main import meihua_paipan
from core.bazi.main import bazi_paipan

app = FastAPI(title="玄学综合排盘平台API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"msg": "后端启动成功"}

# ==================== 梅花易数（保持原样，未做任何改动） ====================
@app.get("/meihua")
def meihua(time: str):
    return meihua_paipan(time)

# ==================== 八字排盘（专业向后兼容升级） ====================
@app.get("/bazi")
def bazi(
    year: int, month: int, day: int, hour: int,
    minute: int = Query(default=0, description="分钟"),
    gender: int = Query(default=1, description="1男(乾造), 0女(坤造)")
):
    if not (1 <= month <= 12 or 1 <= day <= 31 or 0 <= hour <= 23):
        raise HTTPException(status_code=400, detail="日期时间参数不合法")
    if gender not in [0, 1]:
        raise HTTPException(status_code=400, detail="性别参数不合法")
    
    try:
        # 调用支持大运流年、地支藏干的新排盘引擎
        result = bazi_paipan(year, month, day, hour, minute, gender)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))