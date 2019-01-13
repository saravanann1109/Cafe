export class ItemMaster {
  _id:string;
  Id?: string;
  Code?: string;
  Name?: string;
  Cost?: number;
  IsRegularMenu?: boolean;
  ForBreakFast?: boolean;
  ForLunch?: boolean;
  ForDinner?: boolean;
  ForSnack?: boolean;
  IsActive?: boolean;
  Quantity?: number;
  CreatedDate?: Date;
  ModifiedDate?: Date;
  CreatedBy?: string;
  ModifiedBy?: string;
  Image?: string
  constructor() {
    this.Quantity = 0;
  }
}

export enum addOrDelete {
  add = 1,
  delete = 2,
  replace = 3
}