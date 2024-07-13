export interface AssetsListItem {
  id: string;
  name: string;
  url: string; 
}


export interface ExtraAttribute {
  direction?: number;
  turningSpeed?: number;
  speed?: number;
}

export interface maggotAttribute extends ExtraAttribute {
  offset?: number;
}