import { IParticipantDTO } from '../parcipants';

export interface ISubscriptionDTO {
  responsibleName: string;
  responsibleEmail: string;
  responsiblePhone: string;
  nickname: string;
  ticketId: string;
  participants: IParticipantDTO[];
}

export interface ISubscriptionForm {
  responsibleName: string;
  responsibleEmail: string;
  responsiblePhone: string;
  ticketId: string;
  ticketIndex?: number;
}

export interface IParticipantForm {
  nickname: string;
  participants: IParticipantDTO[];
}
export interface ISubscription {
  id: string;
  responsibleName: string;
  nickname: string;
  status: 'APPROVED' | 'WAITING' | 'DECLINED';
  category: {
    name: string;
  };
}
