export interface VideoSummary {
    id: number;
    title: string;
    duration: string;
    isListed: boolean;
}
export interface CreateEditVideo {
    title: string;
    duration: string;
    isListed: boolean;
}
