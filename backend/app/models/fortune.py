from sqlalchemy import Column, String, DateTime, JSON, Uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base
import uuid


class FortuneRecord(Base):
    __tablename__ = "fortune_records"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid, nullable=True, index=True)
    fortune_type = Column(String(50), nullable=False, index=True)
    input_data = Column(JSON, nullable=False)
    output_data = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<FortuneRecord {self.id}>"
