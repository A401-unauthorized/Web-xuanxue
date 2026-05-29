from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import fortune
from app.database import init_db


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(fortune.router, prefix=f"{settings.API_V1_PREFIX}/fortune")


@app.on_event("startup")
async def startup():
    await init_db()


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": settings.VERSION}


@app.get("/api/health/db")
async def db_health():
    # TODO: 添加数据库连接检查
    return {"status": "connected", "latency_ms": 0}
