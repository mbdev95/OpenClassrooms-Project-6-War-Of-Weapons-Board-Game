// ----- JS Initialization

// ----- Creation of the game board -----
// Each square on the board is created with class, id, data-column, data-row, and a click event listener and rendered as HTML
let square = "";
  let board = document.getElementById('board');
  for (var y = 1; y < 11; y++) {
    for (var x = 1; x < 11; x++) {
      square += `<div class="grid-item" id="${x}-${y}" data-column=${x} data-row=${y} onClick="spaceClicked('${x}-${y}')" ></div>`;
    }
  }
board.innerHTML = square;

// ----- Placing players on the board -----
/* playerPlacement(num) -----
- The arguement passed through represents the number of players to be placed randomly on the board.
- The two players are randomly assigned a space to begin the game.
*/
const playerPlacement = (num) => {
  let x,y;
  for (let i = 0; i < num; i++) {
    x = Math.floor((Math.random() * 10) + 1);
    y = Math.floor((Math.random() * 10) + 1);
    if ( i < 1 ) {
      $(`#${x}-${y}`).append($("<img src='img/soldier.svg'>").addClass("player1Img")).addClass("player_1").addClass("active");
    } 
    if ( i === 1 && !$(`#${x}-${y}`).hasClass("player_1") && !$(`#${x + i}-${y}`).hasClass("player_1") && !$(`#${x - i}-${y}`).hasClass("player_1") && !$(`#${x}-${y + i}`).hasClass("player_1") && !$(`#${x}-${y - i}`).hasClass("player_1")) {
      $(`#${x}-${y}`).append($("<img src='img/warrior.svg'>").addClass("player2Img")).addClass("player_2");
    } else {
      i = 0;
    }
  }
}

// ----- Placing obstacles on the board -----
/* obstaclePlacement(num) -----
- The parameter represents the number of obstacles to be placed randomly on the board.
- The obstacles are placed on the board in random spaces not already occupied by another player or obstacle.
*/
const obstaclePlacement = (num) => {
  let x,y;
  for ( let i = 0; i < num; i++) {
    x = Math.floor((Math.random() * 10) + 1); 
    y = Math.floor((Math.random() * 10) + 1);
    if ( !$("#" + x + "-" + y).hasClass("obstacle") && !$("#" + x + "-" + y).hasClass("player_1") && !$("#" + x + "-" + y).hasClass("player_2") ) {
      $("#" + x + "-" + y).addClass("obstacle");
    } else {
      i -= 1;
    }
    if ( $(`#${x}-${y}`).hasClass("player_1") && $(`#${x + 1}-${y}`).hasClass("obstacle") && $(`#${x - 1}-${y}`).hasClass("obstacle") && $(`#${x}-${y + 1}`).hasClass("obstacle") && $(`#${x}-${y - 1}`).hasClass("obstacle") ) {
      i -= i;
    }
  }
}

// ----- Placing weapons on the board -----
/* weaponPlacement(num) -----
- The parameter represents the number of weapons.
- Each weapon is randomly assigned to a space that is not already occupied by a player or obstacle.
*/
const weaponPlacement = (num) => {
  let x,y;
  for ( let i = 0; i < num; i++) {
    x = Math.floor((Math.random() * 10) + 1); 
    y = Math.floor((Math.random() * 10) + 1);
    if ( !$("#" + x + "-" + y).hasClass("obstacle") && !$("#" + x + "-" + y).hasClass("player_1") && !$("#" + x + "-" + y).hasClass("player_2") && !$("#" + x + "-" + y).hasClass("weapon") ) {
      if ( i === 0 ) {
        $("#" + x + "-" + y).append($("<img src='img/hammer.svg'>").addClass("hammer")).addClass("weapon w-hammer");
      } else if ( i === 1 ) {
        $("#" + x + "-" + y).append($("<img src='img/crossbow.svg'>").addClass("crossbow")).addClass("weapon w-crossbow");
      } else if ( i === 2 ) {
        $("#" + x + "-" + y).append($("<img src='img/sword.svg'>").addClass("sword")).addClass("weapon w-sword");
      } else {
        $("#" + x + "-" + y).append($("<img src='img/gun.svg'>").addClass("gun")).addClass("weapon w-gun");
      }
    } else {
      i -= 1;
    }
  } 
}

