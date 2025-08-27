/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRide {
  pickup: Pickup;
  destination: Destination;
  pickup_address: PickupAddress;
  destinationAddress: DestinationAddress;
  rideTimeStamps: RideTimeStamps;
  _id: string;
  riderId: string;
  driverId: {
    name: string;
    phoneNumber: string;
  } | null;
  status: string;
  distance: number;
  estimatedRideTime: number;
  fare: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IDriverRid {
  pickup: Pickup;
  destination: Destination;
  pickup_address: PickupAddress;
  destinationAddress: DestinationAddress;
  rideTimeStamps: RideTimeStamps;
  _id: string;
  riderId: {
    name: string;
    _id: string;
  };
  driverId: null;
  status: string;
  distance: number;
  estimatedRideTime: number;
  fare: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Pickup {
  lat: number;
  lng: number;
}

export interface Destination {
  lat: number;
  lng: number;
}

export interface PickupAddress {
  label: string;
}

export interface DestinationAddress {
  label: string;
}

export interface RideTimeStamps {
  requestedAt: string;
}

export interface IRides {
  pickup: Pickup;
  destination: Destination;
  pickup_address: PickupAddress;
  destinationAddress: DestinationAddress;
  rideTimeStamps: RideTimeStamps;
  _id: string;
  riderId: string;
  driverId: any;
  status: string;
  distance: number;
  estimatedRideTime: number;
  fare: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pickup {
  lat: number;
  lng: number;
}

export interface Destination {
  lat: number;
  lng: number;
}

export interface PickupAddress {
  label: string;
}

export interface DestinationAddress {
  label: string;
}

export interface RideTimeStamps {
  requestedAt: string;
  completedAt: string;
  cancelledAt: string;
}
