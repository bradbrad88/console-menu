"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const select_1 = __importStar(require("@inquirer/select"));
const Menu_1 = __importDefault(require("./Menu"));
const Command_1 = __importDefault(require("./Command"));
const Separator_1 = __importDefault(require("./Separator"));
const BackCommand_1 = __importDefault(require("./BackCommand"));
class InquirerAdaptor {
    constructor(menu) {
        this.prompt = {
            message: menu.getTitle(),
            choices: menu.getChoices(choicesTransformer),
        };
    }
    promptUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, select_1.default)(this.prompt, { clearPromptOnDone: true });
            return res;
        });
    }
}
exports.default = InquirerAdaptor;
function choicesTransformer(choices) {
    return choices.map(choiceTransformer);
}
function choiceTransformer(choice) {
    if (choice instanceof Menu_1.default || choice instanceof BackCommand_1.default) {
        return {
            name: choice.getTitle(),
            value: choice,
        };
    }
    if (choice instanceof Command_1.default)
        return {
            name: choice.title,
            value: choice,
        };
    if (choice instanceof Separator_1.default) {
        return new select_1.Separator();
    }
    return choice;
}
