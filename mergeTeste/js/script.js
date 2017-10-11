params = new Object();

// Logic - Rogerio
var cells = new Array();
var row = 0;
var col = 0;



function startGame() {
    var check = checkDimensions();
    var check2 = checkNumBombs();
    myForm = document.forms["game-parameters"];

    if (check && check2) {
        params.name = myForm["name"].value;
        params.qtyBombs = myForm["qtyBombs"].value;
        createTable();
		
		
		// Logic - Rogerio
		row = params.width;
		col = params.height;
		
		
		for (var i=0 ;i < row; i++) 
		{
			cells[i] = new Array();
			for (var j = 0; j < col; j++) 
			{
				cells[i][j] = new cell();
				cells[i][j].setRowCoord(i);
				cells[i][j].setColCoord(j);
			}
		}

		//Set mines
		setRandomMines(params.qtyBombs);
/*
		//Scan 
		scanNeighbour();
		*/
    }

    return false;
}


function checkDimensions() {
    myForm = document.forms["game-parameters"];
    params.width = myForm["width"].value;
    params.height = myForm["height"].value;

    if ( params.width < 6 || params.height < 6 || params.width > 50 || params.height > 50) {
        alert("I told you asshole, the dimension must be at least 6 x 6 and maximum 50 x 50."); 
        return false;
    } else {
        return true;
    }
}

function createTable() {
    var table = document.getElementById("campo-minado");
    var columnCount = params.width;

    for (var i = 1; i < params.height; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = "0";
        }
    }
}

function checkNumBombs() {
    myForm = document.forms["game-parameters"];
    params.qtyBombs = myForm["qtyBombs"].value;

    if (params.qtyBombs > (params.width*params.height)) {
        alert("Error! The number of bombs can't be greater than (width * heith)");
        return false;
    } else if (params.qtyBombs < 0) {
        alert("Error! The number of bombs can't be negative!");
        return false;
    } else {
        return true;
    }

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

		alert("row"+row+"col"+col);
		if(cells[row][col].getHasMine() == false)
			cells[row][col].setHasMine(true); 
		
		actualMines++;

	}
	while(actualMines < numberOfMines);
}

function randomNumber()
{
	return Math.floor(Math.random() * params.width);
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
