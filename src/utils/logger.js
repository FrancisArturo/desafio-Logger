import winston from "winston";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red",
        error: "orange",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "white"
    }
}

const devLogger = winston.createLogger({
    levels: customLevels,
    transports : [
        new winston.transports.Console({ 
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.simple()
            )
    }),
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevels,
    transports : [
        new winston.transports.Console({ 
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.simple()
            )
    }),
        new winston.transports.File({ 
            filename: "./errors.log", 
            level: "error",
            format: winston.format.simple()
        }),
    ]
});

const loggerLevelEnv = {
    production: prodLogger,
    development: devLogger
}

export function setLogger (req, res, next) {
    req.logger = loggerLevelEnv[`${process.env.NODE_ENV}`];
    next();
};