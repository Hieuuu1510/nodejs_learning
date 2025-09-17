import { mongooseToObjects } from '../../util/mongoose.js';
import Course from '../modules/Course.js';

class MeController {
  storedCourses(req, res, next) {

    Promise.all([Course.find({}), Course.countDocuments({ deleted: true })])
      .then(([courses, deleteCount]) => {
        res.render('me/stored-courses', {
          deleteCount,
          courses: mongooseToObjects(courses)
        })
      })
      .catch(next);

    // Course.find({})
    //   .then((courses) =>
    //     res.render('me/stored-courses', {
    //       courses: mongooseToObjects(courses),
    //     }),
    //   )
    //   .catch(next);
  }
  
  trashCourses(req, res, next) {
    // findDeleted là hàm của mongoose-delete lấy các bản ghi đã xoá mềm
    Course.findWithDeleted({ deleted: true })
      .then((courses) => {
        res.render('me/trash-courses', {
          courses: mongooseToObjects(courses),
        })
      })
      .catch(next);
  }
}

export default new MeController();
