
var cells = new Array();
var row = 4;
var column = 4;

function start()
{
	for (i=0 ;i < row; i++) 
	{
 		cells[i] = new Array();
 		for (j = 0; j < column; j++) 
 		{
 			cells[i][j] = new cell();
 			cells[i][j].setRowCoord(i);
 			cells[i][j].setColCoord(j);
 		}
	}

	//Set mines
	setRandomMines(4);

	//Scan 
	scanNeighbour();

}



function jogada(row,col)
{
	cells[row][col].setIsOpened(true);
	alert(cells[row][col].toString());

	if(cells[row][col].getHasMine() == true)
	{
		document.getElementById(row+""+col).value="X";
		alert("PERDEU OTARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!%!&¨$@&*%!#&!¨#(!¨#*&!%@&¨!$#!¨*#%¨!@%!&¨@GHBDJKSAHCD(A¨RD)*¨@#");
	}
	else
		document.getElementById(row+""+col).value = cells[row][col].getNeighbourMineCount();
}


function setRandomMines(numberOfMines)
{
	var actualMines = 0;

	do
	{
		var row = randomNumber();
		var col = randomNumber();

		alert(row+ " "+ col);

		if(cells[row][col].getHasMine() == false)
			cells[row][col].setHasMine(true); 
		
		actualMines++;

	}
	while(actualMines < numberOfMines);
}

function randomNumber()
{
	return Math.floor(Math.random() * 4);
}

function scanNeighbour()
{
	for (colCoord=0 ; colCoord < column; colCoord++) 
	{
 		for (rowCoord = 0; rowCoord < row; rowCoord++) 
 		{
 			if(colCoord > 0 && rowCoord > 0 && cells[colCoord-1][rowCoord-1].getHasMine()==true)
 				cells[rowCoord][colCoord].addNeighbourMineCount(); 	

			if(colCoord > 0 && cells[colCoord-1][rowCoord].getHasMine()==true)
				cells[rowCoord][colCoord].addNeighbourMineCount();

			if(colCoord > 0 && rowCoord < (row-1) && cells[colCoord-1][rowCoord+1].getHasMine()==true)
				cells[rowCoord][colCoord].addNeighbourMineCount();

			if(rowCoord > 0 && cells[colCoord][rowCoord-1].getHasMine()==true)
				cells[rowCoord][colCoord].addNeighbourMineCount();

			if(rowCoord < (row-1) && cells[colCoord][rowCoord+1].getHasMine()==true)
				cells[rowCoord][colCoord].addNeighbourMineCount();

			if(colCoord < (column-1) && rowCoord > 0 && cells[colCoord+1][rowCoord-1].getHasMine()==true)
				cells[rowCoord][colCoord].addNeighbourMineCount();

			if(colCoord < (column-1) && cells[colCoord+1][rowCoord].getHasMine()==true)
				cells[rowCoord][colCoord].addNeighbourMineCount();

			if(colCoord < (column-1) && rowCoord < (row-1) && cells[colCoord+1][rowCoord+1].getHasMine()==true)
				cells[rowCoord][colCoord].addNeighbourMineCount();
 		}
	}






}