/* eslint-disable radix */
export default class Repository {
   constructor(model) {
      this.model = model;
   }

   async findOne(where) {
      const result = await this.model.findOne(this.model.translateAliases(where));

      return result?.toObject();
   }

   async findById(id) {
      const result = await this.model.findById(id);

      return result?.toObject();
   }

   async findAll({ where, sort, limit }) {
      const data = await this.model
         .find(this.model.translateAliases(where))
         .sort(this.model.translateAliases(sort))
         .limit(parseInt(limit) || null)
         // .populate(populate || null)
         .exec();

      return data;
   }

   async findAndPaginate({ where, field, sort, skip, limit }) {
      const data = await this.model
         .find(this.model.translateAliases(where))
         .populate(field)
         .sort(this.model.translateAliases(sort))
         .skip(this.model.translateAliases(skip))
         .limit(this.model.translateAliases(limit))
         .exec();

      return data;
   }

   async updateOne(data) {
      const { id } = data;

      const result = await this.model.updateOne({ _id: id }, this.model.translateAliases(data));

      return result;
   }

   async findByIdAndUpdate(data) {
      const { id } = data;

      const result = await this.model.findByIdAndUpdate(id, this.model.translateAliases(data), { new: true });

      return result;
   }

   async findByIdAndUnsetGroup(id) {
      const result = await this.model.findByIdAndUpdate(id, { $unset: { GroupData: 1 } });
      return result;
   }

   async create(data) {
      const result = await this.model.create(this.model.translateAliases(data));

      return result?.toObject();
   }

   async createWithSession(data, session) {
      await this.model.create([this.model.translateAliases(data)], { session });
   }

   async delete(_id) {
      await this.model.deleteOne({ _id });
   }

   async deleteAll() {
      await this.model.deleteMany({});
   }

   async softDelete(_id, state = true) {
      await this.model.updateOne(
         this.model.translateAliases({
            _id,
         }),
         this.model.translateAliases({
            isDeleted: state,
            deletedAt: new Date(),
         }),
      );
   }

   async softInactive(_id, state = true) {
      await this.model.updateOne(
         this.model.translateAliases({
            _id,
         }),
         this.model.translateAliases({
            inactive: state,
            inactiveAt: new Date(),
         }),
      );
   }

   async insertMany(data) {
      const result = await this.model.insertMany(data);
      return result;
   }

   async findUpdate({ filter, data, session }) {
      if (session) {
         await this.model.updateOne(this.model.translateAliases(filter), this.model.translateAliases(data), {
            upsert: true,
            session,
         });
      } else {
         const update = await this.model.updateOne(this.model.translateAliases(filter), this.model.translateAliases(data), {
            upsert: true,
         });
         return update;
      }
   }

   async deleteMany(filter) {
      await this.model.deleteMany(this.model.translateAliases(filter));
   }

   async findAndPopulate(id, field) {
      const result = await this.model.findById(id).populate(field);
      return result?.toObject();
   }

   async countWithFilter(where) {
      const result = await this.model.countDocuments(this.model.translateAliases(where));

      return result;
   }

   async countDocuments() {
      const result = await this.model.estimatedDocumentCount();

      return result;
   }

   async findOneSort({ where, sort }) {
      const data = await this.model
         .findOne(this.model.translateAliases(where))
         .sort(this.model.translateAliases(sort))
         .exec();

      return data?.toObject();
   }

   async findAllPopulate({ where, sort, limit, populate }) {
      const data = await this.model
         .find(this.model.translateAliases(where))
         .sort(this.model.translateAliases(sort))
         .limit(parseInt(limit) || null)
         .populate(populate)
         .exec();

      return data;
   }

   async findByIdPopulate(id, populate) {
      const result = await this.model.findById(id).populate(populate);

      return result?.toObject();
   }

   async findOneSortPopulate({ where, sort, populate }) {
      const data = await this.model
         .findOne(this.model.translateAliases(where))
         .sort(this.model.translateAliases(sort))
         .populate(populate)
         .exec();

      return data?.toObject();
   }

   async incrementUpdate({ filter, data, session }) {
      const inc = { $inc: data };
      await this.model.updateMany(this.model.translateAliases(filter), inc, { new: true, session });
   }

   async findByIdAndUnset({ id, fields }) {
      const result = await this.model.updateOne({ _id: id }, { $unset: this.model.translateAliases(fields) });
      return result;
   }

   async deleteById(id) {
      const result = await this.model.findOneAndDelete({ _id: id });

      return result;
   }
}
