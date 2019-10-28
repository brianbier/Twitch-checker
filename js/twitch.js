var twitch = (function (){
  var twitchData , $image,$search;

  function getTwitchTv(channel){
    $.ajax({
      headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
      url: 'https://api.twitch.tv/kraken/streams/'+channel,
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data){
      displayData(data)
    });
  }
  function loadData(twitchData){
    for(var i = 0; i < twitchData.length; ++i){
      getTwitchTv(twitchData[i]);
    }
  }
  function displayData(data){
    if(data.stream === null){
      return;
    }
    var html = "<li class='collection-item avatar' >"
    html += "<img src='"+data.stream.channel.logo +"' class='circle'>"
    html += "<span class='title'>" + data.stream.channel.display_name + "</span>"
    html += "<p>Game:"+ data.stream.channel.game + " <br> <a href='"+data.stream.channel.url+"' target='_blank'> Visit Channel</a></p>"
    html += "<a href='"+data.stream.channel.url+"' target='_blank' class='secondary-content'><i class='material-icons'>play_arrow</i></a>"
    html += "</li>"
    $image.append(html);
  }

  function displaySingle(data){
    if(data.responseText || data.stream == null){
      var html ="<ul class='collection' rel='twitch-search-js'>"
      html += "<li class='collection-item avatar' >"
      html += "<p>Channel Not found</p>"
      html += "</li></ul>"
      var $twitch = $("[rel='twitch-search-js']")
      $twitch.html(html)
    }
    var html ="<ul class='collection' rel='twitch-search-js'>"
    html += "<li class='collection-item avatar' >"
    html += "<img src='"+data.stream.channel.logo +"' class='circle'>"
    html += "<span class='title'>" + data.stream.channel.display_name + "</span>"
    html += "<p>Game:"+ data.stream.channel.game + " <br> <a href='"+data.stream.channel.url+"' target='_blank'> Visit Channel</a></p>"
    html += "<a href='"+data.stream.channel.url+"' target='_blank' class='secondary-content'><i class='material-icons'>play_arrow</i></a>"
    html += "</li></ul>"
    var $twitch = $("[rel='twitch-search-js']")
    $twitch.html(html)
    
  }

  function getSingleTwitch(channel){
    $.ajax({
      headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
      url: 'https://api.twitch.tv/kraken/streams/'+channel,
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data){
      displaySingle(data)
    }).error(function(response){
      displaySingle(response)
    });
  }
  function searchQuery(){
    var channel = $(this).parent().find('#search').val()
    getSingleTwitch(channel);
  }

  function printText(){
    alert('hello')
  }
  function init(){
    twitchDataArray = ["ESL_SC2", "OgamingSC2","habathcx","Stray228","dollshin0324","Arquel","FatbossTV", "RobotCaleb", "noobs2ninjas","Bikeman","WSHand","PwnographicOfficial","Asmongold","ESL_Overwatch","EULCS1"];
    loadData(twitchDataArray);
    $image = $("[rel='twitch-channel-js']")
    $search = $("button").on('click',searchQuery);
    
    $keypress = $("input").keyup(function(){
      var key = $(this).val();
       $("[rel='key-type-js']").html(key)
    })
  }

  return {
    init: init
  }
})();

$(document).ready(twitch.init);
