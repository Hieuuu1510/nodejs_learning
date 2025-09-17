// toObject() format sang dạng object thuần

export const mongooseToObjects = (mongooseArray) => {
  return mongooseArray.map((item) => item.toObject());
};

export const mongooseToObject = (mongooseItem) => {
  return mongooseItem.toObject();
};
