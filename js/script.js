params = new Object();

// Logic - Rogerio
var cells = new Array();
var row = 0;
var col = 0;
var flagCounter = 0;
var counter = 0;
var minutes = 0;
var seconds = 0;
var gameAlreadyExist = false;




function startGame() {
	if(gameAlreadyExist)
		resetGame();

	gameAlreadyExist = true;

    var check = checkDimensions();
    var check2 = checkNumBombs();
    myForm = document.forms["game-parameters"];

    if (check && check2) {
        params.name = myForm["name"].value;
        params.qtyBombs = myForm["qtyBombs"].value;
        
        // Create table
		createTable();
		
		//Max lengths
		row = params.height;
		col = params.width;
		
			
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

		// Set Timer
		setTimer();
	
    }

    return false;
}

function resetGame()
{
	var table = document.getElementById("campo-minado");
	table.innerHTML = "";

	params = new Object();
	cells = new Array();
	row = 0;
	col = 0;
	flagCounter = 0;
	counter = 0;
	minutes = 0;
	seconds = 0;
	gameAlreadyExist = false;
}


function checkDimensions() {
    myForm = document.forms["game-parameters"];
    params.width = myForm["width"].value;
    params.height = myForm["height"].value;

    if ( params.width < 6 || params.height < 6 || params.width > 50 || params.height > 50) {
        alert("The dimension must be at least 6 x 6 and maximum 50 x 50."); 
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
            cell.innerHTML = "<input type='button' id='row"+i+"col"+j+"' value=' ' onclick='jogada("+i+","+j+")' oncontextmenu='putFlag("+i+","+j+"); return false;'/>";
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
		revealAll();
		endGame("Derrota");
	}
	else
	{
		if(cells[row][col].getNeighbourMineCount() != 0)
			openCell(cells[row][col]);
		else{
			openRecursive(cells[row][col]);
		}
	}

}

function putFlag(row,col)
{
	// Add Flag
	if(!cells[row][col].getHasFlag())
	{
		cells[row][col].setHasFlag(true);
		document.getElementById("row"+row+"col"+col).className = "Flag";
		
		if(cells[row][col].getHasMine())
		{
			flagCounter++;
			if(flagCounter == params.qtyBombs)
				endGame("Vitoria");
		}  
	}
	else // Remove Flag
	{
		cells[row][col].setHasFlag(false);
		document.getElementById("row"+row+"col"+col).className = ' ';
		if(cells[row][col].getHasMine())
			flagCounter--;
	}
}

function setTimer()
{
	minutes = 0;
	seconds = 0;

	counter= setInterval(function() {
		minutes = minutes + Math.floor(seconds / 60);
		seconds = (seconds % 60) + 1;		

		document.getElementById("demo").innerHTML = "Tempo de Jogo:"+ minutes + "m " + seconds + "s ";

	}, 1000);
}

function stopTimer()
{
	clearInterval(counter);
}

function getTotalOpenedFields(){
	var total = 0;

	for (var i=0 ; i < row; i++) 
	{
 		for (var j = 0; j < col; j++) 
 		{
 			if(cells[i][j].getIsOpened())
 				total++;
 		}
	}

	return total;
}

function setRandomMines(numberOfMines)
{
	var actualMines = 0;
	
	while(actualMines < numberOfMines)
	{
		var randomRow = randomNumber(row);
		var randomCol = randomNumber(col);

		if(cells[randomRow][randomCol].getHasMine() == false){
			cells[randomRow][randomCol].setHasMine(true); 
			actualMines++;
		}	

	}
	
}

function endGame(result){
	stopTimer();
	var totalOpenedFields = getTotalOpenedFields()

    var table = document.getElementById("historico");
    tableRow = table.insertRow(-1);
    var nome = tableRow.insertCell(-1);
    var dimensao = tableRow.insertCell(-1);
    var qtdeBomba = tableRow.insertCell(-1);
    var tempoGasto = tableRow.insertCell(-1);
    var numCelulaAberta = tableRow.insertCell(-1);
    var resultado = tableRow.insertCell(-1);


    nome.innerHTML = "<p>"+params.name+"</p>";
    dimensao.innerHTML = "<p>"+params.width+" x "+params.height+"</p>";
    qtdeBomba.innerHTML = "<p>"+params.qtyBombs+"</p>";
    tempoGasto.innerHTML = "<p>"+minutes+" minutos e "+seconds+" segundos</p>";
    numCelulaAberta.innerHTML = "<p>"+totalOpenedFields+"</p>";
    resultado.innerHTML = "<p>"+result+"</p>";
}

