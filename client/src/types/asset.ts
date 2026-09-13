export interface Asset{
    id:string;
    name:string;
    type:string;
    ownerId:string;
    tokenId:string;
    status:  "Available" | "Assigned";
    date:string;
    metadataCid:string;
    txHash:string
}