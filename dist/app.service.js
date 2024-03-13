"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const data = fs.readFileSync('assets/videoList.json', 'utf8');
const videoDB = JSON.parse(data);
let AppService = AppService_1 = class AppService {
    static getVideoFolderPath() {
        return 'assets/videos';
    }
    findAll() {
        return videoDB;
    }
    findOne(id) {
        const video = videoDB.find(video => video.id == id);
        if (video) {
            return video;
        }
        else {
            throw new Error("Invalid ID");
        }
    }
    isVideoListed(id) {
        return this.findOne(id).isListed;
    }
    editOne(id, editedSummary) {
        const oldVideoSummary = this.findOne(id);
        return this.editVideoSummary(oldVideoSummary, editedSummary);
    }
    editVideoSummary(oldData, newData) {
        oldData.duration = newData.duration;
        oldData.title = newData.title;
        oldData.isListed = newData.isListed;
        return oldData;
    }
    createFile(createEditVideo, file) {
        return new Promise((resolve) => {
            const videoSummary = {
                id: videoDB.length,
                title: createEditVideo.title,
                duration: createEditVideo.duration,
                isListed: createEditVideo.isListed
            };
            fs.writeFileSync(`${AppService_1.getVideoFolderPath()}/${videoSummary.id}.mp4`, file.buffer);
            videoDB.push(videoSummary);
            resolve(videoSummary);
        });
    }
    ;
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map