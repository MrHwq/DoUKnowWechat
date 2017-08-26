function formatTime(time) {
    if (typeof time !== 'number' || time < 0) {
        return time
    }

    var hour = parseInt(time / 3600)
    time = time % 3600
    var minute = parseInt(time / 60)
    time = time % 60
    var second = time

    return ([hour, minute, second]).map(function (n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }).join(':')
}

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}

function formatDailyTime(dateStr) {
    let year = dateStr.substring(0, 4);
    let month = dateStr.substring(4, 6);
    let day = dateStr.substring(6, 8);
    let date = new Date(year, month, day);
    let weekNames = ["", "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    return `${month}月${day}日 ${weekNames[date.getDay()]}`;
}

module.exports = {
    formatTime: formatTime,
    formatLocation: formatLocation,
    formatDailyTime: formatDailyTime
}
