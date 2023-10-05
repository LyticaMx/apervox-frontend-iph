export interface witness {
  id: string;
  fathersName: string;
  firstName: string;
  fullName: string;
  mothersName: string;
}
export interface arresteds {
  id: string;
  fathersName: string;
  firstName: string;
  fullName: string;
  mothersName: string;
}

export interface State {
  witnessList: witness[];
  arrestedsList: arresteds[];
}

export interface Actions {
  addWitness: (page?: number) => Promise<void>;
  editWitness: (page?: number) => Promise<void>;
  addArrested: (page?: number) => Promise<object>;
  editArrested: (page?: number) => Promise<object>;
}

export interface ContextType extends State {
  actions?: Actions;
}
