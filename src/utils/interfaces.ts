export interface Partner {
    name: string,
    absynthKey: string,
    customizations: {
      [key: string]: any
    }
}

export interface AuthRecord {
    partner: string,
    key: string
}

export interface CustomRecord {
    target: string,
    [key: string]: any
}