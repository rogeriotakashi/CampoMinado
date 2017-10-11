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
        
        // Create table
		createTable();
		
		// Create cells
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

		// Set mines
		setRandomMines(params.qtyBombs);

		// Scan 
		scanNeighbour();


		
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

    for (var i = 0; i < params.height; i++) {
        tableRow = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = tableRow.insertCell(-1);
            cell.innerHTML = "<input type='button' id='row"+i+"col"+j+"' value=' ' onclick='jogada("+i+","+j+")'/>";
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
	if(cells[row][col].getHasMine() == true)
	{
		document.getElementById("row"+row+"col"+col).value="X";
		document.getElementById("row"+row+"col"+col).className = "Mine";
		alert("Game Over");
	}
	else
	{
		document.getElementById("row"+row+"col"+col).value = cells[row][col].getNeighbourMineCount();
		document.getElementById("row"+row+"col"+col).className = getNumberColor(cells[row][col].getNeighbourMineCount());
		
	}
}


function setRandomMines(numberOfMines)
{
	var actualMines = 0;
	
	while(actualMines < numberOfMines)
	{
		var row = randomNumber();
		var col = randomNumber();

		if(cells[row][col].getHasMine() == false)
			cells[row][col].setHasMine(true); 
		
		actualMines++;

	}
	
}

function randomNumber()
{
	return Math.floor(Math.random() * params.width);
}

function scanNeighbour()
{
	for (var i=0 ; i < col; i++) 
	{
 		for (var j = 0; j < row; j++) 
 		{
 			if(i > 0 && j > 0 && cells[i-1][j-1].getHasMine()==true)
 				cells[i][j].addNeighbourMineCount(); 	
			if(i > 0 && cells[i-1][j].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(i > 0 && j < (row-1) && cells[i-1][j+1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(j > 0 && cells[i][j-1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(j < (row-1) && cells[i][j+1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(i < (col-1) && j > 0 && cells[i+1][j-1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(i < (col-1) && cells[i+1][j].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(i < (col-1) && j < (row-1) && cells[i+1][j+1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
 		}
	}

}

function revealAll()
{
	for (var i = 0; i < params.width; i++) 
	{
        for (var j = 0; j < params.height; j++) 
        {
        	if(cells[i][j].getHasMine() == false)
        	{
            	document.getElementById("row"+i+"col"+j).value = cells[i][j].getNeighbourMineCount();
            	document.getElementById("row"+i+"col"+j).className = getNumberColor(cells[i][j].getNeighbourMineCount());
            	
        	}
            else
            {
            	document.getElementById("row"+i+"col"+j).value = 'X';
            	document.getElementById("row"+i+"col"+j).className = "Mine";
            }
        }
    }
}

function getNumberColor(NeighbourMineCount)
{
	return "Number"+NeighbourMineCount;
}


