# Guess
A quiz web-app that generates questions about songs’ lyrics.
  
## Four Components
1. Header
2. Question
3. Video List
4. Leader-Board.
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/Capture.PNG?raw=true" width="640" height="360"/>

Not in Component: Score UI, Name, Sticky Social Media Buttons.

## Question Area
Get New Question Button → Has Loading State for FeedBack during loading.
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/GetQ.PNG?raw=true" width="640" height="140"/>
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/Loading.PNG?raw=true" width="640" height="140"/>


→ It generates question by calling the API. The API will then first get one random transcription that has a videoID and the webapp will pus it to the array.
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/GetRandomVideo.PNG?raw=true" width="720" height="32"/>

→ It will then get two other random videos that are guarateed to be different from each other.
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/GetRandomTranscription.PNG?raw=true" width="720" height="32"/>

→ Because they are different calls of random there is a chance that the second call will have one of the same video, but I made it so the if one of them is the same it just discard the same one.


<img src="https://github.com/Sakyawira/Guess/blob/master/docs/qGenerated.png" width="640" height="360"/> <img src="https://github.com/Sakyawira/Guess/blob/master/docs/correct.png?raw=true" width="640" height="360"/>

The Choices → Assign the one with transcription to a button that handles on correct click, which increment the score.
→ and the other one to the on false click which decrement the lives.
 So once we have the three / two videos. We will shuffle the array before printing them as buttons.
 

<img src="https://github.com/Sakyawira/Guess/blob/master/docs/lastlive.png?raw=true" width="640" height="360"/> <img src="https://github.com/Sakyawira/Guess/blob/master/docs/replay.png?raw=true" width="640" height="360"/>

Replay → So once the lives are gone. I use a replay button to reset the question, the scores and the lives.
Something else will also pop up that allows you to enter your name.
Which once it finishes sending the data to the API, it will scrolll the window to the leader-board section.


## Leader Board


