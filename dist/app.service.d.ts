export declare class AppService {
    findAll(): {
        id: number;
        name: string;
        duration: string;
        title: string;
    }[];
    findOne(id: number): string | {
        id: number;
        name: string;
        duration: string;
        title: string;
    };
}
