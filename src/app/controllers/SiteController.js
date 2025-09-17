import { mongooseToObjects } from '../../util/mongoose.js';
import Course from '../modules/Course.js';

class siteController {
  findMany(req, res, next) {
    Course.find({})
      .then((course) => {
        res.render('home', { course: mongooseToObjects(course) });
      })
      .catch(next);
  }
}

export default new siteController();
