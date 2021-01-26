function my(select) {
    if (document.querySelectorAll(select).length === 1) {
        return document.querySelectorAll(select)[0];
    }
    return document.querySelectorAll(select)
}
// 随机颜色
function randomColor() {
    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var result = "#";
    for (var i = 0; i < 6; i++) {
        var color = parseInt(Math.random() * 16);
        result = result + arr[color];
    }
    return result;
}

function hans(list, event, fn) {
    for (var i = 0; i < list.length; i++) {
        list[i][event] = fn;
    }
}

let cookie = {
    // 写入/修改cookie
    set(key, value, day) {
        let d = new Date();
        d.setDate(d.getDate() + day)
        document.cookie = key + "=" + value + ";expires=" + d;
    },
    // 读取cookie
    get(key) {
        let arr = document.cookie.split("; ")
        var result = {}
        arr.forEach(item => {
            let key = item.split("=")[0];
            let value = item.split("=")[1];
            result[key] = value;
        })
        return key ? result[key] : result;
    },
    // 删除cookie
    remove(key) {
        if (this.get(key)) {
            document.cookie = key + "=18;expires=" + new Date('1999-09-09');
            return true;
        } else {
            return false;
        }
    }
}