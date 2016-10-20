// content.js

//En el "by penalty" usan un blank space en lugar de un 0. Corregir ese pedo.

$(document).ready(function(){

	//Página Box Score
	var playerData = $("table.gc-team-leaders-table").find("td");
	var teamData = $("table.gc-box-score-table").find("td");

	if(playerData != null && teamData != null && playerData.length > 0 && teamData.length > 0)
	{
		console.log("****************************** Player Data: ******************************");

		for(i = 0; i < playerData.length; i++)
		{
			console.log(playerData[i].textContent);
		}

		console.log("****************************** Team Data: ******************************");

		for(i = 0; i < teamData.length; i++)
		{	
			console.log(teamData[i].textContent);
		}

		/*
		chrome.tabs.getCurrent(function(tab) {
		    chrome.tabs.remove(tab.id, function() { });
		});
		*/
	}
	else
	{
		console.log("Not the boxscore site.");
	}

});

chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if( request.message === "clicked_browser_action" ) 
	    {

	    	//Página Scores
	    	var gameHref = $("a.game-center-link");

	    	console.log("Browser action clicked!");

	    	if(gameHref != null && gameHref.length > 0)		
	    	{
	    		for(i = 0; i < gameHref.length; i++)
	    		{
		    		//Página Preview
		    		var boxScoreHref = "#tab=analyze&analyze=boxscore";
		    		var previewUrl = gameHref[i].href;
		    		var boxScoreUrl = previewUrl + boxScoreHref;

		    		console.log("boxScoreUrl: " + boxScoreUrl);

		    		chrome.runtime.sendMessage({"message": "open_new_tab", "url": boxScoreUrl});
		    	}
	    	}
	    	else
	    	{
	    		console.log("Not the scores site.");
	    	}
	    } 
	  }
	);


