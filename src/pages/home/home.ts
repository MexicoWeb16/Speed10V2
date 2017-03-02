import { Component, trigger, state, style, transition, animate, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GamePage } from "../game/game";
import { Network }  from "ionic-native";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
	trigger("fade", [
		state("visible", style({opacity: 2, zIndex: 3})),
		state("invisible", style({opacity: 0, zIndex: -1})),
		transition("invisible<=>visible", animate("1000ms linear"))
	])
  ]
})

export class HomePage {
	fadeState :String = "invisible";
	online : boolean;
	
	private connectSub: any;
	private disconnectSub: any;
	
	constructor(public navCtrl: NavController, private ngZone: NgZone, private platform: Platform)
	{
		this.platform.ready().then(x => 
		{
			this.disconnectSub = Network.onDisconnect().subscribe(x =>
			{
				this.ngZone.run(() => 
				{
					this.onOffline();
				});
			});

			this.connectSub = Network.onConnect().subscribe(x =>
			{
				this.ngZone.run(() =>
				{
					this.onOnline();
				});
			});

			this.online = (Network.type !== "none");
		});
	}
	
	startGame(gameTime)
	{
		this.navCtrl.push(GamePage, {time: gameTime});
	}
	
	showLeaderboard()
	{	
		if(!this.online)
		{
			document.getElementById("errorMessage").style.display = "block";
			document.getElementById("board").style.display = "none";
		}
		else
		{
			document.getElementById("errorMessage").style.display = "none";
			document.getElementById("board").style.display = "block";
		}
		document.getElementById("titleScreen").style.opacity = "0.2";
		document.getElementById("titleScreen").style.pointerEvents = "none";
		this.fadeState = "visible";
	}
	
	hideLeaderboard()
	{
		this.fadeState = "invisible";
		document.getElementById("titleScreen").style.opacity = "1";
		document.getElementById("titleScreen").style.pointerEvents = "auto";
	}
	
	onOnline()
	{
		if(Network.type !== "none")
			this.online = true;
	}
	
	onOffline()
	{
		if(Network.type == "none")
			this.online = false;
	}
}
