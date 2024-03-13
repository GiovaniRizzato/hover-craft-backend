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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const fs_1 = require("fs");
const common_2 = require("@nestjs/common");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getStreamVideo(idString, headers, res) {
        const id = Number.parseInt(idString);
        if (this.appService.isVideoListed(id)) {
            const videoPath = `assets/videos/${id}.mp4`;
            const { size } = (0, fs_1.statSync)(videoPath);
            const videoRange = headers.range;
            if (videoRange) {
                const parts = videoRange.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
                const chunksize = (end - start) + 1;
                const readStreamfile = (0, fs_1.createReadStream)(videoPath, { start, end, highWaterMark: 60 });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${size}`,
                    'Content-Length': chunksize,
                };
                res.writeHead(common_1.HttpStatus.PARTIAL_CONTENT, head);
                readStreamfile.pipe(res);
            }
            else {
                const head = {
                    'Content-Length': size,
                };
                res.writeHead(common_1.HttpStatus.OK, head);
                (0, fs_1.createReadStream)(videoPath).pipe(res);
            }
        }
        else {
            res.writeHead(common_1.HttpStatus.UNAUTHORIZED);
            res.send();
        }
    }
    findAll() {
        return this.appService.findAll();
    }
    findOne(id) {
        return this.appService.findOne(+id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('stream/:id'),
    (0, common_1.Header)('Accept-Ranges', 'bytes'),
    (0, common_1.Header)('Content-Type', 'video/mp4'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_2.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getStreamVideo", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findOne", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('video'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map