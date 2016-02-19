var Query = require('./../js/query.js');

$(document).ready(function(){

  $('#input_form').on('submit', function(event) {
    event.preventDefault();
    $('.dynamic_content').empty();
    var input = $('#input_username').val().trim();
    var query = new Query(input);

    $.get(query.usernameURL(), function(response) {
      $('.dynamic_content').append('<h1>' + query.username + '<h1>');
      if (response.name) {
        $('.dynamic_content').append(
          '<h2>' + response.name + '</h2>'
        );
      }
    });

    $.get(query.reposURL(), function(response) {
      for (var i = 0; i < response.length; i++) {
        console.log(response[i]);
        $('.dynamic_content').append(
          '<div class="repo col-sm-4">' +
            '<a href=https://github.com/' + 'daneden' + '/' + response[i].name + '>' +
            '<span class=repo_name>' + response[i].name + '</span></a>' +
            '<ul>' +
              '<li>' + response[i].language + '</li>' +
              '<li>Created: ' + response[i].created_at + '</li>' +
              '<li>Last Updated: ' + response[i].updated_at + '</li>' +
            '</li>' +
          '</div>'
        );
      }
    });

  });

});
