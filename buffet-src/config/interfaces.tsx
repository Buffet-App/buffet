export interface IUserObject {
    name: string;
    email: string;
    phone: string;
    isMember: boolean;
    memberSince: string;
    profileImg?: string;
};

export interface IRestaurantObject {
    name: string;
    address: string;
    hours: {
        monHours: string;
        tuesHours: string;
        wedHours: string;
        thursHours: string;
        friHours: string;
        satHours: string;
        sunHours: string;
    };
    isParking: boolean;
    restaurantDesc: string;
    parkingDetails: string;
    phone: string;
    addOns?: string;
    photo: string;
    featured: string;
};

export interface IDealsObject {
    itemName: string;
    itemDesc: string;
    itemPrice: number;
    itemImage: string;
    hasAddOn?: boolean;
    addOnName?: string;
    addOnDesc?: string;
    addOnPrice?: number;
    addOnImage?: string;
};