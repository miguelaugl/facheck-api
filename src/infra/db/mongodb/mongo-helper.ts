import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (data: any): any {
    Object.entries(data).forEach(function ([key, value]) {
      if (key !== '_id' && value instanceof Object) {
        data[key] = MongoHelper.map(value)
      }
    })
    const { _id, ...rest } = data
    return {
      ...rest,
      id: _id,
    }
  },

  mapCollection (data: any[]): any[] {
    return data.map(this.map)
  },
}
