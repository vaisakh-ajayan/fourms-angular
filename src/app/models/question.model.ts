import { Answer } from "./answer.model";

export interface Question{
    id: number;
    user_id: number;
    title: string;
    question: string;
    created_at: string;
    updated_at: string;
    answers: Answer[];
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
        updated_at: string;
    }
}