// ----- Determines initial active spaces at JS initialization -----
const initialAvailableSpaces = () => {
  let activePlayerSpace;
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
      if ( $(`#${x}-${y}`).hasClass("player_1") ) {
        activePlayerSpace = $(`#${x}-${y}`);
      }
    }
  }
  const activePlayerColumn = +activePlayerSpace.attr("data-column");
  const activePlayerRow = +activePlayerSpace.attr("data-row");
  let obstacleColumnPlus;
  let obstacleColumnMinus;
  let obstacleRowPlus;
  let obstacleRowMinus;
  let player2ColumnPlus;
  let player2ColumnMinus;
  let player2RowPlus;
  let player2RowMinus;
  for ( let i = 1; i < 4; i++ ) {
    // 3 spaces to the right of player 1 are initially given the clickableSpace class and highlighted.
    $(`#${activePlayerColumn + i}-${activePlayerRow}`).addClass("clickableSpace");
    // Conditions to determine which spaces to the right of the player 1 will be given the class clickableSpace and thus highlighted if those spaces are not occupied by player 2 or an obstacle, or if those spaces are not on the other side of player 2 or an obstacle but still less then 4 spaces from the active player.
    if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).hasClass("player_2") || $(`#${activePlayerColumn + i}-${activePlayerRow}`).hasClass("obstacle") ) {
      $(`#${activePlayerColumn + i}-${activePlayerRow}`).removeClass("clickableSpace");
    }
    if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).hasClass("obstacle") ) {
      obstacleColumnPlus = +$(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("data-column");
    }
    if ( +$(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("data-column") > obstacleColumnPlus ) {
      $(`#${activePlayerColumn + i}-${activePlayerRow}`).removeClass("clickableSpace");
    }
    if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).hasClass("player_2") ) {
      player2ColumnPlus = +$(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("data-column");
    }
    if ( +$(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("data-column") > player2ColumnPlus ) {
      $(`#${activePlayerColumn + i}-${activePlayerRow}`).removeClass("clickableSpace");
    }
    // 3 spaces to the left of player 1 are initially given the clickableSpace class and highlighted.
    $(`#${activePlayerColumn - i}-${activePlayerRow}`).addClass("clickableSpace");
    // Conditions to determine which spaces to the left of the player 1 will be given the class clickableSpace and thus highlighted if those spaces are not occupied by player 2 or an obstacle, or if those spaces are not on the other side of player 2 or an obstacle but still less then 4 spaces from the active player.
    if ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).hasClass("player_2") || $(`#${activePlayerColumn - i}-${activePlayerRow}`).hasClass("obstacle") ) {
      $(`#${activePlayerColumn - i}-${activePlayerRow}`).removeClass("clickableSpace");
    }
    if ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).hasClass("obstacle") ) {
      obstacleColumnMinus = +$(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("data-column");
    }
    if ( +$(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("data-column") < obstacleColumnMinus ) {
      $(`#${activePlayerColumn - i}-${activePlayerRow}`).removeClass("clickableSpace");
    }
    if ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).hasClass("player_2") ) {
      player2ColumnMinus = +$(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("data-column");
    }
    if ( +$(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("data-column") < player2ColumnMinus ) {
      $(`#${activePlayerColumn - i}-${activePlayerRow}`).removeClass("clickableSpace");
    }
    // 3 spaces to the below player 1 are initially given the clickableSpace class and highlighted.
    $(`#${activePlayerColumn}-${activePlayerRow + i}`).addClass("clickableSpace");
    // Conditions to determine which spaces below player 1 will be given the class clickableSpace and thus highlighted if those spaces are not occupied by player 2 or an obstacle, or if those spaces are not on the other side of player 2 or an obstacle but still less then 4 spaces from the active player.
    if ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).hasClass("player_2") || $(`#${activePlayerColumn}-${activePlayerRow + i}`).hasClass("obstacle") ) {
      $(`#${activePlayerColumn}-${activePlayerRow + i}`).removeClass("clickableSpace");
    }
    if ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).hasClass("obstacle") ) {
      obstacleRowPlus = +$(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("data-row");
    }
    if ( +$(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("data-row") > obstacleRowPlus ) {
      $(`#${activePlayerColumn}-${activePlayerRow + i}`).removeClass("clickableSpace");
    }
    if ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).hasClass("player_2") ) {
      player2RowPlus = +$(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("data-row");
    }
    if ( +$(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("data-row") > player2RowPlus ) {
      $(`#${activePlayerColumn}-${activePlayerRow + i}`).removeClass("clickableSpace");
    }
    // 3 spaces above player 1 are initially given the clickableSpace class and highlighted.
    $(`#${activePlayerColumn}-${activePlayerRow - i}`).addClass("clickableSpace");
    // Conditions to determine which spaces above player 1 will be given the class clickableSpace and thus highlighted if those spaces are not occupied by player 2 or an obstacle, or if those spaces are not on the other side of player 2 or an obstacle but still less then 4 spaces from the active player.
    if ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).hasClass("player_2") || $(`#${activePlayerColumn}-${activePlayerRow - i}`).hasClass("obstacle") ) {
      $(`#${activePlayerColumn}-${activePlayerRow - i}`).removeClass("clickableSpace");
    }
    if ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).hasClass("obstacle") ) {
      obstacleRowMinus = +$(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("data-row");
    }
    if ( +$(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("data-row") < obstacleRowMinus ) {
      $(`#${activePlayerColumn}-${activePlayerRow - i}`).removeClass("clickableSpace");
    }
    if ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).hasClass("player_2") ) {
      player2RowMinus = +$(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("data-row");
    }
    if ( +$(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("data-row") < player2RowMinus ) {
      $(`#${activePlayerColumn}-${activePlayerRow - i}`).removeClass("clickableSpace");
    }
  }
}

// Calling of the playerPlacement(), obstaclePlacement() and weaponPlacement() functions everytime the page is loaded in order to place the players, obstacles and weapons randomly on the board as a part of the JS initialization of the board game.
playerPlacement(2);
obstaclePlacement(11);
weaponPlacement(4);
initialAvailableSpaces();

// A function which occurs everytime a space is clicked is called initiating the Game object class while passing the in the clicked space's id value to the game object in order for the clicked space's location to be accessed within the game object.
const spaceClicked = (xy) => {
  new Game($(`#${xy}`));
}

// An event listener on the new game button causes the page to reload every time the new game button is clicked.
$('.rulesButton:nth-child(1)').on('click', function() {
  location.reload();
});



