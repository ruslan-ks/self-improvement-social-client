export interface ResponseBody {
    timestamp: Date;
    statusCode: number;
    status: string;
    message: string;
    data: Map<string, any>;
}
