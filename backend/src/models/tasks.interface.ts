export interface TasksRequest {
  title: string;
  description: string;
  status: string;
  creationDate: string;
  completionDate: string;
  userId: number;
  categoryId: number;
}

export interface TasksResponse {
  id: number;
  title: string;
  description: string;
  status: number;
  creationDate: string;
  completionDate: string;
  userId: number;
  categoryId: number;
}