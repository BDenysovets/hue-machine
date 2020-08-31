import mongoose from 'mongoose'

let connection: number = 0

export default async function DatabaseConnect() {
  if (connection) {
    console.log('MongoDB already connected.')
    return
  }

  const { ATLAS_URI } = process.env

  console.log('Connecting to MongoDB Atlas...')

  try {
    const conn = await mongoose.connect(ATLAS_URI as string, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    connection = conn.connections[0].readyState
    console.log(connection ? 'Connected to MongoDB Atlas!' : 'Connection failed')
  } catch {
    console.log('Unable to rune mongoose connect')
  }
}
