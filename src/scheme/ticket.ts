type TicketData = {
    id: string;
    title: string;
    category: string;
    start_date: string;
    end_date: string;
    poster_url:string;
    location: string;
    is_liked: boolean;
}

type TicketDataWithStatus = TicketData & {
    isExclusive: boolean;
    onSale: boolean;
}

type ExclusiveByData = {
    _id: number;
    items: TicketData[]
}

export type {
    ExclusiveByData,
    TicketDataWithStatus,
    TicketData
}