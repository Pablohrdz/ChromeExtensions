// content.js


//'run_at' : 'document_end'
//En el "by penalty" usan un blank space en lugar de un 0. Corregir ese pedo.

//$(document).ready(function(){
	//$(window).on('load', function() {

		//Página Box Score

		var mainInterval = setInterval(function()
			{
						//var playerData = $("table.gc-team-leaders-table").find("td");
						var teamData = $("table.gc-box-score-table").find("td");
						//var gameHref = $("a.game-center-link");

						console.log(teamData);
						//console.log(gameHref	);

						/*
						while(teamData == null )
						{
							if(gameHref != null && gameHref.length > 0)	break;
							sleep(5000);
							teamData = $("table.gc-box-score-table").find("td");
						}
						*/

						if(teamData != null && teamData.length > 0)
						{
							/*
							console.log("****************************** Player Data: ******************************");

							for(i = 0; i < playerData.length; i++)
							{
								console.log(playerData[i].textContent);
							}
							*/


							console.log("****************************** Team Data: ******************************");

							for(i = 0; i < teamData.length; i++)
							{	
								console.log(teamData[i].textContent);
							}

							var visitingTeamStats = {};
							var homeTeamStats = {};

							visitingTeamStats["Team_Name"] = teamData[0].textContent;
							homeTeamStats["Team_Name"] = teamData[2].textContent;

							visitingTeamStats["Home"] = false;
							homeTeamStats["Home"] = true;

							for(i = 3, j = 0; i < teamData.length; i++)
							{
								if( typeof teamData[i] != undefined && teamData[i].textContent.length > 0)
								{
									console.log(teamData[i].textContent);

									//visiting team stats
									if(j % 2 === 0)
									{
										visitingTeamStats[teamData[i].textContent] = teamData[i + 1].textContent;
									}

									//home team stats
									else
									{
										homeTeamStats[teamData[i].textContent] = teamData[i + 1].textContent;
									}

									j++;
									i++;
								}
							}

							console.log("****************************** Results Visiting Team ******************************");
							console.log(visitingTeamStats);

							console.log("****************************** Results Home Team ******************************");
							console.log(homeTeamStats);


							var data = {};

							data["home_team"] = homeTeamStats;
							data["visiting_team"] = visitingTeamStats; 

								//Enviar datos al servidor
								//TODO: Cerrar la tab cuando haya respuesta del servidor
								/*
							    $.get("http://127.0.0.1:8000", data, function (response) {
							        console.log("We posted and the server responded!");
							        console.log(response);

							        
							        chrome.tabs.getCurrent(function(tab) {
							            chrome.tabs.remove(tab.id, function() { console.log("Tab closed! LOL, JK!"); });
							        });
							        
							    });
							    */

							    $.ajax("http://127.0.0.1:8000", {
							        dataType: "text",
							        data: data,
							        success: function() {
							            console.log("winning.");
							            window.close();
							        },
							        error: function(jqXHR, textStatus, errorThrown) {
							            console.log(textStatus); //error logging
							            window.close();
							        }
							    });

							    /*
							    $.get("http://127.0.0.1:8000", visitingTeamStats, function (response) {
							        console.log("We posted and the server responded!");
							        console.log(response);
							    });
							    /*

							/*
							chrome.tabs.getCurrent(function(tab) {
							    chrome.tabs.remove(tab.id, function() { });
							});
							*/

							clearInterval(mainInterval);

						}
						else
						{
							console.log("Not the boxscore site.");
						}

					//});
				//});
			}, 3000);

		

		/*
			Team Name - trim score
			By Penalty - add zero if empty string
			Fourth Down Efficiency - floating point value (currently x/y - z%)
			Third Down Efficiency - fp value
			Times Sacked (number - yards) - "x - y"
			Pass Comp-Att-Int - "x - y - z"
			Punts (number - average) - "x - y"
			Extra Points (Made-Attempted) - "x - y"
			Penalties(number-yards) - "x - y"
			Red Zone Efficiency - "x/y"
			Kickoff Returns (number-yards) - "x - y"
			FGs Blocked - PATs Blocked - "x - y"
			Punt Returns (Number - Yards) - "x - y"
			"Kickoffs (Number-In End Zone-Touchbacks)" - quitar esta mamada
			Kickoff Returns (number-yards) - "x - y" ///Anadir las yardas al total y quitar esta variable
			Fumbles (number-lost) - "x - y"
			Two-Point conversions (made-attempted) - "x - y"
			Kicking (made-attempted) - "x - y"
			Field Goals (made-attempted) - "x - y"
			Time of Possession - "xy:az" ///Pasar a segundos
			Goal to Go Efficiency - "x/y - z%"


		*/

chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if( request.message === "clicked_browser_action" ) 
	    {
	    	var count = 0;

	    	//Página Scores
	    	var gameHref = $("a.game-center-link");

	    	console.log("Browser action clicked!");

	    	if(gameHref != null && gameHref.length > 0)		
	    	{

	    		var intervalId = setInterval(function()
	    			{	
	    				if(count < 16)
	    				{
	    					//Página Preview
	    					var boxScoreHref = "#tab=analyze&analyze=boxscore";
	    					var previewUrl = gameHref[count].href;
	    					var boxScoreUrl = previewUrl + boxScoreHref;

	    					console.log("boxScoreUrl: " + boxScoreUrl);

	    					chrome.runtime.sendMessage({"message": "open_new_tab", "url": boxScoreUrl});
	    				}
	    				else
	    				{
	    					clearInterval(intervalId);
	    				}

	    				count++;

	    			}, 2000);
	    		/*
	    		//for(i = 0; i < gameHref.length; i++)
	    		for(i = 0; i < gameHref.length; i++)
	    		{
		    		//Página Preview
		    		var boxScoreHref = "#tab=analyze&analyze=boxscore";
		    		var previewUrl = gameHref[i].href;
		    		var boxScoreUrl = previewUrl + boxScoreHref;

		    		console.log("boxScoreUrl: " + boxScoreUrl);

		    		chrome.runtime.sendMessage({"message": "open_new_tab", "url": boxScoreUrl});

		    		//sleep(5000);
		    	}
		    	*/
	    	}
	    	else
	    	{
	    		console.log("Not the scores site.");
	    	}
	    } 
	  }
	);

//Piñado de https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
