export type NotionDatabase = {
  integration_token?: string
  database_id?: string
}

// Fix ↓
export type LocalItem = {
  value: number
  expiry: number
}

export type Action = {
  name: 'send' | 'delete'
  isLimit?: boolean
}
