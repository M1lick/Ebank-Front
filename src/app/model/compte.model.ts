export interface CompteDetails {
  id:               string;
  solde:            number;
  currenPage:       number;
  totalPages:       number;
  pageSize:         number;
  operationDTOList: Operation[];
}

export interface Operation {
  id:            number;
  dateOperation: Date;
  montant:       number;
  typeOperation: string;
  description:   string;
}
