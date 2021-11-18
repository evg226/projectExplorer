const jwt = require("jsonwebtoken");

module.exports = function (role) {
    return function (request, response, next) {
        
        if (request.method === "OPTION") { //Запросы типа OPTIONS не обрабатываем
            next();
        };
        
        try {
            //извлекаем токен авторизации из заголовка запроса
            const token = request.headers.authorization.split(" ")[1]; //Bearer fdkfjdkmkbggklg
            if (!token) { //Если токен в заголовке не найден
                response.status(401).json({ message: "Пользователь не авторизован" });
            };
            const decoded = jwt.verify(token, process.env.SECRET_KEY); //декодируем токен
            if (decoded.role !== "ADMIN") { //если пользователь не ADMIN
                return response.status(403).json({ message: "У вас не прав на операцию" });
            }
            request.user = decoded; // добавляем декодированный токен в заголовок запроса
            next();
        } catch (e) {
            response.status(401).json({ message: "Пользователь не авторизован" });
        }
    }
}