define(['ojs/ojcore', 'knockout', 'MovieFactory', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton'],
function(oj, ko, MovieFactory) {

  var viewModel = {
    movieCollection: MovieFactory.createMovieCollection(),
    dataSource: ko.observable(),

    // Called each time the view is shown to the user.
    initialize: function() {
      this.dataSource(new oj.CollectionTableDataSource(this.movieCollection));
      this.movieCollection.fetch();
    },

    viewMovie: function(movieId) {
      oj.Router.rootInstance.store(movieId);
      oj.Router.rootInstance.go("viewMovie");
    },

    deleteMovie: function(parent, movieId) {
      parent.movieCollection.get(movieId).destroy();
    },

    addMovie: function() {
      oj.Router.rootInstance.go("addMovie");
    }
  };

  return viewModel;
});
