import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the End page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-end',
  templateUrl: 'end.html'
})
export class EndPage {

  static score : any;
  static highScore : number;
  static gameMode : string;
  static navigator : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    EndPage.score = navParams.get("fScore");
    EndPage.highScore = navParams.get("hScore");
    EndPage.gameMode = navParams.get("hString");
    EndPage.navigator = navCtrl;
  }

  ionViewDidLoad() 
  {
    let highScoreDisplay = document.getElementById("highScore");
    let scoreDisplay = document.getElementById("finalScore");

    this.highScoreCheck();

    highScoreDisplay.innerHTML = EndPage.highScore + "";
    scoreDisplay.innerHTML = EndPage.score + "";
  }

  highScoreCheck()
  {
    if(EndPage.score > EndPage.highScore)
    {
      EndPage.highScore = EndPage.score;
      localStorage.setItem(EndPage.gameMode, EndPage.score);
    }

  }

  newGame()
  {
    EndPage.navigator.popToRoot();
  }

}
