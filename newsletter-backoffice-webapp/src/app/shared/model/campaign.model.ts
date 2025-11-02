export interface Campaign {
  id: string;
  name: string;
  description: string;
  content: string;
  design: string;
  sendAt: Date;
  sent: boolean;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatesCampaign {
  name: string;
  description: string;
  content: string;
  design: string;
  sendAt: Date;
}
