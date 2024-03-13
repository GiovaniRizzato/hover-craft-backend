/// <reference types="multer" />
import { CreateEditVideo, VideoSummary } from './app.model';
export declare class AppService {
    static getVideoFolderPath(): string;
    findAll(): VideoSummary[];
    findOne(id: number): VideoSummary;
    isVideoListed(id: number): boolean;
    editOne(id: number, editedSummary: CreateEditVideo): VideoSummary;
    editVideoSummary(oldData: VideoSummary, newData: CreateEditVideo): VideoSummary;
    createFile(createEditVideo: CreateEditVideo, file: Express.Multer.File): VideoSummary;
}
