var moveCounter = 0;
var turnCounter = 0;

// Fill board with squares
function placeSquares() {
	var board = '<svg width="500" height="500" id="svg">';
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			y = i * 50;
			x = j * 50;
			board += '<rect width="50" height="50" x="'+x+'" y="'+y+'" style="fill:#fff;stroke-width:1;stroke:#CCC" />';
		}
	}
	board += '</svg>';
	document.getElementById("board").innerHTML = board;
}

	// Place sprite initially
	function placeSprite() {
		// Generate random location for sprite 
		var x = Math.floor((Math.random() * 5) + 1) * 50 + 10;
		var y = Math.floor((Math.random() * 5) + 1) * 50 + 10;
		document.getElementById("svg").innerHTML += '<rect id="sprite" width="30" height="30" x="'+x+'" y="'+y+'" style="fill:#00cdce;stroke-width:1;stroke:#CCC" />';
	}

	function turnSprite() {

	}

	function placeEndPoint() {
		// Generate random location for end point
		var x = Math.floor((Math.random() * 8) + 1) * 50 + 10;
		var y = Math.floor((Math.random() * 8) + 1) * 50 + 10;
		document.getElementById("svg").innerHTML += '<rect id="sprite1" width="30" height="30" x="'+x+'" y="'+y+'" style="fill:#000;stroke-width:1;stroke:#CCC" />';
	}

	function placeMoveCmd() {
		// var loc = document.getElementById('move-command').style.top;
		// loc = loc.substring(0, loc.length - 2);

		// var x = '<div id="move-command-' + moveCounter + '" class="draggable code ui-widget-content" onmouseup="findLoc()">' +
		// 		  '<p>move</p>' +
		// 		'</div>';



		// switch (loc) {
		// 	case '60':
		// 		document.getElementById("line1").innerHTML = "move";
		// 		document.getElementById("move-command").style.top = 0;
		// 		break;
		// 	default:
		// 		console.log("nothing")
		// }
	}

	function moveSprite() {
		document.getElementById("sprite").x.baseVal.value += 50;
	}
	function moveRight() {
		document.getElementById("sprite").x.baseVal.value += 50;
	
	}
	function moveLeft()
	{
		document.getElementById("sprite").x.baseVal.value -= 50;
		
	}
	function moveUp()
	{
		document.getElementById("sprite").y.baseVal.value -= 50;
	}
	function moveDown()
	{
		document.getElementById("sprite").y.baseVal.value += 50;
	}
	function getCommands() {
		//console.log(document.getElementById("sortable").html);
		//var cmds = document.getElementById("sortable").getElementsByClassName("ui-state-default")[0].getElementsByClassName("fa")[0].className;
		var cmds = document.getElementById("sortable").getElementsByClassName("ui-state-default");
		for (var i = 0; i < cmds.length; i++) {
			var className = cmds[i].getElementsByClassName("fa")[0].className;
			//console.log("className: "+className);
			switch (className) {
				case 'fa fa-fw fa-arrow-circle-o-right':
					console.log("right");
					moveRight();
					break;
				case  'fa fa-fw fa-arrow-circle-o-down':
					console.log("down");
					moveDown();
					break;
				case  'fa fa-fw fa-arrow-circle-o-left':
					console.log("left");
					moveLeft();
					break;
				case  'fa fa-fw fa-arrow-circle-o-up':
					console.log("up");
					moveUp();
					break;
			}
		}
		
	}

	function generateMove() {

		var moveDiv = '<div id="move-command-' + moveCounter + '" class="draggable code ui-widget-content ui-draggable ui-draggable-handle" onmouseup="placeMoveCmd()">' +
						  '<p>Move</p>' +
						'</div>';

		moveCounter++;
		document.getElementById("commands").innerHTML += moveDiv;
	}


	placeSquares();
	placeSprite();
	placeEndPoint();


	$("#runBtn").click(function() {
		getCommands();
	});

	$("#moveBtn").click(function() {
		generateMove();
	});

	$("#turnBtn").click(function() {
		turnSprite();
	});

	$(".cmd-box").click(function() {
		switch (this.id) {
			case 'right-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default"><i class="fa fa-fw fa-arrow-circle-o-right"></i></li>';
				break;
			case 'down-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default"><i class="fa fa-fw fa-arrow-circle-o-down"></i></li>';
				break;
			case 'left-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default"><i class="fa fa-fw fa-arrow-circle-o-left"></i></li>';
				break;
			case 'up-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default"><i class="fa fa-fw fa-arrow-circle-o-up"></i></li>';
				break;
		}
		
	});

