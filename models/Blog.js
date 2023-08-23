module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "users", 
                key: "id",
            },
        },
    });

   
    return Blog;
};



