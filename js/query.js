var Query = function (username) {
  this.username = username.trim();
};

Query.prototype.usernameURL = function () {
  return 'https://api.github.com/users/' + this.username;
};

Query.prototype.reposURL = function () {
  return this.usernameURL() + '/repos?sort=updated';
};

module.exports = Query;
