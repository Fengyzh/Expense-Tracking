export interface IStore {
    store_id:number,
    address:string,
    store_name:string
  }



export interface ILogs { 
    name:string, 
    date:string, 
    category:string,
    purpose:string,
    note:string,
    amount:number,
    price:number,
    store_name:IStore
 } 
 
