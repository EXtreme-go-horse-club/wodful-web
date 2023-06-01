import { IParticipantDTO } from '../participant';

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

export interface ISimpleSubscription {
  ranking: number;
  nickname: string;
}

export interface IParticipantForm {
  nickname: string;
  participants: IParticipantDTO[];
}
export interface ISubscription {
  id: string;
  responsibleName: string;
  responsibleEmail?: string;
  responsiblePhone?: string;
  nickname: string;
  status: 'APPROVED' | 'WAITING' | 'DECLINED';
  category: {
    name: string;
  };
}

export interface UpdateSubscriptionDTO {
  responsibleName: string;
  responsibleEmail: string;
  responsiblePhone: string;
  nickname: string;
}
