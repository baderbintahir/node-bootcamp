class APIFeatures {
  constructor(query, reqQueryObj) {
    this.query = query;
    this.reqQueryObj = reqQueryObj;
  }

  filter() {
    const queryObj = { ...this.reqQueryObj };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields?.forEach((el) => delete queryObj[el]);

    const qryStr = JSON.stringify(queryObj)?.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`,
    );

    const qryObj = JSON.parse(qryStr);

    this.query = this.query.find(qryObj);

    return this;
  }

  sort() {
    if (this.reqQueryObj.sort) {
      const sortBy = this.reqQueryObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.reqQueryObj.fields) {
      const fields = this.reqQueryObj.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.reqQueryObj.page * 1 || 1;
    const limit = this.reqQueryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
