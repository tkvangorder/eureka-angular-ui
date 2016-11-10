export class MessageAlert {
  message: string;
  type: string;
  closable: boolean;

  constructor(message:string, type:string, closable:boolean) {
    this.message = message;
    this.type = type;
    this.closable = closable;    
  }

}
