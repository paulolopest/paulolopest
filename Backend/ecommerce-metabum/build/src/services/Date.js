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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDate = void 0;
const verifyDate = (validationDate) => __awaiter(void 0, void 0, void 0, function* () {
    let today = new Date();
    let informedDate = new Date(validationDate);
    let currentTime = today.getTime();
    let expirationDate = informedDate.getTime();
    const verify = expirationDate < currentTime;
    return verify;
});
exports.verifyDate = verifyDate;
//# sourceMappingURL=Date.js.map