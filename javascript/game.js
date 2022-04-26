// ----- Game Class
class Game {
  constructor(clickedSpace) {
    this.board = new Board();
    this.players = this.players();
    this.movePlayer = this.movePlayer(clickedSpace);
  }

// Game - players() - create the players object class for player 1 and player 2 by calling the player class twice with arguements passed unique to player 1's and player 2's name, id, and active boolean value. 
  players() {
    const players = [];
    for (let i = 0; i < 2; i++) {
      if ( i === 0 ) {
        const player1 = new Player("player_1", i, true);
        players.push(player1);
      } else {
        const player2 = new Player("player_2", i, false);
        players.push(player2);
      }
    }
    return players;
  }

// Game - activePlayer() - The active player's name value is determined by finding the space object with a class of active, and then matching the space with class active's player value with a player name from the player's array.
  activePlayer() {
    let initialActiveSpace;
    for ( let x = 0; x < this.board.columns; x++ ) {
      for ( let y = 0; y < this.board.rows; y++  ) {
        if ( $(`#${+x + 1}-${+y + 1}`).hasClass("active") ) { 
          initialActiveSpace = this.board.spaces[x][y];
        }
      }
    }
    for (let i = 0; i < this.players.length; i++) {
      if ( initialActiveSpace.player === this.players[i].name ) {
        return this.players[i].name; 
      }
    }
  }

  // Game - activePlayerWeapon() - returns the activePlayer's weapon by determining who the active player is and then returning the active player's weapon.
  activePlayerWeapon() {
    if ( this.activePlayer() === "player_1" ) {
      return this.players[0].weapon;
    } else {
      return this.players[1].weapon;
    }
  }

