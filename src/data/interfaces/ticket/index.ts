export interface ITicket {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  enabled: boolean;
  price: string;
  quantity: number;
  category: {
    members: number;
    name: string;
  };
}

export interface TicketDTO {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  quantity: number;
  categoryId: string;
}
