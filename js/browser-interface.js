var Query = require('./../js/query.js');

var buildRepoContent = function(query, repo) {
  $('.dynamic_content').append(
    '<div class="repo col-sm-4">' +
      '<a href=https://github.com/' + query.username + '/' + repo.name + '>' +
      '<span class=repo_name>' + repo.name + '</span></a>' +
      '<ul>' +
        '<li>' + repo.language + '</li>' +
        '<li>Created: ' + repo.created_at + '</li>' +
        '<li>Last Updated: ' + repo.updated_at + '</li>' +
      '</li>' +
    '</div>'
  );
};

$(document).ready(function(){

  $('#input_form').on('submit', function(event) {
    event.preventDefault();
    $('.dynamic_content').empty();
    var input = $('#input_username').val().trim();
    var query = new Query(input);

    $.get(query.usernameURL(), function(response) {
      if (response.name) {
        $('.dynamic_content').append(
          '<h1>' + response.name + '</h1>'
        );
      }
      $('.dynamic_content').append('<h2>' + query.username + '<h2>');
    }).fail(function() {
      $('.dynamic_content').append('<h2>No GitHub profile found for that username.<h2>');
    });

    $.get(query.reposURL(), function(response) {
      for (var i = 0; i < response.length; i++) {
        buildRepoContent(query, response[i]);
      }
    }).fail(function() {
      $('.dynamic_content').append('<h2>No repositories found for that username.<h2>');
    });

  });

});
