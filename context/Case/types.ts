export interface Case {
  mongoId: string
  folio: string
  status: string
  summary: {
    id: string
    injuries: number
    casualties: number
    riskLevel: string
    crimeId: string
  }
  support: Array<{
    id: string
    stopTime: string
    supportType: string
  }> | null
  notification: {
    title: string
  }
  notes: Array<{
    text: string
    id: string
  }>
}

export interface SummaryForm {
  injuries: number
  casualties: number
  riskLevel: string
  crimeId: string
}

export interface Crime {
  mongoId: string
  name: string
}

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
export interface Casualty {
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
  casualties: Casualty[]
  caseId: string;
  case?: Case
  crimes: Crime[]
}

export interface Actions {
  getCrimes: () => Promise<void>;
  getCase: (id: string) => Promise<any>;
  addWitness: (page?: number) => Promise<any>;
  editWitness: (page?: number) => Promise<any>;
  getWitness: (page?: number) => Promise<void>;
  getArrested: (page?: number) => Promise<void>;
  addArrested: (page?: number) => Promise<object>;
  editArrested: (page?: number) => Promise<object>;
  deleteWitness: (idMongo: string) => Promise<void>;
  deleteArrested: (idMongo: string) => Promise<void>;
  
  getCasualties: () => Promise<void>;
  addCasualty: (values: any) => Promise<void>;
  editCasualty: (values: any) => Promise<void>;
  deleteCasualty: (idMongo: string) => Promise<void>;

  saveSummary: (data: SummaryForm) => Promise<void>;
  addSupports: (supports: string[]) => Promise<void>;
}

export interface ContextType extends State {
  actions?: Actions;
}

export interface APIAssitanListResponse {
  mongoId: string;
}
