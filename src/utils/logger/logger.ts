import { getEnvironment, Environment } from "src/utils/environment";
import { colors } from "src/utils/logger/colors";

export enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug"
}
/**
 * @category Utility
 */
export class Logger {
    static logLevelColors = {
        [LogLevel.INFO]: colors.fg.blue,
        [LogLevel.WARN]: colors.fg.yellow,
        [LogLevel.ERROR]: colors.fg.red,
        [LogLevel.DEBUG]: colors.fg.green,
    };

    private static formatMessage(message: string | any): string {
        if (typeof message === 'string') {
            return message;
        }
        try {
            return JSON.stringify(message, null, 2);
        } catch (error) {
            return String(message);
        }
    }

    static log(level: LogLevel, message: string | any) {
        const formattedMessage = this.formatMessage(message);
        const color = this.logLevelColors[level] || colors.reset;
        const timestamp = new Date().toISOString();
        const fileLink = this.getFileLink();

        if (getEnvironment() === Environment.BROWSER) {
            // Browser context
            console.log(`%c[${timestamp}] [${level.toUpperCase()}] ${formattedMessage} %c${fileLink}`, `color: ${color}`, "color: gray");
        } else {
            // Node context
            console.log(`${color}[${timestamp}] [${level.toUpperCase()}] ${formattedMessage} ${fileLink}${colors.reset}`);
        }
    }

    static info(message: string | any) {
        this.log(LogLevel.INFO, message);
    }

    static warn(message: string | any) {
        this.log(LogLevel.WARN, message);
    }

    static error(message: string | any) {
        this.log(LogLevel.ERROR, message);
    }

    static debug(message: string | any) {
        this.log(LogLevel.DEBUG, message);
    }

    private static getFileLink(): string {
        try {
            // Throwing an error to get the stack trace
            const err = new Error();
            const stack = err.stack || "";

            // Find the correct stack line, skipping lines related to the logger itself
            const stackLines = stack.split("\n");
            for (let i = 1; i < stackLines.length; i++) {
                const line = stackLines[i];
                if (!line.includes("Logger.") && !line.includes("getFileLink")) {
                    const fileMatch = line.match(/\((.*?):(\d+):(\d+)\)/);
                    if (fileMatch) {
                        const [, file, line, column] = fileMatch;
                        if (file.includes("logger.ts")) {
                            continue
                        }
                        return `at ${file}:${line}:${column}`;
                    }
                }
            }
        } catch (e) {
            // If anything fails, return an empty string
        }
        return "";
    }
}
