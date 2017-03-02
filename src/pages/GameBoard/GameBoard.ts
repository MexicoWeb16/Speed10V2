import { Piece } from "./Piece.ts";

export class GameBoard
{
	private pieces: any[];
	private time: number;
	private currentScore: number;
	private readonly SUM: number = 10;
	
	constructor(seconds: number)
	{
		this.pieces = [];
		
		for(let i = 0; i < 16; i++)
		{
			this.pieces.push(new Piece(Math.floor(Math.random() * 9 + 1)));
		}
		
		this.time = seconds;
		this.currentScore = 0;
	}
	
	getPieces() : any[]
	{
		return this.pieces;
	}
	
	addPieces(index1: number, index2: number) : boolean
	{
		if(this.pieces[index1].getValue() + this.pieces[index2].getValue() == this.SUM && index1 != index2)
		{
			this.currentScore += 10;
			let temp = Math.floor(Math.random() * this.pieces.length);
			
			while(temp == index1)
				temp = Math.floor(Math.random() * this.pieces.length);
			this.pieces[index1].setValue(10 - this.pieces[temp].getValue());
			
			this.pieces[index2].setValue(Math.floor(Math.random() * 9 + 1));
			
			return true;
		}
		
		return false;
	}

	getTime() : number
	{
		return this.time;
	}
	
	getTimeDisplay() : string
	{
		let output = "Time Left: \n" + this.time;
			
		return output;
	}

	subtractTime() : void
	{
		this.time--;
	}
	
	switchDifficulty(seconds:number) : void
	{
		this.time = seconds;
	}
	
	newBoard(seconds: number): void
	{
		for(var i = 0; i < this.pieces.length; i++)
			this.pieces[i].setValue(Math.floor(Math.random() * 9 + 1));
		this.time = seconds;
		this.currentScore = 0;
	}
}