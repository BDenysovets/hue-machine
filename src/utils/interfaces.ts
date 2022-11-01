import {NextPageContext} from "next";

export interface Partner {
  name: string;
  absynthKey: string;
  customizations: {
    [key: string]: any;
  };
  [key: string]: any
}

export interface AuthRecord {
  partner: string;
  key: string;
}

export interface CustomRecord {
  target: string;
  [key: string]: any;
}

export type PageT = {
  params: {
    id: string;
  };
} & NextPageContext

export type ConnectedContractT = {
  name: string
  opensea_link: string
  network: string
  contract_address: string
  abi: string
  id?: string
}