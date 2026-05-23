# core/meihua/main.py

from datetime import datetime

bagua = {
    1: "乾",
    2: "兑",
    3: "离",
    4: "震",
    5: "巽",
    6: "坎",
    7: "艮",
    8: "坤"
}

def meihua_paipan(time_str):

    dt = datetime.strptime(time_str, "%Y-%m-%d %H:%M")

    year = dt.year
    month = dt.month
    day = dt.day
    hour = dt.hour

    upper_num = (year + month + day) % 8
    lower_num = (year + month + day + hour) % 8
    move_num = (year + month + day + hour) % 6

    if upper_num == 0:
        upper_num = 8

    if lower_num == 0:
        lower_num = 8

    if move_num == 0:
        move_num = 6

    result = {
        "upper": bagua[upper_num],
        "lower": bagua[lower_num],
        "moving_line": move_num
    }

    return result