// content.js

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

							/* Variable name formatting */

							//Team Name
							visitingTeamStats["Team_Name"] = visitingTeamStats["Team_Name"].slice(0, visitingTeamStats["Team_Name"].indexOf("(") - 1);
							homeTeamStats["Team_Name"] = homeTeamStats["Team_Name"].slice(0, homeTeamStats["Team_Name"].indexOf("(") - 1);

							//By Penalty
							if(homeTeamStats["By Penalty"] == "")	homeTeamStats["By Penalty"] = 0;
							if(visitingTeamStats["By Penalty"] == "")	visitingTeamStats["By Penalty"] = 0;

							//Third Down Efficiency
							//homeTeamStats["Third Down Efficiency"] = homeTeamStats["Third Down Efficiency"].slice(homeTeamStats["Third Down Efficiency"].indexOf("-") + 1, homeTeamStats["Third Down Efficiency"].length - 2).parseInt();
							//visitingTeamStats["Third Down Efficiency"] = visitingTeamStats["Third Down Efficiency"].slice(visitingTeamStats["Third Down Efficiency"].indexOf("-") + 1, visitingTeamStats["Third Down Efficiency"].length - 2).parseInt();
							homeTeamStats["Third Down Efficiency"] = parsePercentage(homeTeamStats, "Third Down Efficiency");
							visitingTeamStats["Third Down Efficiency"] = parsePercentage(visitingTeamStats, "Third Down Efficiency");

							//Fourth Down Efficiency
							homeTeamStats["Fourth Down Efficiency"] = parsePercentage(homeTeamStats, "Fourth Down Efficiency");
							visitingTeamStats["Fourth Down Efficiency"] = parsePercentage(visitingTeamStats, "Fourth Down Efficiency");

							//Goal to Go Efficiency
							homeTeamStats["Goal to Go Efficiency"] = parsePercentage(homeTeamStats, "Goal to Go Efficiency");
							visitingTeamStats["Goal to Go Efficiency"] = parsePercentage(visitingTeamStats, "Goal to Go Efficiency");

							//Red Zone Efficiency
							homeTeamStats["Red Zone Efficiency"] = parsePercentage(homeTeamStats, "Red Zone Efficiency");
							visitingTeamStats["Red Zone Efficiency"] = parsePercentage(visitingTeamStats, "Red Zone Efficiency");

							//Time of Possession
							homeTeamStats["Time of Possession"] = parseTimeToSeconds(homeTeamStats, "Time of Possession");
							visitingTeamStats["Time of Possession"] = parseTimeToSeconds(visitingTeamStats, "Time of Possession");

							//Fumbles Lost
							homeTeamStats["Fumbles Lost"] = parseSecondValue(homeTeamStats, "Fumbles (Number-Lost)");
							visitingTeamStats["Fumbles Lost"] = parseSecondValue(visitingTeamStats, "Fumbles (Number-Lost)");


							//Field Goals
							homeTeamStats["Net Field Goals"] = parseFirstValue(homeTeamStats, "Field Goals (Made-Attempted)");
							visitingTeamStats["Net Field Goals"] = parseFirstValue(visitingTeamStats, "Field Goals (Made-Attempted)");

							//Field Goal Efficiency
							homeTeamStats["Field Goal Efficiency"] = parseMadeAttempted(homeTeamStats, "Field Goals (Made-Attempted)");
							visitingTeamStats["Field Goal Efficiency"] = parseMadeAttempted(visitingTeamStats, "Field Goals (Made-Attempted)");


							//Total Return Yardage = Total Return Yardage (excludes Kickoffs) + Kickoff Return Yards
							homeTeamStats["Total Return Yardage"] = homeTeamStats["Total Return Yardage (excludes Kickoffs)"] + parseSecondValue(homeTeamStats, "Kickoff Returns (Number-Yards)");
							visitingTeamStats["Total Return Yardage"] = homeTeamStats["Total Return Yardage (excludes Kickoffs)"] + parseSecondValue(visitingTeamStats, "Kickoff Returns (Number-Yards)");

							//Extra Points Made
							homeTeamStats["Net Extra Points"] = parseFirstValue(homeTeamStats, "Kicking (Made-Attempted)") + (2 * parseFirstValue(homeTeamStats, "Two Point Conversions (Made-Attempted)"));
							visitingTeamStats["Net Extra Points"] = parseFirstValue(visitingTeamStats, "Kicking (Made-Attempted)") + (2 * parseFirstValue(visitingTeamStats, "Two Point Conversions (Made-Attempted)"));

							//Extra Point Efficiency
							homeTeamStats["Extra Point Efficiency"] = parseMadeAttempted(homeTeamStats, "Extra Points (Made-Attempted)");
							visitingTeamStats["Extra Point Efficiency"] = parseMadeAttempted(visitingTeamStats, "Extra Points (Made-Attempted)");

							//Times Sacked
							homeTeamStats["Times Sacked"] = parseFirstValue(homeTeamStats, "Times Sacked (Number-Yards)");
							visitingTeamStats["Times Sacked"] = parseFirstValue(visitingTeamStats, "Times Sacked (Number-Yards)");

							//Penalty Yards
							homeTeamStats["Penalty Yards"] = parseSecondValue(homeTeamStats, "Penalties(Number-Yards)");
							visitingTeamStats["Penalty Yards"] = parseSecondValue(visitingTeamStats, "Penalties(Number-Yards)");


							//Interceptions
							homeTeamStats["Interceptions"] = parseLastValue(homeTeamStats, "Pass Comp-Att-Int"); 
							visitingTeamStats["Interceptions"] = parseLastValue(visitingTeamStats, "Pass Comp-Att-Int");

							//Passing Efficiency
							homeTeamStats["Passing Efficiency"] = parseFirstValue(homeTeamStats, "Pass Comp-Att-Int") / parseSecondValue(homeTeamStats, "Pass Comp-Att-Int"); ; 
							visitingTeamStats["Passing Efficiency"] = parseFirstValue(visitingTeamStats, "Pass Comp-Att-Int") / parseSecondValue(visitingTeamStats, "Pass Comp-Att-Int"); ;

							//Tackled for a Loss (Number-Yards)




							//Pack the data inside a JSON and send it to the server
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

		
		function parsePercentage(data, name)
		{
			return data[name].slice(data[name].indexOf("-") + 1, data[name].length - 2).parseInt() / 100.0;
		}

		function parseMadeAttempted(data, name)
		{
			var x = data[name].slice(0, data[name].indexOf("-") - 1).parseInt();
			var y = data[name].slice(data[name].indexOf("-") + 1, data[name].length - 1).parseInt();

			return x / y;
		}

		function parseFirstValue(data, name)
		{
			var x = data[name].slice(0, data[name].indexOf("-") - 1).parseInt();
			return x;
		}

		function parseSecondValue(data, name)
		{
			var y = -1000;

			if(data[name].indexOf("-") == data[name].lastIndexOf("-"))
			{
				 y = data[name].slice(data[name].indexOf("-") + 1, data[name].length - 1).parseInt();
			}
			else
			{
				y = data[name].slice(data[name].indexOf("-") + 1, data[name].lastIndexOf("-") + 1).parseInt();
			}

			return y;
		}

		function parseLastValue(data, name)
		{
			var z = data[name].slice(data[name].lastIndexOf("-") + 1, data[name].length - 1).parseInt();
			return z;
		}

		function parseTimeToSeconds(data, name)
		{
			var minutes = data[name].slice(0, data[name].indexOf(":")).parseInt();
			var seconds = data[name].slice(data[name].indexOf(":") + 1, data[name].length - 1).parseInt();

			return (minutes * 60) + seconds;
		}

		/*
			Team Name - trim score ---- CHECK
			By Penalty - add zero if empty string ---- CHECK


			Fourth Down Efficiency - floating point value (currently x/y - z%) ---- CHECK
			Third Down Efficiency - fp value ---- CHECK
			Goal to Go Efficiency - "x/y - z%" ---- CHECK 
			Red Zone Efficiency - "x/y - z%" ---- CHECK

			Extra Points (Made-Attempted) - "x - y"	--- CHECK
				Two-Point conversions (made-attempted) - "x - y" --- CHECK
				Kicking (made-attempted) - "x - y" --- CHECK
			
			Field Goals (made-attempted) - "x - y" --- CHECK

			Times Sacked (number - yards) - "x - y" --- CHECK

			Pass Comp-Att-Int - "x - y - z" --- CHECK
			Punts (number - average) - "x - y" 
			
			Penalties(number-yards) - "x - y" --- CHECK
			
			FGs Blocked - PATs Blocked - "x - y" -> Descartar

			Punt Returns (Number - Yards) - "x - y" 
			"Kickoffs (Number-In End Zone-Touchbacks)" -> Descartar
			Kickoff Returns (number-yards) - "x - y" --- CHECK
			Fumbles (number-lost) - "x - y"	--- CHECK
			
			Time of Possession - "xy:az" ///Pasar a segundos 	--- CHECK
			


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