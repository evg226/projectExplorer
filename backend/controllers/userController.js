const ApiError = require("../errors/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email,  role)=>{
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    );
}

class UserController {

    async signup(request, response,next) {
        const { email, password, role } = request.body; // получаем данные по регистрации пользователя
        // проверка на валидность
            if (!email || !password) {
                return next(ApiError.badRequest("Некорректный email или password"));
            };
            // поиск пользователя по БД
            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return next(ApiError.badRequest(`Пользователь ${email} уже существует`));
            };
            const hashPassword = await bcrypt.hash(password, 5); // хешируем пароль
            const user = await User.create({ email, role, password: hashPassword }); //создаем пользователя в БД
            const basket = await Basket.create({ userId: user.id }); //создаем корзину пользователя в БД
            //Генерируем JWT-токен
            const token = generateJwt(user.id, user.email, user.role);
        return response.json(token);
    };

    async signin(request, response,next ) {
        const { email, password } = request.body; // получаем имя пользователя и пароль
        const user = await User.findOne({ where: { email } }); // ищем пользователя в БД
        if (!user) { //если не найден - возвращаем ошибку
            return next(ApiError.forbidden("Пользователь с таким именем не найден"));
        };
        let comparePassword = bcrypt.compareSync(password, user.password); // сравниваем полученный пароль с паролем в БД
        if (!comparePassword) {
            return next(ApiError.forbidden("Неверный пароль"));
        };
        const token = generateJwt(user.id, user.email, user.role); // генерируем JWT-токен
        return response.json(token);
    }

    async authCheck(request, response, next) {
        const { id } = request.query;
        if (!id) {
            return next(ApiError.badRequest("Не задан 'ID'"));
        };
        response.json(id);
    }
};
module.exports = new UserController();