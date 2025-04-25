export interface session {
  _id: string,
  hotel: string,
  user: string,
  name: string,
  sessionDate: string,
  createdAt: string,
  __v: number
}

export interface Hotel {
  _id: string,
  hotelName: string,
  address: string,
  website: string,
  description: string,
  tel: string,
  __v: number,
  session: session[],
  rating: Rating[],
  picture: string
}

export interface HotelJson {
  success: boolean,
  count: number,
  pagination: object,
  data: Hotel[]
}

export interface Rating {
  _id: string;
  user: UserProfile
  comment: string;
  score: number;
  createdAt: string;
}
export interface UserProfile {
  _id: string;
  name:string;
  password:string;
  email:string;
  tel:string;
  role:string;
  profileImg:string;
  username:string;
}