function randomNumber(maxRamdomNumber)
{
	return Math.floor(Math.random() * maxRamdomNumber);
}

function scanNeighbour()
{
	for (var i=0 ; i < row; i++) 
	{
 		for (var j = 0; j < col; j++) 
 		{
 			if(i > 0 && j > 0 && cells[i-1][j-1].getHasMine()==true)
 				cells[i][j].addNeighbourMineCount(); 	
			if(i > 0 && cells[i-1][j].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(i > 0 && j < (col-1) && cells[i-1][j+1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(j > 0 && cells[i][j-1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(j < (col-1) && cells[i][j+1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(i < (row-1) && j > 0 && cells[i+1][j-1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(i < (row-1) && cells[i+1][j].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
			if(i < (row-1) && j < (col-1) && cells[i+1][j+1].getHasMine()==true)
				cells[i][j].addNeighbourMineCount();
 		}
	}

}

function revealAll()
{
	for (var i = 0; i < row; i++) 
	{
        for (var j = 0; j < col; j++) 
        {
        	if(cells[i][j].getHasMine() == false)
        	{
        		if(cells[i][j].getNeighbourMineCount() != 0)
        			openCell(cells[i][j]);
            	else
            		openNoneCell(cells[i][j])
        	}
            else
            {
            	document.getElementById("row"+i+"col"+j).value = 'X';
            	document.getElementById("row"+i+"col"+j).className = "Mine";
            }
        }
    }
}

function recoverAll()
{
	for (var i = 0; i < row; i++) 
	{
        for (var j = 0; j < col; j++) 
        {
        	if(cells[i][j].getIsOpened() == false)
        	{
            	closeCell(cells[i][j]);
            }

            if(cells[i][j].getHasFlag())
            {
            	document.getElementById("row"+i+"col"+j).className = "Flag";
            }
        }
    }
}

function getNumberColor(NeighbourMineCount)
{
	return "Number"+NeighbourMineCount;
}


function openRecursive(cell){
	var cellRow = cell.getRowCoord();
	var cellCol = cell.getColCoord();
	openNoneCell(cell);

	if(cellRow > 0 && cellCol > 0)
		openNextRecursive(cells[cellRow - 1][cellCol - 1]);
	if(cellRow > 0)
    	openNextRecursive(cells[cellRow - 1][cellCol]);
    if(cellRow > 0 && cellCol < col-1)
    	openNextRecursive(cells[cellRow - 1][cellCol + 1]);
    if(cellRow < row-1)
    	openNextRecursive(cells[cellRow + 1][cellCol]);
    if(cellCol > 0)
    	openNextRecursive(cells[cellRow][cellCol - 1]);
    if(cellCol < col-1)
    	openNextRecursive(cells[cellRow][cellCol + 1]);
    if(cellRow < row-1 && cellCol > 0)
    	openNextRecursive(cells[cellRow + 1][cellCol - 1]);
    if(cellRow < row-1 && cellCol < col-1)
    	openNextRecursive(cells[cellRow + 1][cellCol + 1]);
}

function openNextRecursive(cell){
	var row = cell.getRowCoord();
	var col = cell.getColCoord();

    if (cell.getIsOpened() == true) return;


    if (cell.getNeighbourMineCount() == 0){
        cell.setIsOpened(true);
        openNoneCell(cell);
        openRecursive(cell);
    }
    else
    {    
	    cell.setIsOpened(true);
	    openCell(cell);
    }
}

function openCell(cell){
	document.getElementById("row"+cell.getRowCoord()+"col"+cell.getColCoord()).value = cell.getNeighbourMineCount();
    document.getElementById("row"+cell.getRowCoord()+"col"+cell.getColCoord()).className = getNumberColor(cell.getNeighbourMineCount());
}

function closeCell(cell)
{
	document.getElementById("row"+cell.getRowCoord()+"col"+cell.getColCoord()).value = ' ';
	document.getElementById("row"+cell.getRowCoord()+"col"+cell.getColCoord()).className = ' ';
}

function openNoneCell(cell){
    document.getElementById("row"+cell.getRowCoord()+"col"+cell.getColCoord()).className = getNumberColor(cell.getNeighbourMineCount());
}

