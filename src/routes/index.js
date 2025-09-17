import newRouter from './news.js';
import siteRouter from './site.js';
import courseRouter from './courses.js';
import meRouter from './me.js';

function route(app) {
  // router
  app.use('/', siteRouter);
  app.use('/news', newRouter);
  app.use('/courses', courseRouter);
  app.use('/me', meRouter);
}

export default route;
