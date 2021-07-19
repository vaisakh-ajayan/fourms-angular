//This model represents the datatype for the different questions that we get from the backend.
export interface ListItem{
    id: number;
    user_id: number;
    title: string;
    question: string;
    created_at: string;
    updated_at: string;
    likes: number;
}