export interface Campaign {
  id: string
  name: string
  description: string
  content: string
  sendAt: string
  sent: boolean
  enabled: boolean
  createdAt: Date
  updatedAt: Date
}
