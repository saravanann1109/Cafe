export class OrderForm {
    public Id: string
    public OrderedBy: string
    public Status: OrderStatus
    public tempStatus: string
    public CreatedDate: Date
    public ModifiedDate: Date
    // public RequiredDateTime:DateTimeFormat
    public IsPacking: boolean
    public TotalAmount: number
    public OrderedList: Array<OrderDetail>
    public tempOrderedDate: string
    constructor() {
        this.Id = '';
        this.OrderedBy = '';
        this.CreatedDate = new Date();
        this.ModifiedDate = new Date();
        this.IsPacking = false;
        this.TotalAmount = 0;
        this.OrderedList = new Array<OrderDetail>();

    }


}
export enum OrderStatus {
    NewOrder = "NewOrder",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
    Accepted = "Accepted",
    Rejected = "Rejected"
}

export class OrderDetail {
    public Id: number;
    public ItemCode: string;
    public ItemName: string;
    public ItemCost: number;
    public Quantity: number = 0;
    public IsPacking: Boolean;
    public Comments: string;
    public Amount: number;
    public TimeRequired: Date;
}