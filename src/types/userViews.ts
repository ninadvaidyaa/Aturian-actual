interface UserView {
  name: string;
  id: number;
  columns: Array<{
    id: string;
    index: number;
  }>;
}
export type UserViews = Record<string, UserView>;
