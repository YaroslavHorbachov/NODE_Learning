function loggerMiddleware(request, response) {
    const now = new Date(),
        hour = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds(),
        miliseconds = now.getMilliseconds();
    return 'Time: ' + hour + ':' + minutes + ':' + seconds + ':' + miliseconds + '; '
        + 'Method: ' + request.method + '; '
        + 'URl: ' + request.url + '; '
        + 'Cookies: keys: ' + Object.keys(request.cookies).join(' ') + ', values: ' + Object.values(request.cookies).join(' ') + ' ' + '; '
        + 'StatusCode: ' + response.statusCode + '; '
        + 'User agent: ' + request.get('user-agent') + '; ';
}

module.exports = loggerMiddleware;