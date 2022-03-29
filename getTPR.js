function getTPR(input1, input2) { /* input1 and input2 are one-column, multi-row arrays from a spreadsheet; any subsequent columns are
ignored. input1 includes opponent ratings and input2 are the respective results the player received (either 0, 0.5, or 1). */
  var currentProbability = 1.0; /* This is the probability of each given result occurring with a player rated x. x is incremented and
  currentProbability resets before every iteration. */
  var highestProbability = 0.0; /* This is the probability of each given result occurring with a player rated currentTPRTimesTen. After
  each iteration, currentProbability is compared to highestProbability. */
  var currentTPRTimesTen = 0.0; /* This is the value that outputs the highest probability of each given result occuring. It is
  equal to ten times the rating value, so a 2650.5 rating would lead to a currentTPRTimesTen value of 26505. This allows for smaller
  increments. */

  for(var x=0; x<=40000; x++){ /* Increments x 40,000 times, which goes through every rating value from 0 to 4000. This can be increased
  if necessary. */
    currentProbability=1; // Resets currentProbability to 1 before each iteration.

    for(var i=0; i<input1.length; i++){ // Loops through each row in the inputted array
      if(input2[i][0]==1){ // If the player won
        currentProbability*=Math.pow(1+Math.pow(10, (input1[i][0]-x/10)/400.0), -1); // currentProbability multiplies by expected score.
      }
      if(input2[i][0]==0.5){ // If the player got a draw
        currentProbability*=Math.pow(1+Math.pow(10, (input1[i][0]-x/10)/400.0), -0.5); /* currentProbability mulitplies by sqrt(expected
        score). */
        currentProbability*=Math.pow(1+Math.pow(10, (x/10-input1[i][0])/400.0), -0.5); /* currentProbability multiplies by sqrt(1 - 
        expected score). */
      }
      if(input2[i][0]=="0"){ // if the player lost
        currentProbability*=Math.pow(1+Math.pow(10, (x/10-input1[i][0])/400.0), -1); /* currentProbability mulitplies by (1 - expected
        score) */
      }
    }

    if(currentProbability>highestProbability){ // If currentProbability exceeds highestProbability
      highestProbability=currentProbability; // highestProbability is set to currentProbability.
      currentTPRTimesTen=x; // currentTPRTimesTen is equal to the rating value that yielded currentProbability.
    }
  }

  return currentTPRTimesTen/10; // Outputs the player's TPR, which is currentTPRTimesTen divided by ten.
}
