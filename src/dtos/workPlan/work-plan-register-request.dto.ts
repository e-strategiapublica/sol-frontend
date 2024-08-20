import { ItensInterface } from "src/app/interface/items.interface";

export abstract class WorkPlanRegisterRequest {
  name?: string;
  product?: Array<{ quantity?: number; unit?: string; unitValue?: number; items?: string; filterId?: string; }>;
}

export interface WorkPlanProductInterface {
  quantity?: number;
  unitValue?: number;
  items?: any;
  unit?: string;
  filterId?: string;
}
