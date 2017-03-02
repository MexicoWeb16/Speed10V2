import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameBoard } from "../GameBoard/GameBoard.ts";
import { EndPage } from "../end/end";
import * as globals from "./global";
import $ from "jquery";

/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
	static board: any;
	static time : number = 0;
	static selectedAmount : number;
	static selectedPieces: any;
	static highScoreString: string;
	static highScore : number;
	static timer : any;
	static navigator : any;

	static pieceDisplays : any;
	static scoreDisplay : any;
	static highScoreDisplay: any;
	static timeDisplay : any;

	constructor(public navCtrl: NavController, private navParams: NavParams) 
	{
		GamePage.time = navParams.get("time");
		GamePage.board = new GameBoard(GamePage.time);
		GamePage.navigator = navCtrl;
	}
	
	ionViewDidLoad()
	{
		globals.changeCD(document.getElementById("countdown"));
		GamePage.highScoreString = "";
		GamePage.selectedAmount = 0;
		GamePage.selectedPieces = [];

		GamePage.pieceDisplays = document.getElementsByClassName("valueHolder");
		GamePage.timeDisplay = document.getElementById("timeDisplay");
		GamePage.scoreDisplay = document.getElementById("scoreDisplay");
		GamePage.highScoreDisplay = document.getElementById("highScoreDisplay");
		
		for(var i = 0; i < GamePage.board.getPieces().length; i++)
			GamePage.pieceDisplays[i].innerHTML = GamePage.board.getPieces()[i].getValue();
		
		
		GamePage.checkHighScore();
		GamePage.highScoreDisplay.innerHTML = GamePage.highScore;
		GamePage.timeDisplay.innerHTML = GamePage.board.getTimeDisplay();
		let countdownTime = 3;
		let countdownTimer = setInterval(function()
		{
			if(countdownTime > 0)
			{
				globals.countdownDisplay.innerHTML = countdownTime;
				countdownTime--;
			}
			else
			{
				globals.countdownDisplay.innerHTML = "GO";
			}
			
		}, 1000);

		let countdown = setTimeout(function()
		{
			clearInterval(countdownTimer);
			globals.countdownDisplay.style.display = "none";
			document.getElementById("countdownBackground").style.zIndex = "-1";
			document.getElementById("countdownBackground").style.display = "none";
			GamePage.timer = setInterval(GamePage.timeFunction, 1000);
			clearTimeout(this);
		}, 5000);
	}
	
	static checkHighScore() : void
	{
		switch(GamePage.time)
		{
			case 16: GamePage.highScoreString += "Sanic";
				break;
			case 31: GamePage.highScoreString += "Fast";
				break;
			case 61: GamePage.highScoreString += "Slow";
				break;
			case 121: GamePage.highScoreString += "Time";
				break;
		}
		
		if(localStorage.getItem(GamePage.highScoreString) != null)
			GamePage.highScore = parseInt(localStorage.getItem(GamePage.highScoreString));
		else
			GamePage.highScore = 0;
	}
	
	checkForMatch(index) : void
	{
		GamePage.selectedAmount++;
		GamePage.selectedPieces.push(index);
		GamePage.pieceDisplays[index].parentElement.style.boxShadow = "0px 0px 10px #ffd700";
		
		if(GamePage.selectedAmount != 2)
			return;
		let isAMatch = GamePage.board.addPieces(GamePage.selectedPieces[0], GamePage.selectedPieces[1]);
		
		if(isAMatch == true)
		{
			GamePage.pieceDisplays[GamePage.selectedPieces[0]].parentElement.style.boxShadow = "none";
			GamePage.pieceDisplays[GamePage.selectedPieces[1]].parentElement.style.boxShadow = "none";
			$(GamePage.pieceDisplays[GamePage.selectedPieces[0]].parentElement).hide(500);
			$(GamePage.pieceDisplays[GamePage.selectedPieces[1]].parentElement).hide(500);
			GamePage.pieceDisplays[GamePage.selectedPieces[0]].innerHTML = GamePage.board.pieces[GamePage.selectedPieces[0]].value;
			GamePage.pieceDisplays[GamePage.selectedPieces[1]].innerHTML = GamePage.board.pieces[GamePage.selectedPieces[1]].value;
			GamePage.scoreDisplay.innerHTML = GamePage.board.currentScore;
			$(GamePage.pieceDisplays[GamePage.selectedPieces[0]].parentElement).show(500);
			$(GamePage.pieceDisplays[GamePage.selectedPieces[1]].parentElement).show(500);
		}
		else
		{
			GamePage.pieceDisplays[GamePage.selectedPieces[0]].parentElement.style.boxShadow = "none";
			GamePage.pieceDisplays[GamePage.selectedPieces[1]].parentElement.style.boxShadow = "none";
			GamePage.shake(GamePage.pieceDisplays[GamePage.selectedPieces[0]].parentElement);
			GamePage.shake(GamePage.pieceDisplays[GamePage.selectedPieces[1]].parentElement);
		}

		GamePage.selectedAmount = 0;
		GamePage.selectedPieces.length = 0;
	}

	static timeFunction()
	{
		GamePage.board.subtractTime();
		if(GamePage.board.getTime() > 0)
			GamePage.timeDisplay.innerHTML = GamePage.board.getTimeDisplay();
		else
		{
			clearInterval(GamePage.timer);
			GamePage.timeDisplay.innerHTML = "Out of time";
			GamePage.endOfGame();
		}
	}

	static endOfGame()
	{
		GamePage.navigator.push(EndPage, {hScore : GamePage.highScore, fScore : GamePage.board.currentScore, hString : GamePage.highScoreString});
	}

	private static shake(el)
	{
		let interval = 100;                                                                                                 
		let distance = 10;                                                                                                  
		let times = 4;                                                                                                      

		$(el).css('position','relative');                                                                                  

		for(var i = 0; i < (times + 1); i++)
		{                                                                              
			$(el).animate(
			{ 
				left:((i % 2 == 0 ? distance : distance * -1))
			}, interval);                                   
		}                                                                                                              

		$(el).animate({ left: 0},interval);
	}
}
