import { AppService } from './app.service';
import { Response } from 'express';
import { CreateEditVideo } from './app.model';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getStreamVideo(idString: string, headers: any, res: Response): Promise<void>;
    findAll(): import("./app.model").VideoSummary[];
    findOne(id: string): import("./app.model").VideoSummary;
    createVideo(id: string, videoSummary: CreateEditVideo): import("./app.model").VideoSummary;
}
