import { VideoSummary } from './app.model';
export declare class AppService {
    findAll(): VideoSummary[];
    findOne(id: number): VideoSummary;
    isVideoListed(id: number): boolean;
}
