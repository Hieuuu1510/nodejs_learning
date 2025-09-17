import mongoose from 'mongoose';

export const connect = async () => {
  try {
    await mongoose.connect(process.env.mongodb_url);
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!', error);
  }
};
