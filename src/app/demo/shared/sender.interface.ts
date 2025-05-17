export interface Sender {
  id: number,
  senderId: string,
  description: string,
  country: string,
  serviceType: string,
  entityId: string,
  openFlag: string,
  statusFlag: boolean
}

export enum COUNTRY { INDIA="IN",INTERNATIONAL="INTL" }