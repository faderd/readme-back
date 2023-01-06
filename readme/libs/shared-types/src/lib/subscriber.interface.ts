export interface SubscriberInterface {
  id?: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  newPosts?: string[];
}
