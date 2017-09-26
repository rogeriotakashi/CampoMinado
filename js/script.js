params = new Object();

function startGame() {
    var check = checkDimensions();
    var check2 = checkNumBombs();
    myForm = document.forms["game-parameters"];

    if (check && check2) {
        params.name = myForm["name"].value;
        params.qtyBombs = myForm["qtyBombs"].value;
        createTable();
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
