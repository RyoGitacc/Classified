import { PassingDataType,InputPropsType} from "./types";


export const dummy={
    id:"",
    category:"",
    title:"",
    location:"",
    area:"",
    photo:"",
    description:"",
    username:"",
    email:"",
    password:"",
    price:"",
    roomType:"",
    guest:false,
    laundry:false,
    furnished:false,
    jobType:"",
    productType:"",
    cautionType:"",
    views:0,
    lastUpdated:""
}

export const initialCondition={
    category:"Any",
    page:"1",
    location:"Any",
    roomType:"Any",
    jobType:"Any",
    productType:"Any",
    cautionType:"Any",
    min:0,
    max:5000,
    guest:false,
    laundry:false,
    furnished:false
}


export const CITIES:string[]=["","Toronto","Vancouver","Montreal","Calgary","Banff","Victoria"]
export const ROOMTYPES:string[]=["","Ground/Upstairs","Basement","Condo","Others"];
export const ADDITIONALS:PassingDataType[]=[{name:"Guest Friendly",value:"guest"},{name:"Laundry On Site",value:"laundry"},
                                            {name:"Furnished",value:"furnished"}]
export const JOBTYPES:string[]=["","Restaurant","Office","Construction","Retail","Others"];
export const PRODUCTTYPES:string[]=["","Appliance","Fashion","Sports","Food","Others"]
export const CAUTIONTYPES:string[]=["","Job","House","Others"]

export const LOCATIONS:PassingDataType[]=[{name:"Toronto",value:"Toronto"},{name:"Vancouver",value:"Vancouver"},
                                   {name:"Montreal",value:"Montreal"},{name:"Calgary",value:"Calgary"},
                                   {name:"Victoria",value:"Victoria"},{name:"Banff",value:"Banff"}]

export const ROOMTYPESPROPS:PassingDataType[]=[{name:"Ground/Upstairs",value:"Ground/Upstairs"},{name:"Basement",value:"Basement"},
                 {name:"Condo",value:"Condo"},{name:"Others",value:"Others"}]

export const CHECKITEMSPROPS:PassingDataType[]=[{name:"Guest Friendly",value:"guest"},{name:"Laundry On Site",value:"laundry"},
                  {name:"Furnished",value:"furnished"}]

export const JOBTYPESPROPS:PassingDataType[]=[{name:"Restaurant",value:"Restaurant"},{name:"Office Job",value:"Office Job"},
                                  {name:"Construction",value:"Construction"},{name:"Retail",value:"Retail"},
                                  {name:"Others",value:"Others"}]
export const PRODUCTTYPESPROPS:PassingDataType[]=[{name:"Appliance",value:"Appliance"},{name:"Fashion",value:"Fashion"},
                                      {name:"Sports",value:"Sports"},{name:"Foods",value:"Foods"},
                                      {name:"Others",value:"Others"}]
export const CAUTIONTYPESPROPS=[{name:"Job",value:"Job"},{name:"Room",value:"Room"},
{name:"Others",value:"Others"}]

export const TITLEPROPS:InputPropsType={
    type:"text",
    title:"Title",
    name:"title",
    placeholder:"Enter title",
    max:90,
    required:true
}

export const AREAPROPS:InputPropsType={
    type:"text",
    title:"Area",
    name:"area",
    placeholder:"Enter area",
    max:40,
    required:false
}

export const PRICEPROPS:InputPropsType={
    type:"text",
    title:"Price",
    name:"price",
    placeholder:"Enter price",
    max:40,
    required:true
}
export const USERNAMEPROPS:InputPropsType={
    type:"text",
    title:"Username",
    name:"username",
    placeholder:"Enter username",
    max:50,
    required:true
}

export const EMAILPROPS:InputPropsType={
    type:"email",
    title:"Email",
    name:"email",
    placeholder:"Enter email",
    max:100,
    required:true
}
export const PASSWORDPROPS:InputPropsType={
    type:"password",
    title:"Password",
    name:"password",
    placeholder:"Enter password",
    max:100,
    required:true
}
export const PASSWORD2PROPS:InputPropsType={
    type:"password",
    title:"Password",
    name:"password2",
    placeholder:"Enter password again",
    max:100,
    required:true
}

