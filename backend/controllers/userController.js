const ApiError = require("../errors/apiError");

class UserController {

    async signup(request, response) {

    }

    async signin(request, response) {

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