var moveCounter = 0;
var turnCounter = 0;
var endX;
var endY;
var spriteStartX;
var spriteStartY;
var done = 0;
var currentCmd = null;

// Fill board with squares
// Fill board with squares
function placeSquares() {
	var board = '<svg width="500" height="500" id="svg">';
	var gray = "#FFF5FF";
	var pink = "#FFCCFF"
	var color;
	var otherColor;
	for (var i = 0; i < 10; i++) {
		if (i%2 == 0) {
			color = pink;
		} else {
			color = gray;
		}
		for (var j = 0; j < 10; j++) {
			if (color == pink) {
				color = gray;
			} else {
				color = pink;
			}
			y = i * 50;
			x = j * 50;
			board += '<rect width="50" height="50" x="'+x+'" y="'+y+'" style="fill:'+color+';stroke-width:1;stroke:#CCC" />';
		}
	}
	board += '</svg>';
	document.getElementById("board").innerHTML = board;
}

	// Place sprite initially
	function placeSprite(x, y) {
		if (!x && !y) {
			// Generate random location for sprite 
			var x = Math.floor((Math.random() * 5) + 1) * 50 + 10;
			var y = Math.floor((Math.random() * 5) + 1) * 50 + 10;
		}

		$( "#spriteImg" ).css( "left", x );
		$( "#spriteImg" ).css( "top", y );

		spriteStartX = x;
		spriteStartY = y;

		//document.getElementById("svg").innerHTML += '<rect id="sprite" width="30" height="30" x="'+x+'" y="'+y+'" style="fill:#00cdce;stroke-width:1;stroke:#CCC" />';
	}

	function turnSprite() {

	}

	function placeEndPoint(x, y) {
		if (!x && !y) {
			// Generate random location for end point
			var x = Math.floor((Math.random() * 8) + 1) * 50 + 10;
			var y = Math.floor((Math.random() * 8) + 1) * 50 + 10;
		}

		endX = x;
		endY = y;

		document.getElementById("svg").innerHTML += '<rect id="sprite1" width="30" height="30" x="'+x+'" y="'+y+'" style="fill:#000;stroke-width:1;stroke:#CCC" />';
	}


	function checkIfDone() {
		console.log("Comparing "+endX+" "+endY);

		// get sprite location
		var move = $( "#spriteImg" ).css( "left" );
		var spriteX = parseInt(move.substring(0, move.length - 2));
		spriteX -= 475;

		move = $( "#spriteImg" ).css( "top" );
		var spriteY = parseInt(move.substring(0, move.length - 2));
		spriteY -= 75;

		console.log("to "+spriteX+" "+spriteY);

		if (spriteX == endX && spriteY == endY) {
			//alert("Good job, you did it!!");
			done = 1;
		}

		if (spriteX == endX) {
			console.log("At right x location");
		}
		if (spriteY == endY) {
			console.log("At right y location");
		}

	}
	function moveRight() {
		console.log("move right called");
		var move = $( "#spriteImg" ).css( "left" );
		var go = parseInt(move.substring(0, move.length - 2));
		go += 50;
		$( "#spriteImg" ).css( "left", go );
		//document.getElementById("spriteImg").x.baseVal.value += 50;
		// var move = $( "#spriteImg" ).css( "left" );
		// move = move.substring(0, move.length - 2);
		// var go = parseInt(move);
		// go += 50;
		// go += 'px';
		// console.log(go);
		// $("#spriteImg").animate({left: go});

		// resolve();
	
	}
	function moveLeft()
	{
		//document.getElementById("sprite").x.baseVal.value -= 50;
		var move = $( "#spriteImg" ).css( "left" );
		var go = parseInt(move.substring(0, move.length - 2));
		go -= 50;
		$( "#spriteImg" ).css( "left", go );
		
	}
	function moveUp()
	{
		//document.getElementById("sprite").y.baseVal.value -= 50;
		var move = $( "#spriteImg" ).css( "top" );
		var go = parseInt(move.substring(0, move.length - 2));
		go -= 50;
		$( "#spriteImg" ).css( "top", go );
	}
	function moveDown()
	{
		//document.getElementById("sprite").y.baseVal.value += 50;
		var move = $( "#spriteImg" ).css( "top" );
		var go = parseInt(move.substring(0, move.length - 2));
		go += 50;
		$( "#spriteImg" ).css( "top", go );
	}
	function getCommands() {
		//console.log(document.getElementById("sortable").html);
		//var cmds = document.getElementById("sortable").getElementsByClassName("ui-state-default")[0].getElementsByClassName("fa")[0].className;
		var cmds = document.getElementById("sortable").getElementsByClassName("ui-state-default");
		for (var i = 0; i < cmds.length; i++) {
			var die = 0;	// flag to mark if execution should stop because end of for loop was not specified

			// See if this is start of for loop, and if so, find end and execute all commands in between
			if (cmds[i].innerHTML == 'for') {
				console.log('for');
				var iterations;

				// See if next element is a number
				if (cmds[i+1].className == "ui-state-default num") {
					var num = cmds[i+1].innerHTML;
					console.log(num);
					iterations = num;
					console.log("Iterations: "+iterations)
					//continue;
				} else {
					console.log("Error: there is not a number after 'for' key.")
					die = 1;
					break;
				}

				var start = i+2;
				var end = 0;
				// Find 'end for' command
				for (var j = i+2; j < cmds.length; j++) {
					console.log("Checking: "+cmds[j].innerHTML);

					if (cmds[j].innerHTML == 'end for') {
						console.log('found end for');
						end = j - 1;
						console.log("J: "+j);
						console.log("Loop from "+start+" to "+end);
						i = j;	// set i so that for loop will resume execution at end of for loop section 
						break;
					}

					

					var className = cmds[j].getElementsByClassName("fa")[0].className;
					getCommand(className);
				}

				if (end == 0) {
					alert("Error: you forgot to add an 'end for' tag with your for loop!");
					die = 1;
					break;
				}

				// Execute all values in between
				console.log("Executing "+iterations+" times");
				for (var x = 0; x < iterations; x++) {
					for (var a = start; a <= end; a++) {
						var className = cmds[a].getElementsByClassName("fa")[0].className;
						getCommand(className);
					}
				}
				continue;
			}

			if (die) {
				break;
			}

			// If this is end of for loop, throw error
			if (cmds[i].innerHTML == 'end for') {
				alert('Error: Can\'t use an "end for" command without a "for" command!');
				break;
			}

			// If a number is by itself in middle of code, throw error
			if(cmds[i].className == "ui-state-default num") {
				var num = cmds[i].innerHTML;
				alert("Error! Can't have number by itself");
				break;
			}

			// Get commands defined by an icon
			var className = cmds[i].getElementsByClassName("fa")[0].className;
			//console.log("className: "+className);

			getCommand(className);
		}

		//checkIfDone();
		if (done) {
			alert("Good job, you did it!!");
		} else {
			// See if on ending square
			var move = $( "#spriteImg" ).css( "left" );
			var spriteX = parseInt(move.substring(0, move.length - 2));
			spriteX -= 475;

			move = $( "#spriteImg" ).css( "top" );
			var spriteY = parseInt(move.substring(0, move.length - 2));
			spriteY -= 75;

			console.log("to "+spriteX+" "+spriteY);

			if (spriteX == endX && spriteY == endY) {
				alert("You made it to the square with the clue, but you forgot to use a smiley icon to pick up the clue! Press 'Reset' and try again.");
			} else {
				alert("Whoops, you didn't end up on the square with the clue. Press 'Reset' and try again!");
			}
		}
		
	}

	function getCommand(className) {
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
			case 'fa fa-fw fa-smile-o':
				console.log("finish");
				checkIfDone();
				break;
		}
	}

	function generateMove() {

		var moveDiv = '<div id="move-command-' + moveCounter + '" class="draggable code ui-widget-content ui-draggable ui-draggable-handle" onmouseup="placeMoveCmd()">' +
						  '<p>Move</p>' +
						'</div>';

		moveCounter++;
		document.getElementById("commands").innerHTML += moveDiv;
	}

	function deleteCmd(element) {
		var left = $( element ).css( "left" );
		left = left.substring(0, left.length - 2);
		console.log(left);
		if (left > 400) {
			console.log("Delete");
			var parent = document.getElementById("sortable");
			parent.removeChild(element);
		}
	}

	function notify(notice) {
		alert(notice);
	}


	placeSquares();
	//placeSprite();
	// placeEndPoint();

	// $("runBtn").click(function(){
	//     $("#spriteImg").animate({left: '250px'});
	// }); 


	$("#runBtn").click(function() {
		getCommands();
	});

	$("#resetBtn").click(function() {
		$( "#spriteImg" ).css( "left", spriteStartX );
		$( "#spriteImg" ).css( "top", spriteStartY );
	});

	$("#turnBtn").click(function() {
		turnSprite();
	});
	$(".cmd-box").click(function() {
		switch (this.id) {
			case 'right-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default" onmouseup="deleteCmd(this)"><i class="fa fa-fw fa-arrow-circle-o-right"></i></li>';
				break;
			case 'down-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default" onmouseup="deleteCmd(this)"><i class="fa fa-fw fa-arrow-circle-o-down"></i></li>';
				break;
			case 'left-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default" onmouseup="deleteCmd(this)"><i class="fa fa-fw fa-arrow-circle-o-left"></i></li>';
				break;
			case 'up-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default" onmouseup="deleteCmd(this)"><i class="fa fa-fw fa-arrow-circle-o-up"></i></li>';
				break;
			case 'finish-cmd':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default" onmouseup="deleteCmd(this)"><i class="fa fa-fw fa-smile-o"></i></li>';
				break;
			case 'for':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default" onmouseup="deleteCmd(this)" style="font-size: 26px; padding-top:10px">for</li>';
				break;
			case 'end-for':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default" onmouseup="deleteCmd(this)" style="font-size: 19px">end for</li>';
				break;
			case 'num-1':
				document.getElementById("sortable").innerHTML += '<li class="ui-state-default num" onmouseup="deleteCmd(this)">7</li>';
				break;
		}
		
	});

