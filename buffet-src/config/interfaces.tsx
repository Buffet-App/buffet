import { FirebaseFirestoreTypes } from "@firebase/firestore";

export type CollectionReference = FirebaseFirestoreTypes.CollectionReference;
export type DocumentReference = FirebaseFirestoreTypes.DocumentReference;
export type Timestamp = FirebaseFirestoreTypes.Timestamp;

export interface IUserObject {
  name: string;
  email: string;
  phone: string;
  isRestaurant: boolean;
  restaurantId?: string;
  zipcode: string;
  isMember: boolean;
  memberSince: string;
  profileImg?: string;
}

export interface IRestaurantObject {
  profileImg?: String;
  name: string;
  address: string;
  hours?: {
    monHours: string;
    tuesHours: string;
    wedHours: string;
    thursHours: string;
    friHours: string;
    satHours: string;
    sunHours: string;
  };
  isParking?: boolean;
  restaurantDesc: string;
  parkingDetails?: string;
  phone: string;
  addOns?: string;
  photo?: string;
  featured?: string;
}

export interface IDealsObject {
  itemName: string;
  itemDesc: string;
  itemPrice: string;
  itemImage: string;
  hasAddOn?: boolean;
  addOnName?: string;
  addOnDesc?: string;
  addOnPrice?: string;
  addOnImage?: string;
  isBuffetDeal?: boolean;
}
