import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getStreamVideo(id: string, headers: any, res: Response): Promise<void>;
    findAll(): {
        id: number;
        name: string;
        duration: string;
        title: string;
    }[];
    findOne(id: string): string | {
        id: number;
        name: string;
        duration: string;
        title: string;
    };
}
