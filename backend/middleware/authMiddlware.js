const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
    if (request.method === "OPTION") { //Запросы типа OPTIONS не обрабатываем
        next();
    };
    
    try {
        //извлекаем токен авторизации из заголовка запроса
        const token = request.headers.authorization.split(" ")[1]; //Bearer fdkfjdkmkbggklg
        if (!token){ //Если токен в заголовке не найден
            response.status(401).json({ message: "Пользователь не авторизован" });
        };
        const decoded = jwt.verify(token, process.env.SECRET_KEY); //декодируем токен
        request.user = decoded; // добавляем декодированный токен в заголовок запроса
        next();
    } catch (e) {
        response.status(401).json({ message: "Пользователь не авторизован" });
    }
}