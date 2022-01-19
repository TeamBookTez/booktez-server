require("dotenv").config();
module.exports = {
    development: {
        url: process.env.DB_HOST,
        dialect: "postgres",
    },
    test: {
        url: process.env.DB_HOST,
        dialect: "postgres",
    },
    production: {
        url: process.env.DB_HOST,
        dialect: "postgres",
    },
};
//# sourceMappingURL=config.js.map