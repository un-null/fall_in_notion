export type NotionDatabase = {
  integration_token?: string
  database_id?: string
}

// Fix ↓
export type LocalObj = {
  value: string
  expiry: string
}
