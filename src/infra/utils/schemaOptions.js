import schemaToObject from './convertObject';

const schemaOptions = {
   strict: true,
   timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' },
   selectPopulatedPaths: false,
   minimize: true,
   toJSON: {
      virtuals: true,
      getters: true,
      transform: (doc, ret, options) => {
         schemaToObject(ret);

         delete ret.deleted;
         delete ret.__v;
         delete ret._id;
      },
   },
   toObject: {
      virtuals: true,
      getters: true,
      transform: (doc, ret, options) => {
         schemaToObject(ret);

         delete ret.deleted;
         delete ret.__v;
         delete ret._id;
      },
   },
};

export default schemaOptions;
