export interface Newsletter {
  id: string;
  name: string;
  enabled: boolean;
  createdAt: Date,
  updatedAt: Date
}


export interface CreatesNewsletter {
  name: string,
  enabled: boolean
}
