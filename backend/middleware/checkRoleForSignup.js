const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
    // if (request.method === "OPTION") { //Запросы типа OPTIONS не обрабатываем
    //     next();
    // };

    try {
        //извлекаем токен авторизации из заголовка запроса
        if (!!request.headers.authorization) {
            const token = request.headers.authorization.split(" ")[1]; //Bearer fdkfjdkmkbggklg
            response.status(404).json({ message:token});
            if (token) { //Если токен в заголовке не найден
                const decoded = jwt.verify(token, process.env.SECRET_KEY); //декодируем токен
                request.user = decoded; // добавляем декодированный токен в заголовок запроса
            }
        }
        next();
    } catch (e) {
        response.status(404).json({ message: e.message });
    }
}