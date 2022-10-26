export interface ITicket {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  enabled: boolean;
  price: string;
  quantity: number;
}

export interface TicketChampionshipDTO {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  quantity: number;
  categoryId: string;
}
