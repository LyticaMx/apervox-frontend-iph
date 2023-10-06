export interface witness {
  fathersName: string;
  firstName: string;
  fullName: string;
  id: string;
  mothersName: string;
  mongoId: string;
}
export interface Node {
  mongoId: string;
  profile: witness;
}
export interface arresteds {
  id: string;
  fathersName: string;
  firstName: string;
  fullName: string;
  mothersName: string;
  mongoId: string;
}

export interface State {
  witnessList: witness[];
  arrestedsList: arresteds[];
  caseId: string;
}

export interface Actions {
  addWitness: (page?: number) => Promise<any>;
  editWitness: (page?: number) => Promise<any>;
  getWitness: (page?: number) => Promise<void>;
  getArrested: (page?: number) => Promise<void>;
  addArrested: (page?: number) => Promise<object>;
  editArrested: (page?: number) => Promise<object>;
  deleteWitness: (idMongo: string) => Promise<void>;
  deleteArrested: (idMongo: string) => Promise<void>;
}

export interface ContextType extends State {
  actions?: Actions;
}

export interface APIAssitanListResponse {
  mongoId: string;
}
