var Query = require('./../js/query.js');

var buildRepoContent = function(query, repo) {
  $('.dynamic_content').append(
    '<div class="repo col-sm-4">' +
      '<a href=https://github.com/' + query.username + '/' + repo.name + '>' +
      '<span class=repo_name>' + repo.name + '</span></a>' +
      '<ul>' +
        '<li>' + repo.language + '</li>' +
        '<li>Created: ' + moment(repo.created_at).format('lll') + '</li>' +
        '<li>Updated: ' + moment(repo.updated_at).format('lll') + '</li>' +
      '</li>' +
    '</div>'
  );
};

var buildNagContent = function(username, useremail) {
  $('.dynamic_content').append(
    "<div class='nag'>" +
      "<p>Looks like " + username + "'s last commit was more than an hour " +
      "ago! Tell " + username + " to <span class='keyboard'>git chop chop</span> with this handy <a id='nag-o-gram'>mailto link</a>!" +
    "</div>"
  );
  $('#nag-o-gram').prop('href', 'mailto:' + useremail + '?subject=git chop chop&body=Write more code pls&cc=thebossof' + username + '@phb.com');
};

$(document).ready(function(){

  $('#input_form').on('submit', function(event) {
    event.preventDefault();
    $('.dynamic_content').empty();
    var input = $('#input_username').val();
    var query = new Query(input);

    $.get(query.usernameURL(), function(response) {
      if (response.email) query.email = response.email;
      if (response.name) {
        $('.dynamic_content').append(
          '<h1 id="github_fullname">' + response.name + '</h1>'
        );
      }
      $('.dynamic_content').append('<h2 id="github_username">' + query.username + '</h2>');
    }).fail(function() {
      $('.dynamic_content').append('<h2>No GitHub profile found for that username.<h2>');
    });

    $.get(query.reposURL(), function(response) {
      var lastUpdate = moment(response[0].updated_at);
      if (lastUpdate.isBefore(moment().subtract(1, 'hours')) && query.email) {
        buildNagContent(query.username, query.email);
      }
      for (var i = 0; i < response.length; i++) {
        buildRepoContent(query, response[i]);
      }
    }).fail(function() {
      $('.dynamic_content').append('<h2>No repositories found for that username.<h2>');
    });

    $('#input_username').val("");

  });

});
