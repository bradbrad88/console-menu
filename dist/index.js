"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const Menu_1 = __importDefault(require("./Menu"));
const Command_1 = __importDefault(require("./Command"));
const InquirerAdaptor_1 = __importDefault(require("./InquirerAdaptor"));
function main(menu) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            yield promptMenu(menu);
        }
    });
}
exports.default = main;
function promptMenu(menu) {
    return __awaiter(this, void 0, void 0, function* () {
        const menuPrompt = new InquirerAdaptor_1.default(menu);
        const selection = yield menuPrompt.promptUser();
        if (selection instanceof Menu_1.default) {
            yield promptMenu(selection);
            return;
        }
        if (selection instanceof Command_1.default) {
            console.log(chalk_1.default.yellow.underline("\n" + selection.title));
            selection.run();
            console.log("\n");
            yield promptMenu(menu);
        }
    });
}
