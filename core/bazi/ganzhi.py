# core/bazi/ganzhi.py

# sxtwl 索引默认：0=甲, 9=癸； 0=子, 11=亥
GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

# 地支藏干表（问真盘核心：包含 本气、中气、余气）
# 结构：{ 地支索引: [ (天干索引, "本/中/余"), ... ] }
ZANG_GAN = {
    0:  [(9, "本")],                                      # 子: 癸
    1:  [(5, "本"), (9, "中"), (7, "余")],                # 丑: 己 癸 辛
    2:  [(0, "本"), (2, "中"), (4, "余")],                # 寅: 甲 丙 戊
    3:  [(1, "本")],                                      # 卯: 乙
    4:  [(4, "本"), (1, "中"), (9, "余")],                # 辰: 戊 乙 癸
    5:  [(2, "本"), (6, "中"), (4, "余")],                # 巳: 丙 庚 戊
    6:  [(3, "本"), (5, "中")],                            # 午: 丁 己
    7:  [(5, "本"), (3, "中"), (1, "余")],                # 未: 己 丁 乙
    8:  [(6, "本"), (8, "中"), (4, "余")],                # 申: 庚 壬 戊
    9:  [(7, "本")],                                      # 酉: 辛
    10: [(4, "本"), (7, "中"), (3, "余")],                # 戌: 戊 辛 丁
    11: [(8, "本"), (0, "中")]                            # 亥: 壬 甲
}

SHI_SHEN_NAMES = {
    "同性_比": "比肩", "异性_比": "劫财",
    "同性_生我": "偏印", "异性_生我": "正印",
    "同性_我生": "食神", "异性_我生": "伤官",
    "同性_克我": "七杀", "异性_克我": "正官",
    "同性_我克": "偏财", "异性_我克": "正财"
}

def get_shishen(day_gan_idx: int, target_gan_idx: int) -> str:
    """根据日干计算目标天干的十神"""
    is_day_yang = (day_gan_idx % 2 == 0)
    is_target_yang = (target_gan_idx % 2 == 0)
    same_polarity = (is_day_yang == is_target_yang)
    
    day_wuxing = day_gan_idx // 2
    target_wuxing = target_gan_idx // 2
    
    diff = (target_wuxing - day_wuxing) % 5
    
    if diff == 0:
        key = "同性_比" if same_polarity else "异性_比"
    elif diff == 1:
        key = "同性_我生" if same_polarity else "异性_我生"
    elif diff == 2:
        key = "同性_我克" if same_polarity else "异性_我克"
    elif diff == 3:
        key = "同性_克我" if same_polarity else "异性_克我"
    else:
        key = "同性_生我" if same_polarity else "异性_生我"
        
    return SHI_SHEN_NAMES[key]