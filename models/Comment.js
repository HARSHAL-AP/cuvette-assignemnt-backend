module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comments", {
        text: DataTypes.TEXT,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "users", 
                key: "id",
            },
        },
        blogId: {
            type: DataTypes.INTEGER,
            references: {
                model: "blogs", 
                key: "id",
            },
        },
    });

    

    return Comment;
};
