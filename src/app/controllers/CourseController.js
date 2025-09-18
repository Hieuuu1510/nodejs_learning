import { mongooseToObject } from '../../util/mongoose.js';
import Course from '../modules/Course.js';

class courseController {
  slug(req, res, next) {
    Course.findOne({
      slug: req.params.slug,
    })
      .then((course) => {
        res.render('courses/slug', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  create(req, res, next) {
    res.render('courses/create');
  }

  postStore(req, res, next) {
    const formatData = {...req.body};
    formatData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

    const course = new Course(formatData);
    course
      .save()
      .then(() => res.redirect(`/`))
      .catch((error) => {});
  }

  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render('courses/edit', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  updateCourse = async (req, res, next) => {

    try {
      const course = await Course.findById(req.params.id);

      Object.assign(course, req.body);

      await course.save();

      res.redirect('/me/stored-courses');
    } catch (error) {
      next(error);
    }
    // Course.updateOne({ _id: req.params.id }, req.body)
    //   .then(() => res.redirect('/me/stored-courses'))
    //   .catch(next);
  };

  deleteCourse(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => {
        res.redirect('/me/stored-courses');
      })
      .catch(next);
  }

  restoreCourse(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => {
        res.redirect('/me/trash-courses');
      })
      .catch(next);
  }

  restoreForce(req, res, next) {
    Course.deleteOne({ _id: req.params.id})
      .then(() => {
        res.redirect('/me/trash-courses');
      })
      .catch(next);
  }

  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('/me/stored-courses'))
          .catch(next);
        break;
      default:
    }
  }
}

export default new courseController();
