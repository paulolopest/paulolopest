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
exports.PostData = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class PostData {
    constructor() {
        this.createPost = (id, title, text, author, source, tags) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.post.create({
                    data: {
                        id,
                        title,
                        text,
                        author,
                        source,
                        tags,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.editPost = (id, title, text, author, source, tags) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.post.update({
                    where: {
                        id,
                    },
                    data: {
                        title,
                        text,
                        author,
                        source,
                        tags,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = BaseDatabase_1.prismaClient.post.findUnique({
                    where: { id },
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.searchPost = (title) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.post.findMany({
                    where: {
                        OR: [
                            {
                                title: { contains: title },
                            },
                            {
                                tags: { has: title },
                            },
                        ],
                    },
                    orderBy: [{ created_at: 'desc' }],
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.post.findMany({
                    orderBy: [{ created_at: 'desc' }],
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getPostByAuthor = (author) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.post.findMany({
                    where: {
                        author,
                    },
                    orderBy: [{ created_at: 'desc' }],
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getPostByTag = (tags) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.post.findMany({
                    where: {
                        tags: { has: tags },
                    },
                    orderBy: [{ created_at: 'desc' }],
                });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.deletePost = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.post.delete({
                    where: { id },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.PostData = PostData;
//# sourceMappingURL=PostData.js.map