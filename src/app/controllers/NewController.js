class newController {
  getAllNews(req, res) {
    res.render('news');
  }

  slugNews(req, res) {
    res.send('slug');
  }
}

export default new newController();
