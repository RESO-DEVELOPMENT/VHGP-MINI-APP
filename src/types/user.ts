export interface User {
  message: string;
  accessToken: string;
  userId: string;
}

export interface Membership {
  membershipId: string
  phoneNumber: string
  email: any
  fullname: string
  gender: number
  memberLevel: MemberLevel
}


export interface RecentlySearchMember {
  membershipId: string
  phoneNumber: string
  fullname: string
}

export interface MemberActionResponse {
  actionValue: number
  description: string
  id: string
  memberActionTypeId: string
  memberWalletId: string
  status: string
  transactionId: string
}

export interface UserInfo {
  membershipId: string;
  phoneNumber: string;
  email: string;
  fullname: string;
  delFlg: boolean;
  gender: string;
  insDate: Date;
  updDate: Date;
  memberLevel: MemberLevel;
}

export interface MemberLevel {
  memberLevelId: string;
  name: string;
  indexLevel: number;
  benefits: string;
  maxPoint: number;
  nextLevelName: string;
  memberWallet: MemberWallet[];
  membershipCard: MembershipCard[];
  point: number;
}

export interface MemberWallet {
  id: string;
  balance: number;
  walletType: WalletType;
}

export interface WalletType {
  name: string;
  currency: string;
}

export interface MembershipCard {
  id: string;
  membershipCardCode: string;
  physicalCardCode: any;
  membershipCardType: MembershipCardType;
}


export interface MembershipCardType {
  id: string;
  name: string;
  cardImg: string;
}


export interface UserLogin {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  userId: string;
  username: string;
  fullName: string;
  token: string;
  brandCode: string;
  brandId: string;
  roleName: string;
}
export interface MemberActionResponse {
  actionValue: number
  description: string
  id: string
  memberActionTypeId: string
  memberWalletId: string
  status: string
  transactionId: string
}
export interface Membership {
  membershipId: string
  phoneNumber: string
  email: any
  fullname: string
  gender: number
  memberLevel: MemberLevel
}
export interface MemberLevel {
  memberLevelId: string
  name: string
  indexLevel: number
  benefits: string
  maxPoint: number
  nextLevelName: string
  memberWallet: MemberWallet[]
  membershipCard: MembershipCard[]
  point: number
}
export interface RecentlySearchMember {
  membershipId: string
  phoneNumber: string
  fullname: string
}
