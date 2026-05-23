# backend/test_bazi.py
from core.bazi.main import bazi_paipan

# 测试
result = bazi_paipan(2026, 5, 22, 16)
print("测试结果:")
print(f"年柱: {result['year_pillar']}")
print(f"月柱: {result['month_pillar']}")
print(f"日柱: {result['day_pillar']}")
print(f"时柱: {result['hour_pillar']}")
print(f"完整: {result['full_bazi']}")