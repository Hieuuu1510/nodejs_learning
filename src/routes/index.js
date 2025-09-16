import newRouter from './news.js';

function route(app) {
  // router
  app.get('/', (req, res) => {
    res.render('home'        );
  });

  app.use('/news', newRouter);

  app.get('/views', (req, res) => {
    res.render('view');
  });

  app.get('/search', (req, res) => {
    console.log(req.query);
    res.render('search');
  });

  app.post( '/search', (req, res) => {
    console.log(req.body       );
    res.send('');
  });
}

export default route;
