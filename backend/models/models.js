const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Models description

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
});

const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketProject = sequelize.define("basket_project", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});


const Project = sequelize.define("project", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING },
    icon: { type: DataTypes.STRING },
    start: { type: DataTypes.DATE },
    finish: { type: DataTypes.DATE },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Type = sequelize.define("type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Author = sequelize.define("author", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING}
});

const Img = sequelize.define("img", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false }
});

const Stack = sequelize.define("stack", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
});

const TypeAuthor = sequelize.define("type_author", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Models relations

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketProject);
BasketProject.belongsTo(Basket);

Type.hasMany(Project);
Project.belongsTo(Type);

Author.hasMany(Project);
Project.belongsTo(Author);

Project.hasMany(Rating, {as:"rates"});
Rating.belongsTo(Project);

Project.hasOne(BasketProject);
BasketProject.belongsTo(Project);

Project.hasMany(Img,{as:"img"});
Img.belongsTo(Project);

Project.hasMany(Stack,{as:"stack"});
Stack.belongsTo(Project);

// Type.belongsToMany(Author, { through: TypeAuthor });
// Author.belongsToMany(Type, { through: TypeAuthor });

module.exports = {
    User,
    Rating,
    Basket,
    BasketProject,
    Project,
    Type,
    Author,
    Img,
    Stack
}