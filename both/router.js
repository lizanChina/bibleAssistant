Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }
});

Router.map(function() {
  this.route('menu', {path: '/'});//向右滑动弹出菜单
  this.route('chaptersMenu', {path: '/chapters'});


  this.route('serach', {path: '/serach'});
  this.route('bookMarks', {path: '/bookMarks'});
  this.route('download', {path: '/download'});
  this.route('systemSettings', {path: '/systemSettings'});
  this.route('dedication', {path: '/dedication'});
  
});
