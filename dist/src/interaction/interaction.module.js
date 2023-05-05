"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
const web3_1 = __importDefault(require("web3"));
let InteractionModule = class InteractionModule {
    constructor() {
        const web3 = new web3_1.default('https://data-seed-prebsc-1-s1.binance.org:8545');
        const account = web3.eth.accounts.privateKeyToAccount(config_1.PRIVATE_KEY);
        console.log(account);
    }
};
InteractionModule = __decorate([
    (0, common_1.Module)({}),
    __metadata("design:paramtypes", [])
], InteractionModule);
exports.InteractionModule = InteractionModule;
//# sourceMappingURL=interaction.module.js.map