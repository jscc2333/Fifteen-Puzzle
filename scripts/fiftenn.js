$(function(){
	var img = $("#puzzleGrid").find("img");
	var used = new Array();
	for(var i = 0; i < img.length-1; i++){
		do{
			num = Math.ceil(Math.random()*8);
		}while($.inArray(num,used) != -1);
		// console.log(img[i]);
		img[i].src = "images/icon/"+num+".ico";
		img[i].alt = num;
		used.push(num);
	}
});
$(function(){
	$table = $("#puzzleGrid");
	cells = $table.find("td");
	for(var i =0;i<cells.length;i++){
		var cell = cells[i];
		// console.log(cell);
		cell.onclick = cellClick;
	}
});
function cellClick(){
	// alert("!");
	var currentRow = 0;
	var currentCol = 0;
	var testRow = 0;
	var testCol = 0;
	var testCell;
	if(cellIsEmpty($(this))){
		// alert("touched a empty cell");
		return;
	}else{
		currentRow = $(this).parent("tr").index()+1;
	 	currentCol = $(this).index()+1;
		// console.log(currentRow+" "+currentCol);
	}
	if(currentRow > 1){
		testRow = currentRow - 1;
		testCell = getCell(testRow,currentCol);
		// console.log(testCell);
		if(cellIsEmpty(testCell)){
			swapTiles($(this),testCell);
			return;
		}
	}
	if(currentRow < 3){
		testRow = currentRow + 1 ;
		testCell = getCell(testRow,currentCol);
		// console.log(testCell);
		if(cellIsEmpty(testCell)){
			swapTiles($(this),testCell);
			return;
		}
	}
	if(currentCol > 1){
		testCol = currentCol - 1;
		testCell = getCell(currentRow,testCol);
		// console.log(testCell);
		if(cellIsEmpty(testCell)){
			swapTiles($(this),testCell);
			return;
		}
	}
	if(currentCol < 3){
		testCol = currentCol + 1;
		testCell = getCell(currentRow,testCol);
		// console.log(testCell);

		if(cellIsEmpty(testCell)){
			swapTiles($(this),testCell);
			return;
		}
	}
	return;
}
function cellIsEmpty(cell){
	var img = cell.children("img");
	if(img.attr("alt") === "empty"){
		return true;
	}else{
		return false;
	}
}
function getCell(row,col){
	// return 
	var test =	$("#puzzleGrid").find('tr').eq(row-1)
						.children('td').eq(col-1);
	// console.log(test);
	return test;
}
function swapTiles(selectedCell,destinationCell){
	// console.log(selectedCell+"111 "+destinationCell);
	var selectedImg = selectedCell.children('img')
	var destinationImg = destinationCell.children('img');
	selectedCell.append(destinationImg);
	destinationCell.append(selectedImg);
	if(puzzleIsComplete()){
		alert("congratulations");
	}	
}
function puzzleIsComplete(){
	var sortString = "";
	var img = $("#puzzleGrid").find("img");
	for(var i = 0; i < img.length - 1; i++){
		sortString += img[i].alt;
	}
	// console.log(sortString);
	if(sortString == "12345678"){
		return true;
	}
	return false;
}
