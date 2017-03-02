export class Piece
{
	private value: number;
	
	constructor(val: number)
	{
		this.value = val;
	}
	
	getValue() : number
	{
		return this.value;
	}
	
	setValue(newVal: number) : void
	{
		this.value = newVal;
	}
}