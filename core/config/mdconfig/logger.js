function loggerMiddleware(request, response) {
    console.log(request);
    if ( request.url !== '/404') {

        return 'false';
    } else {
        var now = new Date();
        var hour = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var miliseconds = now.getMilliseconds();
        var data =
            'Time: ' + hour + ':' + minutes + ':' + seconds + ':' + miliseconds + '; '
            + 'Method: ' + request.method + '; '
            + 'URl: ' + request.url + '; '
            + 'Cookies: keys: ' + Object.keys(request.cookies).join(' ') + ', values: ' + Object.values(request.cookies).join(' ') + ' ' + '; '
            + 'StatusCode: ' + response.statusCode + '; '
            + 'User agent: ' + request.get('user-agent') + '; ';
        return data;
    }
}
module.exports.middlewareLogger = loggerMiddleware;