/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IDriver extends IUser {
  userId?: {
    name?: string;
    email?: string;
  };
  drivingLicense: string;
  vehicleInfo: {
    model: string;
    license: string;
  };
}
export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  isDeleted: boolean;
  ride: any[];
  createdAt: string;
  updatedAt: string;
}
