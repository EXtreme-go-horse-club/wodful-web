export interface ISubscriptionDTO {
  name?: string;
  email?: string;
  phone?: string;
  ticketId?: string;
  participants?: IParticipant;
}
export interface ISubscription {
  id: string;
  name: string;
  championshipId: string;
}

export interface IParticipant {
  name: string;
  identificationCode: string;
  affiliation: string;
  city: string;
  tShirtSize: string;
}
