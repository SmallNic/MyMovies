$(document).ready(function(){

  console.log("jQuery is running")

  var userInput = $("#userInput")
  var submit = $("#submit")

  var key = "xt6mvwt4htbpv3pjr6hyjtmd"
  var movieList;

  // http://data.tmsapi.com/v1.1/movies/showings?startDate=2015-06-17&zip=20011&api_key=xt6mvwt4htbpv3pjr6hyjtmd
  // http://data.tmsapi.com/v1.1/movies/showings?startDate=2015-5-17&zip=20011&api_key=xt6mvwt4htbpv3pjr6hyjtmd

  submit.on("click",function(){
    event.preventDefault()

    var zip = userInput.val()
    var dateObj = new Date()
    var date = dateObj.getDate()
    date =  (date < 10) ? "0"+date : date
    var month = dateObj.getMonth() + 1
    month =  (month < 10) ? "0"+month : month
    var year = dateObj.getFullYear()
    var startDate = year+"-"+month+"-"+date

    requestURI = "http://data.tmsapi.com/v1.1/movies/showings?startDate="+startDate+"&zip="+zip+"&api_key="+key

    // $.ajax({
    //   url: requestURI,
    //   type: "GET",
    //   dataType: "json" //jsonp wraps the whole response in a callback function. You're not lpoading data but getting a reference
    // }).done(function(response){
    //   // console.log("response", response)
    //   movieList = response
    //   sendToResults(movieList)
    // }).fail(function(){
    //   console.log("AJAX request was not successful")
    // }).always(function(){
    //   console.log("This always happens!")
    // })

  })

  var sendToResults = function (movieList){
    var parameters = {movieList:movieList}
    // console.log(movieList)
    $.get('/results', parameters)
  }

})
