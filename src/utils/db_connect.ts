import mongoose from 'mongoose';

let connection: number = 0;

export default async function DatabaseConnect() {
  if (connection) {
    console.log('MongoDB already connected.');
    return;
  }

  const { ATLAS_URI } = process.env;

  console.log('Connecting to MongoDB Atlas...');

  try {
    mongoose
      .connect(ATLAS_URI as string)
      .then(() => console.log('Connected to MongoDB Atlas!'))
      .catch(() => console.log('Connection failed'));
  } catch {
    console.log('Unable to rune mongoose connect');
  }
}
