
export interface Operator {
    edges:    Edge[];
    pageInfo: PageInfo;
}

export interface Edge {
    cursor: string;
    node:   Node;
}

export interface Node {
    mongoId:       string;
    notifications: null;
    profile:       Profile;
}

export interface Profile {
    createdAt:   Date;
    fathersName: string;
    firstName:   string;
    fullName:    string;
    id:          string;
    mothersName: string;
}

export interface PageInfo {
    hasNextPage:     boolean;
    hasPreviousPage: boolean;
}

export interface State {
  pagination: PageInfo
  data: Profile[]
  
}

export interface Actions {
  getData: (page?: number) => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