  // Game - inactivePlayer() - determines the inactive player by returning the name of the player who's name is not the name of the active player.
  inactivePlayer() {
    for (let i = 0; i < this.players.length; i++) {
      if ( this.players[i].name !== this.activePlayer() ) {
        return this.players[i].name; 
      }
    }
  }

// Game - activeSpace() - finds the active space by looping through all the space objects and comparing that space object's player property's name value to the activePlayer's name.
  activeSpace() {
    const activePlayer = this.activePlayer();
    const activeSpaceCoordinates = [];
    for ( let x = 0; x < +this.board.columns; x++) {
      for ( let y = 0; y < +this.board.rows; y++ ) {
        if ( this.board.spaces[x][y].player === activePlayer ) {
          activeSpaceCoordinates.push(x + 1);
          activeSpaceCoordinates.push(y + 1);
          return activeSpaceCoordinates;
        }
      }
    }
  }

// Game - inactiveSpace() - an array of the row and column values of the space occupied by the inactive player is returned.
  inactiveSpace() {
    const inactivePlayer = this.inactivePlayer();
    const inactiveSpaceCoordinates = [];
    for ( let x = 0; x < +this.board.columns; x++) {
      for ( let y = 0; y < +this.board.rows; y++ ) {
        if ( this.board.spaces[x][y].player === inactivePlayer ) {
          inactiveSpaceCoordinates.push(x + 1);
          inactiveSpaceCoordinates.push(y + 1);
          return inactiveSpaceCoordinates;
        }
      }
    } 
  }

// Game - switchPlayer() - removes the active class from the current active space and adds the active class to the new active space when the players switch turns.
  switchPlayer() {
    const inactivePlayer = this.inactivePlayer();
    const activePlayer = this.activePlayer();
    for ( let x = 0; x < +this.board.columns; x++) {
      for ( let y = 0; y < +this.board.rows; y++ ) {
        if ( this.board.spaces[x][y].player === activePlayer ) {
          $(`#${x + 1}-${y + 1}`).removeClass("active");
        } else if ( this.board.spaces[x][y].player === inactivePlayer ) {
          $(`#${x + 1}-${y + 1}`).addClass("active");
        }
      }
    }
  }

// Game - availableSpaces() - A function which determines the available spaces an active player can move into.  The parameter contains an array with the previous active space and the current active space.
  availableSpaces(clickedPreviousSpaceArray) {
    const clickedSpace = clickedPreviousSpaceArray[0];
    const previousSpace = clickedPreviousSpaceArray[1];
    // Active player space variables derived from the activeSpace() method in the Game object class.
    const activePlayerColumn = this.activeSpace()[0];
    const activePlayerRow = this.activeSpace()[1];
    // Inactive player variables value is the clicked space passed into the movePlayer function. Since the move has already been made and the players switched by the time this function is called the clicked space is now representative of the inactive player's space.
    const inactivePlayerColumn = +clickedSpace.attr("data-column");
    const inactivePlayerRow = +clickedSpace.attr("data-row");
    const inactiveSpace = $(`#${inactivePlayerColumn}-${inactivePlayerRow}`);
    // The previous player's space is the active player's space before the move was made and the players were switched. The former active player's space is needed in order to remove the highlighted spaces surrounding the former active player once a new move has been made.
    const previousPlayerColumn = +previousSpace.attr("data-column");
    const previousPlayerRow = +previousSpace.attr("data-row");
    // Variables declared to be used in later conditions involving ensuring a space with class "clickableSpace" is not found beyond an inactive player or obstacle.
    let obstacleColumnPlus;
    let obstacleColumnMinus;
    let obstacleRowPlus;
    let obstacleRowMinus;
    let inactivePlayerColumnPlus;
    let inactivePlayerColumnMinus;
    let inactivePlayerRowPlus;
    let inactivePlayerRowMinus;

    // All the previous players nearest 3 spaces right, left, down and up all have the clickableSpace styling class removed.
    for ( let i = 1; i < 4; i++ ) {
      $(`#${previousPlayerColumn + i}-${previousPlayerRow}`).removeClass("clickableSpace");
      $(`#${previousPlayerColumn - i}-${previousPlayerRow}`).removeClass("clickableSpace");
      $(`#${previousPlayerColumn}-${previousPlayerRow + i}`).removeClass("clickableSpace");
      $(`#${previousPlayerColumn}-${previousPlayerRow - i}`).removeClass("clickableSpace");
    }

    for ( let i = 1; i < 4; i++ ) {
      // 3 spaces to the right of the active player are initially given the clickableSpace class and highlighted.
      $(`#${activePlayerColumn + i}-${activePlayerRow}`).addClass("clickableSpace");
      // Conditions to determine if any of the three spaces to the right of the active space will have the class clickableSpace and their highlighting removed if any of the spaces is an obstacle or inactive player, or if the space is on the opposite side of an obstacle or inactive player.
      if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("id") === inactiveSpace.attr("id") || $(`#${activePlayerColumn + i}-${activePlayerRow}`).hasClass("obstacle") ) {
        $(`#${activePlayerColumn + i}-${activePlayerRow}`).removeClass("clickableSpace");
      }
      if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).hasClass("obstacle") ) {
        obstacleColumnPlus = +$(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("data-column");
      }
      if ( +$(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("data-column") > obstacleColumnPlus ) {
        $(`#${activePlayerColumn + i}-${activePlayerRow}`).removeClass("clickableSpace");
      }
      if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("id") === inactiveSpace.attr("id") ) {
        inactivePlayerColumnPlus = +$(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("data-column");
      }
      if ( +$(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("data-column") > inactivePlayerColumnPlus ) {
        $(`#${activePlayerColumn + i}-${activePlayerRow}`).removeClass("clickableSpace");
      }

      //  3 spaces to the left of the active player are initially given the clickableSpace class and highlighted.
      $(`#${activePlayerColumn - i}-${activePlayerRow}`).addClass("clickableSpace");
      // Conditions to determine if any of the three spaces to the left of the active space will have the class clickableSpace and their highlighting removed if any of the spaces is an obstacle or inactive player, or if the space is on the opposite side of an obstacle or inactive player.
      if ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("id") === inactiveSpace.attr("id") || $(`#${activePlayerColumn - i}-${activePlayerRow}`).hasClass("obstacle") ) {
        $(`#${activePlayerColumn - i}-${activePlayerRow}`).removeClass("clickableSpace");
      }
      if ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).hasClass("obstacle") ) {
        obstacleColumnMinus = +$(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("data-column");
      }
      if ( +$(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("data-column") < obstacleColumnMinus ) {
        $(`#${activePlayerColumn - i}-${activePlayerRow}`).removeClass("clickableSpace");
      }
      if ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("id") === inactiveSpace.attr("id") ) {
        inactivePlayerColumnMinus = +$(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("data-column");
      }
      if ( +$(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("data-column") < inactivePlayerColumnMinus ) {
        $(`#${activePlayerColumn - i}-${activePlayerRow}`).removeClass("clickableSpace");
      }

      // 3 spaces to the below the active player are initially given the clickableSpace class and highlighted.
      $(`#${activePlayerColumn}-${activePlayerRow + i}`).addClass("clickableSpace");
      // Conditions to determine if any of the three spaces below the active space will have the class clickableSpace and their highlighting removed if any of the spaces is an obstacle or inactive player, or if the space is on the opposite side of an obstacle or inactive player.
      if ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("id") === inactiveSpace.attr("id") || $(`#${activePlayerColumn}-${activePlayerRow + i}`).hasClass("obstacle") ) {
        $(`#${activePlayerColumn}-${activePlayerRow + i}`).removeClass("clickableSpace");
      }
      if ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).hasClass("obstacle") ) {
        obstacleRowPlus = +$(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("data-row");
      }
      if ( +$(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("data-row") > obstacleRowPlus ) {
        $(`#${activePlayerColumn}-${activePlayerRow + i}`).removeClass("clickableSpace");
      }
      if ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("id") === inactiveSpace.attr("id") ) {
        inactivePlayerRowPlus = +$(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("data-row");
      }
      if ( +$(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("data-row") > inactivePlayerRowPlus ) {
        $(`#${activePlayerColumn}-${activePlayerRow + i}`).removeClass("clickableSpace");
      }

      // 3 spaces above the active player are initially given the clickableSpace class and highlighted.
      $(`#${activePlayerColumn}-${activePlayerRow - i}`).addClass("clickableSpace");
      // Conditions to determine if any of the three spaces above the active space will have the class clickableSpace and their highlighting removed if any of the spaces is an obstacle or inactive player, or if the space is on the opposite side of an obstacle or inactive player.
      if ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("id") === inactiveSpace.attr("id") || $(`#${activePlayerColumn}-${activePlayerRow - i}`).hasClass("obstacle") ) {
        $(`#${activePlayerColumn}-${activePlayerRow - i}`).removeClass("clickableSpace");
      }
      if ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).hasClass("obstacle") ) {
        obstacleRowMinus = +$(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("data-row");
      }
      if ( +$(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("data-row") < obstacleRowMinus ) {
        $(`#${activePlayerColumn}-${activePlayerRow - i}`).removeClass("clickableSpace");
      }
      if ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("id") === inactiveSpace.attr("id") ) {
        inactivePlayerRowMinus = +$(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("data-row");
      }
      if ( +$(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("data-row") < inactivePlayerRowMinus ) {
        $(`#${activePlayerColumn}-${activePlayerRow - i}`).removeClass("clickableSpace");
      }
    }
  }

  // Game - spacesWithWeapons() - A function which returns an array of spaces which have weapons.
  spacesWithWeapons() {
    const spacesWithWeapons = [];
    let hammer;
    let crossbow;
    let sword;
    let gun;
    for ( let col = 1; col <= +this.board.columns; col++ ) {
      for ( let row = 1; row <= +this.board.rows; row++ ) {
        if ( $(`#${col}-${row}`).hasClass("w-hammer") ) {
          hammer = [$(`#${col}-${row}`), "hammer", 20];            
        } else if ( $(`#${col}-${row}`).hasClass("w-crossbow") ) {
          crossbow = [$(`#${col}-${row}`), "crossbow", 30];            
        } else if ( $(`#${col}-${row}`).hasClass("w-sword") ) {
          sword = [$(`#${col}-${row}`), "sword", 40];            
        } else if ( $(`#${col}-${row}`).hasClass("w-gun") ) {
          gun = [$(`#${col}-${row}`), "gun", 50];            
        }
      }
    }
    spacesWithWeapons.push(hammer);
    spacesWithWeapons.push(crossbow);
    spacesWithWeapons.push(sword);
    spacesWithWeapons.push(gun);
    return spacesWithWeapons;
  }

// Game - fight() - enables the fight to occur by giving damage to the opposing player.
  fight() {
    // The clickable space classes are removed since players will no longer be moving.
    for ( let col = 1; col <= this.board.columns; col++ ) {
      for ( let row = 1; row <= this.board.rows; row++ ) {
        if ( $(`#${col}-${row}`).hasClass("clickableSpace") ) {
          $(`#${col}-${row}`).removeClass("clickableSpace");
        }
      }
    }
    // After 2 seconds a third class is added to the introductory fight image and text causing the image and text to transition to a zero opacity, causing the game board to fully be visible.
    setTimeout(function() { 
      $(`.startFightImageOpacityOne`).addClass("fightingImageGone");
      $(`.fightingTextOpacityOne`).addClass("fightingTextGone");
    }, 2000);
    // Inactive player and active player score span elements are stored in variables.
    const inactivePlayerScoreSpan = $(`.${this.inactivePlayer()}Score`);
    const activePlayerScoreSpan = $(`.${this.activePlayer()}Score`);
    let player1Space;
    let player2Space; 
    // Each player's space is stored in a let variable declared above in a scope external to the loops iterating through the spaces.
    for ( let x = 1; x < 11; x++ ) {
      for ( let y = 1; y < 11; y++ ) {
        if ( $(`#${x}-${y}`).hasClass("player_1") ) {
          player1Space = $(`#${x}-${y}`);
          if ( $(`#${x}-${y}`).hasClass("active") ) {
            $(`.player_2Info .btn-attack`).attr("disabled", "disabled");
            $(`.player_2Info .btn-defend`).attr("disabled", "disabled");
          }
        }
        if ( $(`#${x}-${y}`).hasClass("player_2") ) {
          player2Space = $(`#${x}-${y}`);
          if ( $(`#${x}-${y}`).hasClass("active") ) {
            $(`.player_1Info .btn-attack`).attr("disabled", "disabled");
            $(`.player_1Info .btn-defend`).attr("disabled", "disabled");
          }
        }
      }
    }
    // The defend boolean values for each player are initially set to false and turn to true when the active player's defend button is clicked.
    let defendPlayer1 = false;
    let defendPlayer2 = false;

    // Attack button event listener.
    $(`.btn-attack`).on("click", function() {
      // Empyt quotes returned if either player's score is zero since the game is over.    
      if ( +inactivePlayerScoreSpan.text() === 0 || +activePlayerScoreSpan.text() === 0 ) {
        return "";
      } else {
        // If the game is not over the player whose active and their space is determined.
        for ( let x = 1; x < 11; x++ ) {
          for ( let y = 1; y < 11; y++ ) {
            if ( $(`#${x}-${y}`).hasClass("active") ) {
              if ( $(`#${x}-${y}`).hasClass("player_1") ) {
                // If player 1 is active then player 2's score will be updated to reflect the value of player 2's score subtract player 1's damage amount.
                const activePlayer = "player_1";
                const activePlayerDamage = +$(`.${activePlayer}Info p`).text();
                const inactivePlayer = "player_2";
                let inactivePlayerScore = +$(`.${inactivePlayer}Score`).text();
                const inactivePlayerScoreSpan = $(`.${inactivePlayer}Score`);
                inactivePlayerScore -= activePlayerDamage;
                inactivePlayerScoreSpan.text(inactivePlayerScore);
                // If player two has a defend boolean value of true then their damage will be increased by half the value of player 1's damage amount and their defend boolean value will be reset to false.
                if ( defendPlayer2 === true ) {
                  inactivePlayerScoreSpan.text(inactivePlayerScore + (activePlayerDamage / 2));
                  defendPlayer2 = false;
                }
                // Player 1's buttons will now be disabled since their turn is over.
                $(`.player_1Info .btn-attack`).attr("disabled", "disabled");
                $(`.player_1Info .btn-defend`).attr("disabled", "disabled");
                // If player 2's score is less then one (i.e 20) their score will become zero and a game over message will appear, after which an empty string value will be returned to end the function and the game.
                if ( +inactivePlayerScoreSpan.text() < 1 ) {
                  inactivePlayerScoreSpan.text(0);
                  // A message appears on screen here stating that the game is over.
                  $(`#board`).append(`<div class="gameOverMessage rounded"><h4>Game Over</h4><img src='img/soldier.svg' class='player1WinnerImg'><img src='img/trophy.svg'><p>Player 1 is the winner!</p><button class="btn btn-light btn-playAgain" onclick="location.reload()">Play Again</button><button class="btn btn-secondary btn-close" onclick="$('.gameOverMessage').remove()">Close</button></div>`);
                  // 500ms after message first appears an animation causes the player 1 image to scale out and after the image scales the trophy transitions to a 1 opacity from zero.
                  setTimeout(function() { 
                    $(`.player1WinnerImg`).addClass("player1WinnerScaleOutImg");
                    $(`img[src$="trophy.svg"]`).addClass("trophyOpacity1");
                  }, 500);
                  // After just over 3 seconds and after the trophy has appeared player 1's image scales back down to it's original size.
                  setTimeout(function() { 
                    $(`.player1WinnerImg`).addClass("player1WinnerScaleInImg");
                  }, 3200);
                  return "";
                }
                // The active class is now moved from player 1 to player 2's space making player 2 the active player.
                player1Space.removeClass("active");
                player2Space.addClass("active");
                // Player 2's buttons are enabled since player 2 is now the active player.  
                $(`.player_2Info .btn-attack`).removeAttr("disabled");
                $(`.player_2Info .btn-defend`).removeAttr("disabled");
                // The iteration values become 11 to end the two loops iterating through the spaces.
                y = 11;
                x = 11;
              }
              if ( $(`#${x}-${y}`).hasClass("player_2") ) {
                // If player 2 is active then player 1's score will be updated to reflect the value of player 1's score subtract player 2's damage amount.
                const activePlayer = "player_2";
                const activePlayerDamage = +$(`.${activePlayer}Info p`).text();
                const inactivePlayer = "player_1";
                let inactivePlayerScore = +$(`.${inactivePlayer}Score`).text();
                const inactivePlayerScoreSpan = $(`.${inactivePlayer}Score`);
                inactivePlayerScore -= activePlayerDamage;
                inactivePlayerScoreSpan.text(inactivePlayerScore);
                // If player one has a defend boolean value of true then their damage will be increased by half the value of player 2's damage amount and their defend boolean value will be reset to false. 
                if ( defendPlayer1 === true ) {
                  inactivePlayerScoreSpan.text(inactivePlayerScore + (activePlayerDamage / 2));
                  defendPlayer1 = false;
                }
                // Player 2's buttons will now be disabled since their turn is over.
                $(`.player_2Info .btn-attack`).attr("disabled", "disabled");
                $(`.player_2Info .btn-defend`).attr("disabled", "disabled");
                // If player 1's score is less then one (i.e. 20) their score will become zero and a game over message will appear, after which an empty string value will be returned to end the function and the game.
                if ( +inactivePlayerScoreSpan.text() < 1 ) {
                  inactivePlayerScoreSpan.text(0);
                  // A message appears on screen here stating that the game is over.
                  $(`#board`).append(`<div class="gameOverMessage rounded"><h4>Game Over</h4><img src='img/warrior.svg' class='player2WinnerImg'><img src='img/trophy.svg'><p>Player 2 is the winner!</p><button class="btn btn-light btn-playAgain" onclick="location.reload()">Play Again</button><button class="btn btn-secondary btn-close" onclick="$('.gameOverMessage').remove()">Close</button></div>`);
                  // 500ms after message an animation occurs which causes the player 2 image to scale out and after the image scales the trophy transitions to a 1 opacity from zero.
                  setTimeout(function() { 
                    $(`.player2WinnerImg`).addClass("player2WinnerScaleOutImg");
                    $(`img[src$="trophy.svg"]`).addClass("trophyOpacity1");
                  }, 500);
                  // After just over 3 seconds and after the trophy has appeared player 2's image scales back down to it's original size.
                  setTimeout(function() { 
                    $(`.player2WinnerImg`).addClass("player2WinnerScaleInImg");
                  },3200);
                  return "";
                }
                // The active class is now moved from player 2 to player 1 making player 1 the active player. 
                player2Space.removeClass("active");
                player1Space.addClass("active");
                // Player 2's buttons are enabled since player 2 is not the active player.  
                $(`.player_1Info .btn-attack`).removeAttr("disabled");
                $(`.player_1Info .btn-defend`).removeAttr("disabled");
                // The iteration values become 11 to end the two loops iterating through the spaces.
                y = 11;
                x = 11;
              }
            }
          } 
        } 
      }
    });

    // The defend button event listener.
    $(`.btn-defend`).on("click", function() {
      // If either players score value is zero an empty string is returned to end the function since is a player's score is zero then the game is over.
      if ( +inactivePlayerScoreSpan.text() === 0 || +activePlayerScoreSpan.text() === 0 ) {
        return "";
      } else {
        // If the game is not over the player whose active and their space is determined.
        for ( let x = 1; x < 11; x++ ) {
          for ( let y = 1; y < 11; y++ ) {
            if ( $(`#${x}-${y}`).hasClass("active") ) {
              if ( $(`#${x}-${y}`).hasClass("player_1") ) {
                // Player 1's defend boolean value is set to true so when player 2 attacks player 1 will suffer only half the damage.
                defendPlayer1 = true;
                // The players are switched so player 1 is inactive and player 2 is active.
                player1Space.removeClass("active");
                player2Space.addClass("active");
                // Player 1's buttons are disabled and player 2's buttons are enabled since the players have switched.
                $(`.player_1Info .btn-attack`).attr("disabled", "disabled");
                $(`.player_1Info .btn-defend`).attr("disabled", "disabled");
                $(`.player_2Info .btn-attack`).removeAttr("disabled");
                $(`.player_2Info .btn-defend`).removeAttr("disabled");
                // The iteration values become 11 to end the two loops iterating through the spaces.
                y = 11;
                x = 11;
              }
              if ( $(`#${x}-${y}`).hasClass("player_2") ) {
                // Player 2's defend boolean value is set to true so when player 1 attacks player 2 will suffer only half the damage. 
                defendPlayer2 = true;
                // The players are switched so player 2 is inactive and player 1 is active.
                player2Space.removeClass("active");
                player1Space.addClass("active");
                // Player 2's buttons are disabled and player 1's buttons are enabled since the players have switched.
                $(`.player_2Info .btn-attack`).attr("disabled", "disabled");
                $(`.player_2Info .btn-defend`).attr("disabled", "disabled");
                $(`.player_1Info .btn-attack`).removeAttr("disabled");
                $(`.player_1Info .btn-defend`).removeAttr("disabled");
                // The iteration values become 11 to end the two loops iterating through the spaces.
                y = 11;
                x = 11;
              }
            }
          } 
        } 
      }
    });
  }

/* Game - movePlayer(clickedSpace) - allows the active player to move onto an available space.
*/
  movePlayer(clickedSpace) {
    // Variable declarations
    const activePlayerColumn = this.activeSpace()[0];
    const activePlayerRow = this.activeSpace()[1];
    const activePlayer = this.activePlayer();
    const inactivePlayerColumn = this.inactiveSpace()[0];
    const inactivePlayerRow = this.inactiveSpace()[1];
    const inactivePlayerId = $(`#${this.inactiveSpace()[0]}-${this.inactiveSpace()[1]}`).attr('id');
    const clickedSpaceColumn = +clickedSpace.attr("data-column");
    const clickedSpaceRow = +clickedSpace.attr("data-row");
    // A condition which ensures the player does not move onto a space occupied by another player or obstacle.
    if ( !$(clickedSpace).hasClass("player_1") && !$(clickedSpace).hasClass("player_2") && !$(clickedSpace).hasClass("obstacle") ) {
      // ----- PREVENTING AN ACTIVE PLAYER FROM HOPPING OVER AN INACTIVE PLAYER -----
      // The start of a for loop which is used to iterate three spaces left, right, up and down.
      for ( let i = 1; i < 4; i++ ) {
        // A series of conditions which prevent the active player from hopping over an inactive player by breaking the loop/function if the active player hops over the inactive player.  
        if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).attr('id') === inactivePlayerId ) {
          if ( inactivePlayerColumn < clickedSpaceColumn ) {
            break;
          }
        }
        if ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).attr('id') === inactivePlayerId ) {
          if ( inactivePlayerColumn > clickedSpaceColumn ) {
            break;
          }
        }
        if ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).attr('id') === inactivePlayerId ) {
          if ( inactivePlayerRow < clickedSpaceRow ) {
            break;
          }
        }
        if ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).attr('id') === inactivePlayerId ) {
          if ( inactivePlayerRow > clickedSpaceRow ) {
            break;
          }
        }

        // ----- PREVENTING A PLAYER FROM HOPPING OVER AN OBSTACLE -----
        // A further set of conditions prevents the activePlayer from hopping over a pylon by determing if movement is horizontal or vertical, and which direction the player intends to move, followed by checking if there is an obstacle within three spaces of the direction the player has clicked, and finally seeing if the player clicks past the obstacle.  If the player clicks past the obstacle the loop breaks and the function ends.
        if ( activePlayerRow === clickedSpaceRow ) {
          if ( activePlayerColumn < clickedSpaceColumn ) {
            if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).hasClass("obstacle") ) {
              if ( activePlayerColumn + i < clickedSpaceColumn ) {
                break;
              }
            }
          } else {
            if ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).hasClass("obstacle") ) {
              if ( activePlayerColumn - i > clickedSpaceColumn ) {
                break;
              }
            }
          }
        } else {
          if ( activePlayerRow < clickedSpaceRow ) {
            if ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).hasClass("obstacle") ) {
              if ( activePlayerRow + i < clickedSpaceRow ) {
                break;
              }
            }
          } else {
            if ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).hasClass("obstacle") ) {
              if ( activePlayerRow - i > clickedSpaceRow ) {
                break;
              }
            }
          }
        }

        // A condition which determines if the active player has clicked three spaces up, down, left or right.
        if ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).attr('id') === clickedSpace.attr('id') || $(`#${activePlayerColumn - i}-${activePlayerRow}`).attr('id') === clickedSpace.attr('id') || $(`#${activePlayerColumn}-${activePlayerRow + i}`).attr('id') === clickedSpace.attr('id') || $(`#${activePlayerColumn}-${activePlayerRow - i}`).attr('id') === clickedSpace.attr('id') ) {
          // ----- Conditions which determine if the active moving player passes over a weapon -----
          
          // An array with only weapons found on the board and not in any of player's possession.
          const definedWeaponSpacesArray = this.spacesWithWeapons().filter(function(element) {
            if ( element !== undefined ) {
              return element;
            }
          });
          // A loop used to iterate three spaces away from the active player.
          for ( let i = 1; i < 4; i++ ) {
            // A loop used to iterate through the array containing only weapons found on the board.
            for ( let sww = 0; sww < definedWeaponSpacesArray.length; sww++ ) {
              //Weapons picked up as player moves right passing over the weapon. 
              if ( ( $(`#${activePlayerColumn + i}-${activePlayerRow}`).hasClass("weapon") && activePlayerColumn + i !== clickedSpaceColumn ) || ( $(`#${activePlayerColumn + i + 2 }-${activePlayerRow}`).hasClass("weapon") && activePlayerColumn + i + 2 === clickedSpaceColumn ) ) {
                if ( activePlayerColumn + i < clickedSpaceColumn && $(`#${activePlayerColumn + i}-${activePlayerRow}`).attr("id") === $(definedWeaponSpacesArray[sww][0]).attr("id") ) {
                  const weaponToBePickedUp = definedWeaponSpacesArray[sww][1];
                  const updatedDamage = definedWeaponSpacesArray[sww][2];
                  // Remove the weapon to be picked up's associated image and classes.
                  $(`#${activePlayerColumn + i}-${activePlayerRow}`).removeClass("weapon").removeClass(`w-${weaponToBePickedUp}`).children().remove();   
                  // Player has hammer in ititial possession.          
                  if ( +$(`.${activePlayer}Info p`).text() === 20 ) {
                    $(`#${activePlayerColumn + i}-${activePlayerRow}`).addClass("w-hammer");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[0];
                  }
                  // Player has crossbow in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 30 ) {
                    $(`#${activePlayerColumn + i}-${activePlayerRow}`).addClass("w-crossbow");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[1];
                  }
                  // Player has sword in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 40 ) {
                    $(`#${activePlayerColumn + i}-${activePlayerRow}`).addClass("w-sword");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[2];
                  }
                  // Player has gun in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 50 ) {
                    $(`#${activePlayerColumn + i}-${activePlayerRow}`).addClass("w-gun");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[3];
                  }
                  // If a player has a weapon the weapon is placed on the board in replacement of the weapon the active player has just picked up.
                  if ( this.activePlayerWeapon().weapon.length > 0 ) {                   
                    $(`#${activePlayerColumn + i}-${activePlayerRow}`).append($(`<img src='img/${this.activePlayerWeapon().weapon[1]}.svg'>`).addClass(`${this.activePlayerWeapon().weapon[1]}`)).addClass("weapon");                                  
                  }
                  // The active player's damage amount is updated.
                  $(`.${activePlayer}Info p`).text(updatedDamage);
                  // If they're any other weapons in the two spaces away from the space the active player has picked up a weapon then the loop will continue and if not then the loop breaks in order to account for the possibility the clicked space was on or beyond either of those other two spaces with weapons.
                  if ( $(`#${activePlayerColumn + i + 1 }-${activePlayerRow}`).hasClass("weapon") || $(`#${activePlayerColumn + i + 2 }-${activePlayerRow}`).hasClass("weapon") ) {
                    continue; 
                  } else {
                    i = 3;
                    break;
                  } 
                }
              }
              //Weapons picked up as player moves left passing over the weapon.
              if ( ( $(`#${activePlayerColumn - i}-${activePlayerRow}`).hasClass("weapon") && activePlayerColumn - i !== clickedSpaceColumn ) || ( $(`#${activePlayerColumn - i - 2 }-${activePlayerRow}`).hasClass("weapon") && activePlayerColumn - i - 2 === clickedSpaceColumn ) ) {
                if (  activePlayerColumn - i > clickedSpaceColumn && $(`#${activePlayerColumn - i}-${activePlayerRow}`).attr("id") === $(definedWeaponSpacesArray[sww][0]).attr("id") ) {
                  const weaponToBePickedUp = definedWeaponSpacesArray[sww][1];
                  const updatedDamage = definedWeaponSpacesArray[sww][2];
                  // Remove the weapon to be picked up's associated image and classes.
                  $(`#${activePlayerColumn - i}-${activePlayerRow}`).removeClass("weapon").removeClass(`w-${weaponToBePickedUp}`).children().remove();
                  // Player has hammer in initial possession.           
                  if ( +$(`.${activePlayer}Info p`).text() === 20 ) {
                    $(`#${activePlayerColumn - i}-${activePlayerRow}`).addClass("w-hammer").removeClass(`w-${weaponToBePickedUp}`);
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[0];
                  }
                  // Player has crossbow in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 30 ) {
                    $(`#${activePlayerColumn - i}-${activePlayerRow}`).addClass("w-crossbow");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[1];
                  }
                  // Player has sword in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 40 ) {
                    $(`#${activePlayerColumn - i}-${activePlayerRow}`).addClass("w-sword");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[2];
                  }
                  // // Player has gun in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 50 ) {
                    $(`#${activePlayerColumn - i}-${activePlayerRow}`).addClass("w-gun");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[3];
                  } 
                  // If a player has a weapon the weapon is placed on the board in replacement of the weapon the active player has just picked up.
                  if ( this.activePlayerWeapon().weapon.length > 0 ) {                   
                    $(`#${activePlayerColumn - i}-${activePlayerRow}`).append($(`<img src='img/${this.activePlayerWeapon().weapon[1]}.svg'>`).addClass(`${this.activePlayerWeapon().weapon[1]}`)).addClass("weapon");                                  
                  }
                  // The active player's damage amount is updated.
                  $(`.${activePlayer}Info p`).text(updatedDamage);
                  // If they're any other weapons in the two spaces away from the space the active player has picked up a weapon then the loop will continue and if not then the loop breaks in order to account for the possibility the clicked space was on or beyond either of those other two spaces with weapons.
                  if ( $(`#${activePlayerColumn - i - 1 }-${activePlayerRow}`).hasClass("weapon") || $(`#${activePlayerColumn - i - 2 }-${activePlayerRow}`).hasClass("weapon") ) {
                    continue; 
                  } else {
                    i = 3;
                    break;
                  }
                }
              }
              //Weapons picked up as player moves downward passing over the weapon.
              if ( ( $(`#${activePlayerColumn}-${activePlayerRow + i}`).hasClass("weapon") && activePlayerRow + i !== clickedSpaceRow ) || ( $(`#${activePlayerColumn}-${activePlayerRow + i + 2}`).hasClass("weapon") && activePlayerRow + i + 2 === clickedSpaceRow ) ) {
                if ( activePlayerRow + i < clickedSpaceRow && $(`#${activePlayerColumn}-${activePlayerRow + i}`).attr("id") === $(definedWeaponSpacesArray[sww][0]).attr("id") ) {
                  const weaponToBePickedUp = definedWeaponSpacesArray[sww][1];
                  const updatedDamage = definedWeaponSpacesArray[sww][2];
                  // Remove the weapon to be picked up's associated image and classes.
                  $(`#${activePlayerColumn}-${activePlayerRow + i}`).removeClass("weapon").removeClass(`w-${weaponToBePickedUp}`).children().remove();             
                  // Player has hammer in  initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 20 ) {
                    $(`#${activePlayerColumn}-${activePlayerRow + i}`).addClass("w-hammer");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[0];
                  }
                  // Player has crossbow in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 30 ) {
                    $(`#${activePlayerColumn}-${activePlayerRow + i}`).addClass("w-crossbow");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[1];
                  }
                  // Player has sword in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 40 ) {
                    $(`#${activePlayerColumn}-${activePlayerRow + i}`).addClass("w-sword");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[2];
                  }
                  // // Player has gun in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 50 ) {
                    $(`#${activePlayerColumn}-${activePlayerRow + i}`).addClass("w-gun");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[3];
                  } 
                  // If a player has a weapon the weapon is placed on the board in replacement of the weapon the active player has just picked up.
                  if ( this.activePlayerWeapon().weapon.length > 0 ) {                   
                    $(`#${activePlayerColumn}-${activePlayerRow + i}`).append($(`<img src='img/${this.activePlayerWeapon().weapon[1]}.svg'>`).addClass(`${this.activePlayerWeapon().weapon[1]}`)).addClass("weapon");                                  
                  }
                  // The active player's damage amount is updated.
                  $(`.${activePlayer}Info p`).text(updatedDamage);
                  // If they're any other weapons in the two spaces away from the space the active player has picked up a weapon then the loop will continue and if not then the loop breaks in order to account for the possibility the clicked space was beyond or at those other two spaces with weapons.                
                  if ( $(`#${activePlayerColumn}-${activePlayerRow + i + 1}`).hasClass("weapon") || $(`#${activePlayerColumn}-${activePlayerRow + i + 2 }`).hasClass("weapon") ) {
                    continue; 
                  } else {
                    i = 3;
                    break;
                  } 
                }
              }
              //Weapons picked up as player moves upward passing over the weapon.
              if ( ( $(`#${activePlayerColumn}-${activePlayerRow - i}`).hasClass("weapon") && activePlayerRow - i !== clickedSpaceRow ) || ( $(`#${activePlayerColumn}-${activePlayerRow - i - 2}`).hasClass("weapon") && activePlayerRow - i - 2 === clickedSpaceRow ) ) {
                if ( activePlayerRow - i > clickedSpaceRow && $(`#${activePlayerColumn}-${activePlayerRow - i}`).attr("id") === $(definedWeaponSpacesArray[sww][0]).attr("id") ) {
                  const weaponToBePickedUp = definedWeaponSpacesArray[sww][1];
                  const updatedDamage = definedWeaponSpacesArray[sww][2];
                  // Remove the weapon to be picked up's associated image and classes.
                  $(`#${activePlayerColumn}-${activePlayerRow - i}`).removeClass("weapon").removeClass(`w-${weaponToBePickedUp}`).children().remove();             
                  // Player has hammer initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 20 ) {
                    $(`#${activePlayerColumn}-${activePlayerRow - i}`).addClass("w-hammer");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[0];
                  }
                  // Player has crossbow in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 30 ) {
                    $(`#${activePlayerColumn}-${activePlayerRow - i}`).addClass("w-crossbow");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[1];
                  }
                  // Player has sword in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 40 ) {
                    $(`#${activePlayerColumn}-${activePlayerRow - i}`).addClass("w-sword");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[2];
                  }
                  // // Player has gun in initial possession.
                  if ( +$(`.${activePlayer}Info p`).text() === 50 ) {
                    $(`#${activePlayerColumn}-${activePlayerRow - i}`).addClass("w-gun");
                    this.activePlayerWeapon().weapon = this.spacesWithWeapons()[3];
                  } 
                  // If a player has a weapon the weapon is placed on the board in replacement of the weapon the active player has just picked up.
                  if ( this.activePlayerWeapon().weapon.length > 0 ) {                   
                    $(`#${activePlayerColumn}-${activePlayerRow - i}`).append($(`<img src='img/${this.activePlayerWeapon().weapon[1]}.svg'>`).addClass(`${this.activePlayerWeapon().weapon[1]}`)).addClass("weapon");                                  
                  }
                  // The active player's damage amount is updated.
                  $(`.${activePlayer}Info p`).text(updatedDamage);                
                  // If they're any other weapons in the two spaces away from the space the active player has picked up a weapon then the loop will continue and if not then the loop breaks in order to account for the possibility the clicked space was beyond or at those other two spaces with weapons.
                  if ( $(`#${activePlayerColumn}-${activePlayerRow - i - 1}`).hasClass("weapon") || $(`#${activePlayerColumn}-${activePlayerRow - i - 2 }`).hasClass("weapon")) {
                    continue; 
                  } else {
                    i = 3;
                    break;
                  }
                }
              }
            }
          }

          //The conditions are used to determine whether the space clicked was a weapon, if so what type of weapon inorder for an exhange of weapons to occur, or if no weapons are in possession of the active player the weapon clicked on will be picked up only.
          for ( let i = 0; i < 1; i++ ) {            

          // Clicking on the hammer space.
            if ( $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).children().hasClass("hammer") ) {
              // Remove the weapon to be picked up's associated image and classes.
              $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).removeClass("weapon").removeClass("w-hammer").children().remove();
              // Player has crossbow in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 30 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-crossbow");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[1];
              }
              // Player has sword in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 40 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-sword");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[2];
              }
              // Player has gun in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 50 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-gun");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[3];
              } 
              // If a player has a weapon the weapon is placed on the board in replacement of the weapon the active player has just picked up.
              if ( this.activePlayerWeapon().weapon.length > 0 ) {                  
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).append($(`<img src='img/${this.activePlayerWeapon().weapon[1]}.svg'>`).addClass(`${this.activePlayerWeapon().weapon[1]}`)).addClass("weapon");                                  
              }
              // The active player's damage amount is updated and the loop breaks to allow the player to move.
              $(`.${activePlayer}Info p`).text(20);
              break;             
            }
            // Clicking on the crossbow space.
            if ( $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).children().hasClass("crossbow") ) {
              // Remove the weapon to be picked up's associated image and classes.
              $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).removeClass("weapon").removeClass("w-crossbow").children().remove();
              // Player has hammer in initial possession. 
              if ( +$(`.${activePlayer}Info p`).text() === 20 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-hammer");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[0];
              }
              // Player has sword in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 40 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-sword");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[2];
              }
              // Player has gun in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 50 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-gun");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[3];
              } 
              // If a player has a weapon the weapon is placed on the board in replacement of the weapon the active player has just picked up.
              if ( this.activePlayerWeapon().weapon.length > 0 ) {                  
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).append($(`<img src='img/${this.activePlayerWeapon().weapon[1]}.svg'>`).addClass(`${this.activePlayerWeapon().weapon[1]}`)).addClass("weapon");                                  
              }
              // The active player's damage amount is updated and the loop breaks to allow the player to move.
              $(`.${activePlayer}Info p`).text(30);
              break;   
            }
            // Clicking on the sword space.
            if ( $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).children().hasClass("sword") ) {
              // Remove the weapon to be picked up's associated image and classes.
              $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).removeClass("weapon").removeClass("w-sword").children().remove();
              // Player has hammer in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 20 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-hammer");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[0];
              }
              // Player has crossbow in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 30 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-crossbow");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[1];
              }
              // Player has gun in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 50 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-gun");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[3];
              } 
              // If a player has a weapon the weapon is placed on the board in replacement of the weapon the active player has just picked up.
              if ( this.activePlayerWeapon().weapon.length > 0 ) {                  
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).append($(`<img src='img/${this.activePlayerWeapon().weapon[1]}.svg'>`).addClass(`${this.activePlayerWeapon().weapon[1]}`)).addClass("weapon");                                  
              } 
              // The active player's damage amount is updated and the loop breaks to allow the player to move.
              $(`.${activePlayer}Info p`).text(40);
              break;   
            }
            // Clicking on the gun space.
            if ( $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).children().hasClass("gun") ) {
              // Remove the weapon to be picked up's associated image and classes.
              $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).removeClass("weapon").removeClass("w-gun").children().remove();
              // Player has hammer in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 20 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-hammer");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[0];
              }
              // Player has crossbow in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 30 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-crossbow");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[1];
              }
              // Player has sword in initial possession.
              if ( +$(`.${activePlayer}Info p`).text() === 40 ) {
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).addClass("w-sword");
                this.activePlayerWeapon().weapon = this.spacesWithWeapons()[2];
              } 
              // If a player has a weapon the weapon is placed on the board in replacement of the weapon the active player has just picked up.
              if ( this.activePlayerWeapon().weapon.length > 0 ) {                  
                $(`#${clickedSpaceColumn}-${clickedSpaceRow}`).append($(`<img src='img/${this.activePlayerWeapon().weapon[1]}.svg'>`).addClass(`${this.activePlayerWeapon().weapon[1]}`)).addClass("weapon");                                  
              } 
              // The active player's damage amount is updated and the loop breaks to allow the player to move.
              $(`.${activePlayer}Info p`).text(50);
              break;   
            }
          }

          // If the appropriate conditions above are met the activePlayer's image is removed.
          $(`#${activePlayerColumn}-${activePlayerRow} img:last-of-type`).remove();

          // -----  MOVING PLAYER ------
          // A condition determines if player 1 is the active player and then switches active players
          if ( activePlayer === "player_1") {
            $(`#${activePlayerColumn}-${activePlayerRow}`).removeClass('player_1');
            clickedSpace.append($("<img src='img/soldier.svg'>").addClass("player1Img")).addClass("player_1");
            const previousPlayerSpace = $(`#${activePlayerColumn}-${activePlayerRow}`);
            this.switchPlayer();
            let clickedPreviousSpaceArray = [];
            clickedPreviousSpaceArray.push(clickedSpace);
            clickedPreviousSpaceArray.push(previousPlayerSpace);
            this.availableSpaces(clickedPreviousSpaceArray);       
          }
          // A condition determines if player 2 is the active player and then switches active players
          if ( activePlayer === "player_2") {
            $(`#${activePlayerColumn}-${activePlayerRow}`).removeClass('player_2');
            clickedSpace.append($("<img src='img/warrior.svg'>").addClass("player2Img")).addClass("player_2");
            const previousPlayerSpace = $(`#${activePlayerColumn}-${activePlayerRow}`);
            this.switchPlayer();
            let clickedPreviousSpaceArray = [];
            clickedPreviousSpaceArray.push(clickedSpace);
            clickedPreviousSpaceArray.push(previousPlayerSpace);
              this.availableSpaces(clickedPreviousSpaceArray);     
          }

          // ----- START OF FIGHT ----- 
          // A condition which if true calls the function which initiates the fight between player 1 and player 2 if the activePlayer is in a square directly left, right, up, or down from the inactive player.
          if ( $(`#${inactivePlayerColumn + 1}-${inactivePlayerRow}`).attr('id') === clickedSpace.attr("id") || $(`#${inactivePlayerColumn - 1}-${inactivePlayerRow}`).attr('id') === clickedSpace.attr("id") || $(`#${inactivePlayerColumn}-${inactivePlayerRow + 1}`).attr('id') === clickedSpace.attr("id") || $(`#${inactivePlayerColumn}-${inactivePlayerRow - 1}`).attr('id') === clickedSpace.attr("id") ) {
            //Append the html and classes causing the starting fight image and text to appear as an overlay on the board with an initial opacity of zero.
            $(`#board`).append($("<img src='img/two_boxers.svg'>").addClass("startFightImageOpacityZero"));
            // The player's id plus one (plus one is to account for the player array index starting at 0) is determined in order to use this value as the player's number in the text which appears to tell the player whose turn it is to start the fight.
            let playerId;
            for ( let i = 0; i < this.players.length; i++ ) {
              if ( this.players[i].name === this.activePlayer() ) {
                playerId = this.players[i].id;
              }
            }
            $(`#board`).append($(`<h2>Let the fight begin!<br>It's Player ${+playerId + 1}'s turn.</br></h2>`).addClass("fightingTextOpacityZero"));
            // After 750 milliseconds have passed allowing for the player to visually be seen having moved beside each other a new class will be added to the introductory fight image and text allowing for the image and text to appear slowly as their opacities transition.
            setTimeout( function() {
              $(".startFightImageOpacityZero").addClass("startFightImageOpacityOne");
              $(".fightingTextOpacityZero").addClass("fightingTextOpacityOne");
            }, 750);
            // The fight method is called causing the fight to begin.
            this.fight();
            //Disable the active players defend button for the first move of the fight only.
            $(`.${this.activePlayer()}Info .btn-defend`).attr("disabled", "disabled");
          }
        }
      }
    }
  }
}
