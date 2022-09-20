"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, nickname, email, password, birthDate) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getNickname() {
        return this.nickname;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getBirthDate() {
        return this.birthDate;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map