var moveCounter = 0;
var turnCounter = 0;

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
	// function placeSprite() {
	// 	// Generate random location for sprite 
	// 	var x = Math.floor((Math.random() * 5) + 1) * 50 + 10;
	// 	var y = Math.floor((Math.random() * 5) + 1) * 50 + 10;
	// 	document.getElementById("svg").innerHTML += '<rect id="sprite" width="30" height="30" x="'+x+'" y="'+y+'" style="fill:#00cdce;stroke-width:1;stroke:#CCC" />';
	// }

	function turnSprite() {

	}

	function placeEndPoint() {
		// Generate random location for end point
		var x = Math.floor((Math.random() * 8) + 1) * 50 + 10;
		var y = Math.floor((Math.random() * 8) + 1) * 50 + 10;
		document.getElementById("svg").innerHTML += '<rect id="sprite1" width="30" height="30" x="'+x+'" y="'+y+'" style="fill:#000;stroke-width:1;stroke:#CCC" />';
	}


	function moveSprite() {
		document.getElementById("sprite").x.baseVal.value += 50;
	}
	function moveRight() {
		console.log("move right called");
		//document.getElementById("sprite").x.baseVal.value += 50;
		var move = $( "#spriteImg" ).css( "left" );
		move = move.substring(0, move.length - 2);
		var go = parseInt(move);
		go += 50;
		go += 'px';
		console.log(go);
		$("#spriteImg").animate({left: go});
	
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
					console.log("Error: end of for loop wasn't found.");
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
				console.log('Error: end for');
				break;
			}

			// If a number is by itself in middle of code, throw error
			if(cmds[i].className == "ui-state-default num") {
				var num = cmds[i].innerHTML;
				console.log("Error! Can't have number by itself");
				break;
			}

			// Get commands defined by an icon
			var className = cmds[i].getElementsByClassName("fa")[0].className;
			//console.log("className: "+className);
			getCommand(className);
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
				var promise = new Promise(function(resolve, reject) {

				});
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


	placeSquares();
	//placeSprite();
	placeEndPoint();

	// $("runBtn").click(function(){
	//     $("#spriteImg").animate({left: '250px'});
	// }); 


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

