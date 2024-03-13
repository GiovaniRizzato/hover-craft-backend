import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getStreamVideo(idString: string, headers: any, res: Response): Promise<void>;
    findAll(): import("src/app.model").VideoSummary[];
    findOne(id: string): import("src/app.model").VideoSummary;
}
