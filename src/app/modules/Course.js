import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';
import mongooseDelete from 'mongoose-delete';

const CourseSchema = new Schema(
  {
    name: { type: String, require: true },
    desc: { type: String },
    image: { type: String },
    videoId: { type: String, require: true },
    level: { type: String },
    slug: { type: String, unique: true, lowercase: true },
  },
  {
    timestamps: true,
  },
);

// Add plugin
CourseSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true
});

// Middleware
CourseSchema.pre('save', async function (next) {
  let slug;
  if (this.isModified('name') || this.isNew) {
    const Model = this.constructor; // trỏ đến constructor của model hiện tại là Course
    slug = slugify(this.name, {
      lower: true, // convert về chữ thường
      strict: true, // loại bỏ ký tự đặc biệt
      locale: 'vi', // ngôn ngữ
    });

    // kiểm tra slug đã tồn tại chưa
    const existingCourse = await Model.findOne({
      slug,
      _id: { $ne: this._id }, // $ne lấy tất cả các _id khác trừ _id hiện tại
    });

    // nếu slug đã tồn tại thêm số đằng sau
    if (existingCourse) {
      let counter = 1;
      while (true) {
        const newSlug = `${slug}-${counter}`;
        const exists = await Model.findOne({
          slug: newSlug,
        });
        if (!exists) {
          slug = newSlug;
          break;
        }
        counter++;
      }
    }
    this.slug = slug;
  }
  next();
});

// model name từ convert sang số nhiều và viết thường
export default mongoose.model('Course', CourseSchema);
