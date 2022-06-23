export class ResponseModel<T>{
    data:T[]
    message:string
    success:boolean
}

export class ResponseWithoutData{
    message:string
    success:boolean 
}