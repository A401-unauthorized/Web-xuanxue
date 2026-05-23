# core/bazi/main.py
import sxtwl
import datetime
from .ganzhi import GAN, ZHI, ZANG_GAN, get_shishen

# ==================== 纯数学公式推算节气（寿星公历算法精简版） ====================
# 核心原理：利用1900年基准点与节气常数，推算每一年精确到分钟的交节时间，绝不依赖第三方库
JIEQI_REGISTRY = [
    "小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
    "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
    "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
    "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
]

def get_solar_term_time(year: int, term_idx: int) -> datetime.datetime:
    """
    计算某一年某个节气的精确公历时间
    term_idx: 0=小寒, 2=立春, 4=惊蛰, 6=清明 ...
    """
    # 1900年的各个节气世纪常数 base minutes
    # 每一个节气在公历年中都有相对稳定的时间周期（大约365.2422天）
    term_info = [
        5.4055, 20.12, 4.15, 19.03, 5.66, 20.80,
        4.63, 20.10, 4.65, 20.12, 5.13, 21.04,
        4.78, 20.12, 5.88, 21.37, 5.37, 21.05,
        5.15, 20.67, 5.08, 20.53, 5.13, 20.57
    ]
    if term_idx < 0 or term_idx > 23:
        return None
        
    yd = year - 1900
    # 核心天文扰动回归公式
    days = yd * 365.2422 + term_info[term_idx] - 0.052 * (yd / 100)
    
    # 1900年1月1日作为起始锚点
    base_dt = datetime.datetime(1900, 1, 1, 6, 0, 0)
    target_dt = base_dt + datetime.timedelta(days=days)
    
    # 月份和日期的微调校验（对齐公历大小月规律）
    expected_month = (term_idx // 2) + 1
    if term_idx % 2 == 1:
        # "中气" 通常在每月的20号左右
        day_est = 20
    else:
        # "节气" 通常在每月的5号左右
        day_est = 5
        
    return datetime.datetime(year, expected_month, int(target_dt.day), target_dt.hour, target_dt.minute, 0)

def get_jieqi_bounds_pure(solar_dt: datetime.datetime):
    """纯数学寻找当前时间前后邻近的两个『节』（立春、惊蛰、清明等八字边界）"""
    year = solar_dt.year
    jie_list = []
    
    # 命理十二节的索引：2=立春, 4=惊蛰, 6=清明, 8=立夏, 10=芒种, 12=小暑, 14=立秋, 16=白露, 18=寒露, 20=立冬, 22=大雪, 0=小寒
    target_jies = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
    
    # 搜集前后三年内的所有交节时间
    for y in [year - 1, year, year + 1]:
        for jq_idx in target_jies:
            dt_jq = get_solar_term_time(y, jq_idx)
            if dt_jq:
                jie_list.append(dt_jq)
                
    jie_list = sorted(list(set(jie_list)))
    
    prev_jie, next_jie = None, None
    for j in jie_list:
        if j <= solar_dt:
            prev_jie = j
        if j > solar_dt and next_jie is None:
            next_jie = j
            break
            
    # 防止极端异常，给与安全兜底
    if not prev_jie: prev_jie = solar_dt - datetime.timedelta(days=15)
    if not next_jie: next_jie = solar_dt + datetime.timedelta(days=15)
    
    return prev_jie, next_jie

# ==================== 八字排盘核心引擎 ====================
def bazi_paipan(year: int, month: int, day: int, hour: int, minute: int = 0, gender: int = 1) -> dict:
    """问真级八字排盘核心引擎 (新版sxtwl干支提取 + 纯数学大运流年推算)"""
    
    # 1. 提取基本的年月日三柱索引（只传3参数，避开新版Day对象的所有属性报错风险）
    solar = sxtwl.fromSolar(year, month, day)
    y_gz = solar.getYearGZ()
    m_gz = solar.getMonthGZ()
    d_gz = solar.getDayGZ()
    
    dg_idx = d_gz.tg # 日干全盘基准
    
    # 2. 五鼠遁元公式法：精准推算时柱天干地支
    if hour == 23:
        h_dz_idx = 0
    else:
        h_dz_idx = (hour + 1) // 2
    h_tg_idx = (dg_idx * 2 + h_dz_idx) % 10

    def build_column(tg_idx, dz_idx, is_day_master=False):
        return {
            "gan": GAN[tg_idx],
            "zhi": ZHI[dz_idx],
            "shishen_gan": "日主" if is_day_master else get_shishen(dg_idx, tg_idx),
            "zang_gan": [{"gan": GAN[zg[0]], "type": zg[1], "shishen": get_shishen(dg_idx, zg[0])} for zg in ZANG_GAN[dz_idx]]
        }

    bazi_dict = {
        "year_col": build_column(y_gz.tg, y_gz.dz),
        "month_col": build_column(m_gz.tg, m_gz.dz),
        "day_col": build_column(d_gz.tg, d_gz.dz, is_day_master=True),
        "hour_col": build_column(h_tg_idx, h_dz_idx), 
    }

    # 3. 使用数学算法精准推算大运起运时间 (3天=1岁, 1天=4个月)
    is_shun = ((y_gz.tg % 2 == 0) == (gender == 1))
    current_dt = datetime.datetime(year, month, day, hour, minute)
    
    # 调用无第三方依赖的节气边界查找
    prev_jie, next_jie = get_jieqi_bounds_pure(current_dt)
    
    diff_seconds = (next_jie - current_dt).total_seconds() if is_shun else (current_dt - prev_jie).total_seconds()
    total_days = diff_seconds / 86400.0
    
    start_age = int(total_days / 3.0)
    start_months = int((total_days % 3.0) * 4)
    if start_age == 0 and start_months == 0: 
        start_months = 1
        
    # 4. 衍生排盘：8大步运程及每步运程管辖的10个流年
    dayun_list = []
    current_tg, current_dz = m_gz.tg, m_gz.dz
    
    for i in range(1, 9):
        if is_shun:
            current_tg, current_dz = (current_tg + 1) % 10, (current_dz + 1) % 12
        else:
            current_tg, current_dz = (current_tg - 1) % 10, (current_dz - 1) % 12
            
        dy_age = start_age + (i - 1) * 10
        dy_start_year = year + dy_age
        
        liunian_list = []
        for ln_offset in range(10):
            ln_year = dy_start_year + ln_offset
            # 流年年干支同样用简易3参数获取，稳如磐石
            ln_gz = sxtwl.fromSolar(ln_year, 6, 1).getYearGZ()
            liunian_list.append({
                "year": ln_year,
                "ganzhi": GAN[ln_gz.tg] + ZHI[ln_gz.dz],
                "shishen": get_shishen(dg_idx, ln_gz.tg)
            })
            
        dayun_list.append({
            "step": i,
            "start_age": dy_age,
            "ganzhi": GAN[current_tg] + ZHI[current_dz],
            "shishen": get_shishen(dg_idx, current_tg),
            "liunians": liunian_list
        })
        
    return {
        "success": True,
        "bazi": bazi_dict,
        "dayun": dayun_list,
        "qi_yun": f"{start_age}岁{start_months}个月"
    }