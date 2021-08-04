# War Of Weapons Board Game

### A link to view the War of Weapons board game online is below:
https://mbdev95.github.io/OpenClassrooms-Project-6-War-Of-Weapons-Board-Game/

### Skills Used:
- Object-Oriented JavaScript
- jQuery
- CSS grid

## Introduction
Project 6 of my OpenClassrooms Front-end web developer course has greatly depended my understanding of JavaScript by using object-oriented JavaScript to create a turn-based board game.  I used object-oriented JavaScript to create organized JavaScript code which can be compartmentalized into object classes, allowing for a controlled flow of data in a logical way.  Moreover, I learned and used jQuery syntax for more efficient and concise programming. I also greatly improved my understanding of arrays, objects, loops, and conditional statements.  Project 6 greatly increased my confidence in the world of JavaScript.

## User-Interface
![Board-Image](https://user-images.githubusercontent.com/77469447/128060219-11a46fff-21e2-47a5-a005-c77069660b74.PNG)

The user-interface was created using mostly custom css, with the assistance of bootstrap to allow for more efficient design. The board was created using the css grid properties of grid-template-rows and grid-template-columms to create one hundred equally sized boxes in ten rows and columns.  Meanwhile, each grid item was given a flex display value so any grid item's contents could be centered using the justify-content and align-items value of center.  Above the board a rectangle of svg weapons was positioned using absolute positioning.  The weapons move slightly when hovered over as a result of css transition and transforms.  To the left and right of the board are columns of four banners displayed using flex-column, while the contents of each banner are displayed using relative positioning.  Thus, on this project I used a diverse selection of css layout methods including absolute positioning, relative positioning, flexbox and the css grid.

## Use of Object-Oriented JavaScript
![Game-Object-Class-Initialization](https://user-images.githubusercontent.com/77469447/128060307-4945a614-70ef-4964-aeb4-190d1cb2fe74.PNG)

I used object-oriented JavaScript to separate the main functional components of the application into separate object classes, allowing for maintainable and organized code. The constructor method was used in each object's class as a way to communicate important data from one object class to another.  I created a script file which contains the code to run on page load. For instance, in the script file the board is loaded with all the weapons, obstacles, players and highlighted available spaces.  At the end of the script file the Game object is instantiated, as seen in the image above, with the clicked space's id passed in as an argument for the Game object class' constructor method. 

![Player-And-Board-Objects-Classes-Initialization](https://user-images.githubusercontent.com/77469447/128060331-a567eaf1-2e1f-47ed-9a7e-2127404e44f3.PNG)

The above image shows the Game object class' constructor method.  In the constructor method the passed in clicked space's id from the script file is further passed to the movePlayer() function, still within the constructor.  Thus, the movePlayer() function will now be able to use the id of the clicked space as a point of reference when determining which spaces are available for the inactive player to move to in their next turn.  This illustrates how object-oriented JavaScript is an effective way to move critical data to different areas of an applications code. Additionally, in the Game constructor the board object's class is instantiated allowing for an array of all the board's spaces to be created in the Board object's class. Finally, in the Game object the players() function is executed. The players() function instantiates both Player object classes, passing in data pertaining to each player.  Both Player object classes are stored in a returned array.  This array will be accessed at various points when player information is required. Thus, the Game constructor method is used as a control point for the rest of the application, establishing a stream of communication to the Game object, making the Game object easily accessible to all other parts of the application. Object-oriented JavaScript allows for an organized and efficient way of writing code that makes sense. 

## Programming For All Possibilities
![Defence-Loops-Conditions-Image](https://user-images.githubusercontent.com/77469447/128060406-4ec3af62-f76d-4246-8f58-2132d25e8835.PNG)

In order to account for all possibilities in terms of player moves, I had to write many conditional statements to determine which player was active, what spaces were available for the player to move onto, which weapons were being picked up and ect.  In the above image, I first create a condition determining if the score is zero.  Another set of conditions determines who the active player is.  Throughout the application loops were used to loop through many arrays storing data, such as data pertaining to players and board spaces. I learned many new ways to write conditional and loops in order to achieve more complex functionality.

## Use of jQuery
I used jQuery throughout my application to write more concise code in a more readable syntax then vanilla JavaScript.  The use of jQuery reduced the overall amount of time I spent on my application, and made JavaScript a more pleasant programming language to work with.

## Conclusion
![Game-Over-Message](https://user-images.githubusercontent.com/77469447/128060489-7ee1a452-08e4-43e6-aeac-fc68bcf1ac56.PNG)

In conclusion, the challenge of building a board game using object-oriented JavaScript taught me the importance of writing JavaScript that has effective streams of data communication and storage, which are all accessible from one main control point.  Furthermore, I enhanced my understanding of conditions, loops, arrays, objects and functions in order to be able to program for a more complex application then in previous projects. Finally, I learned and successfully used jQuery to more efficiently write JavaScript.  I look forward to using my new understanding of JavaScript to write more complex and concise code in the future.
