import { IParticipantDTO } from '../parcipants';

export interface ISubscriptionDTO {
  responsibleName?: string;
  responsibleEmail?: string;
  responsiblePhone?: string;
  nickname?: string;
  ticketId?: string;
  participants?: IParticipantDTO;
  ticketIndex?: number;
}
export interface ISubscription {
  id: string;
  name: string;
  championshipId: string;
}
