import axios, {AxiosResponse} from 'axios'

export const NFT_PORT_AUTH_KEY = process.env.NEXT_PUBLIC_NFT_PORT_AUTH_KEY
export const NFT_PORT_BASE_URL = 'https://api.nftport.xyz/v0'

const headers = {
  "Content-Type": "application/json",
  "Authorization": NFT_PORT_AUTH_KEY
}

export type ChainT = 'rinkeby' | 'polygon' | 'ethereum'

export type ContractT = {
  chain: ChainT
  name: string
  symbol: string
  max_supply: number
  mint_price: number
  tokens_per_mint: number
  owner_address: string
  treasury_address: string
  public_mint_start: string
  address: string
} & Record<string, any>

export async function getAllContracts(chain: ChainT = 'rinkeby'): Promise<Array<ContractT>> {
  return await axios.get(`${NFT_PORT_BASE_URL}/me/contracts/collections`, {
    headers,
    params: {
       chain
    }
  }).then(({ data }) => data.contracts)
}

export async function createContract(data: Record<string, any>): Promise<AxiosResponse<any>> {
  return await axios.post(`${NFT_PORT_BASE_URL}/contracts/collections`, data, {headers})
}

export async function updateContract(data: Record<string, any>): Promise<AxiosResponse<any>> {
  return await axios.put(`${NFT_PORT_BASE_URL}/contracts/collections`, data, {headers})
}

