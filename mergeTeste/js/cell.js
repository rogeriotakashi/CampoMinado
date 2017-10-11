
function cell()
{
    //Default values
    var colCoord = 0;
    var rowCoord = 0;
    var isOpened = false;
    var hasFlag = false;
    var hasMine = false;
    var neighbourMineCount = 0;

   this.getColCoord = function()
   {
       return colCoord;
   };
   this.getRowCoord = function()
   {
       return rowCoord;
   };
   this.getIsOpened = function()
   {
       return isOpened;
   };
   this.getHasFlag = function()
   {
       return hasFlag;
   };
   this.getHasMine = function()
   {
       return hasMine;
   };
   this.getNeighbourMineCount = function()
   {
       return neighbourMineCount;
   };


   //Seteers
   this.setColCoord = function(col)
   {
       colCoord = col;
   };
   this.setRowCoord = function(row)
   {
       rowCoord = row;
   };
   this.setIsOpened = function(value)
   {
       isOpened = value;
   };
   this.setHasFlag = function(value)
   {
       hasFlag = value;
   };
   this.setHasMine = function(value)
   {
       hasMine = value;
   };
   this.addNeighbourMineCount = function()
   {
       neighbourMineCount++;
   };


   this.toString = function()
   {
      return "toString:"+rowCoord+" "+colCoord+" "+isOpened+" "+hasFlag+" "+hasMine+" "+neighbourMineCount;
   }

}

