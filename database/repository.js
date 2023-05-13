class Repository {
    constructor(Model) {
      this.Model = Model;
    }
  
    async paginate(payload, options = { pageNo: 1, skip: 0, limit: 10 }) {
      let { pageNo, skip, limit, sort={} } = options;
      
      skip = (pageNo - 1) * limit;
      pageNo = parseInt(pageNo);
      let totalCount = 0;
      totalCount = await this.count({});
      let maxPage = Math.ceil(totalCount / limit);
      let nextPage = pageNo + 1;
      const data = await this.all(payload).skip(skip).sort(sort).limit(limit);
      const result = {
        totalRecords: totalCount,
        pageNo: pageNo,
        nextPage: nextPage > maxPage ? maxPage : nextPage,
        data: data,
      };
      return result;
    }
  
    getModel() {
      return this.Model;
    }
  
    create(obj) {
      return this.Model.create(obj);
    }
  
    findById(id) {
      return this.Model.findById(id);
    }
  
    findOne(condition = {}) {
      return this.Model.findOne(condition);
    }
  
    findOrCreate(condition, obj) {
      return this.Model.findOrCreate({
        where: condition,
        defaults: obj,
      });
    }
  
    all(condition) {
      return this.Model.find(condition);
    }
  
    count(condition) {
      if (condition) {
        return this.Model.count(condition);
      }
      return this.Model.count();
    }
  
    delete(condition) {
      return this.Model.destroy({
        where: condition,
      });
    }
  
    deleteOne(condition) {
      return this.Model.deleteOne(condition);
    }
  
    deleteMany(condition) {
      return this.Model.deleteMany(condition);
    }
  
    massInsert(data = []) {
      return this.Model.insertMany(data);
    }
  
    update(condition, update) {
      return this.Model.updateOne(condition, update);
    }
  
    updateOne(condition, update) {
      return this.Model.findOneAndUpdate(condition, update, { new: true });
    }
  }
  
  module.exports = Repository;
  