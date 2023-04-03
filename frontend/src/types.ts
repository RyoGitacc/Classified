type Mandatory=Required<{
    location:{value:string}
    title:{value:string}
    area:{value:string}
    photo:{value:string}
    desc:{value:string}
    username:{value:string}
    email:{value:string}
    password:{value:string}
    password2:{value:string}
  }>

  
type Optional=Partial<{
      price:{value:string}
      roomType:{value:string}
      guest:{value:string}
      laundry:{value:string}
      furnished:{value:string}
      jobType:{value:string}
      productType:{value:string}
      cautionType:{value:string}
  }>

  export type InputDataType= Mandatory & Optional

  export type ItemType={
            id:string;
            category:string
            title:string;
            location:string;
            area:string;
            photo:string;
            description:string;
            username:string;
            email:string;
            password:string;
            price:string | null;
            roomType:string;
            guest:boolean | null;
            laundry:boolean | null
            furnished:boolean | null
            jobType:string,
            productType:string,
            cautionType:string
            views:number
            lastUpdated:string | Date
  }

  export type PassingDataType={
    name:string;
    value:string
  }

  export type InputPropsType={
    type:string;
    title:string;
    name:string;
    placeholder:string;
    max:number;
    required:boolean;
}

 



  export type UpdateDataType={
    title:string;
    location:string;
    area:string;
    photo:string;
    description:string;
    username:string;
    email:string;
    password:string;
    price:string;
    roomType:string;
    guest:boolean | null;
    laundry:boolean | null
    furnished:boolean | null
    jobType:string,
    productType:string,
    cautionType:string,
    lastUpdated:string | Date
}

export type FavouriteType={
  id:string;
  itemId:string;
  userId:string;
  lastUpdated?:Date;
}