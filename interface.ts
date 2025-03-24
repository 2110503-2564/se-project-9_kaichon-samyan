// interface VenueItem {
//     _id: string,
//     name: string,
//     address: string,
//     district: string,
//     province: string,
//     postalcode: string,
//     tel: string,
//     picture: string,
//     dailyrate: number,
//     __v: number,
//     id: string
//   }
  
//   export interface VenueJson {
//     success: boolean,
//     count: number,
//     pagination: Object,
//     data: VenueItem[]
//   }

//   export interface BookingItem {
//     nameLastname: string;
//     tel: string;
//     venue: string;
//     bookDate: string;
//   }

  export interface session {
    _id: string,
    company: string,
    user: string,
    sessionDate: string,
    createdAt: string,
    __v: number
  }

  export interface Company {
    _id: string,
    companyName: string,
    address: string,
    website: string,
    description: string,
    tel: string,
    __v: number,
    sessions: session[]
  }

  export interface CompanyJson {
    success: boolean,
    count: number,
    pagination: object,
    data: Company[]
  }