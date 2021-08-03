# OpenClassrooms-Project-6-War-Of-Weapons-Board-Game

### A link to view the War of Weapons board game is below:
https://mbdev95.github.io/OpenClassrooms-Project-6-War-Of-Weapons-Board-Game/

### Skills Used:
- Object-Oriented JavaScript
- jQuery
- CSS grid

## Introduction
Project 6 of my OpenClassrooms Front-end web developer course has greatly deepended my understanding of JavaScript by using object-oriented JavaScript to create a turn-based board game.  I learned the importance of using object-oriented JavaScript to create organized JavaScript code which can be compartmentalized into organized object classes allowing for a controlled flow of data in a logical way.  Moreover, I learned and used jQuery syntax to allow for more efficient programming using a more concise verson of JavaScript. I used conditional statements throughout to create precise code which only executes under the specific conditions the board game requires.  Project 6 greatly increased my confidence in the world of JavaScript.

## User-Interface
![Board-Image](https://user-images.githubusercontent.com/77469447/128060219-11a46fff-21e2-47a5-a005-c77069660b74.PNG)
The user-interface was created using mostly custom css with the assistance of bootstrap to allow for more efficient design. The board was created using the css grid properties of grid-template-rows and grid-template-columms to create one hundred equally sized boxes in ten rows and columns.  Meanwhile, each grid item was given a flex display value so any grid item's contents could be centered using the justify-content and align-items value of center.  Above the board a rectangle of svg weapons was positioned using absolute positioning.  The weapons move slightly when hovered over as a result of css transition and tranforms.  To the left and right of the board are column of four banners displayed using flex-column, while the contents of each banner are displayed using relative positioning.  Thus, on this project I used a diverse selection of css layout methods including absolute positioning, relative positioning, flexbox and the css grid.

## Use of Object-Oriented JavaScript
![Game-Object-Class-Initialization](https://user-images.githubusercontent.com/77469447/128060307-4945a614-70ef-4964-aeb4-190d1cb2fe74.PNG)
I used object-oriented JavaScript to seperate the main functional components of the application into seperate object classes allowing for maintainable and organized code. The constructor method was used in each object's class as a way to communicate important data from one object class to another.  I created a script file which contains the code to run on page load. For instance, in the script file the board is loaded with all the weapons, obstacles, players and highlighted available spaces.  At the end of the script file the Game object is instantiated, as seen in the image above, with the clicked space's id passed in as an argument for the Game object class' constructor method. 

![Player-And-Board-Objects-Classes-Initialization](https://user-images.githubusercontent.com/77469447/128060331-a567eaf1-2e1f-47ed-9a7e-2127404e44f3.PNG)
The above image shows the Game object class' constructor method.  In the constructor method the passed in clicked space from the script file is further passed to the movePlayer() function within the constructor.  Thus, the movePlayer() function will now be able to use the id of the clicked space as a point of reference when determinging which spaces are available for the inactive player to move on in their next turn.  This illustrates how object-oriented JavaScript is an effective way to move critcal data to differenct areas of an applications code. Additionally, in the Game constructor the board object's class is instantiated allowing for an arrray of all the board's psaces to be created. Finally, in the Game object the players() function is executed. The players() function instatiates both player object classes, passing in data pertaining to each player.  Both player object classes are stored in a returned array.  This arrray will be access at various points when player information is required. Thus, the Game constructor method is used as a control point for the rest of the application, establishing a stream of communication to the Game object, making the Game object easily accessible to all other parts of the application. Object-oriented JavaScript allows for an organized and efficient way of writing code that makes sense. 

## Programming For All Possibilies
![Defence-Loops-Conditions-Image](https://user-images.githubusercontent.com/77469447/128060406-4ec3af62-f76d-4246-8f58-2132d25e8835.PNG)

## Use of jQuery

## Conclusion
![Game-Over-Message](https://user-images.githubusercontent.com/77469447/128060489-7ee1a452-08e4-43e6-aeac-fc68bcf1ac56.PNG)
