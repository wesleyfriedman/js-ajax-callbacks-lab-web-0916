function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

$('#search').on('click', function(event) {
  searchRepositories()
})

function searchRepositories(searchTerms) {
  var searchTerms = $('input#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      const template = Handlebars.compile($('#results-template').html())

      $('#results').html(template(data))
    }).fail(error => {
      displayError()
    })
}

function showCommits(el) {

  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
      const template = Handlebars.compile($('#commits-template').html())
      $('#details').html(template(data))
    }).fail(error => {
      displayError()
    })
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function handlebarsSetup() {
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}
