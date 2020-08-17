# Guess
A quiz web-app that generates questions about songs’ lyrics.
  
## Components
1. Header
2. [Question](https://github.com/Sakyawira/Guess#question-area).
3. [Video List](https://github.com/Sakyawira/Guess#video-list)
4. [Leader-Board](https://github.com/Sakyawira/Guess#leader-board).
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/Capture.PNG?raw=true" width="640" height="360"/>

Not in Component: Score UI, Name, Sticky Social Media Buttons.

## Features
1. [Bootstrap](https://github.com/Sakyawira/Guess#bootstrap).
2. [Social Media Integration](https://github.com/Sakyawira/Guess#social-media-integration).
3. [Unit Tests](https://github.com/Sakyawira/Guess#unit-testing).
4. [SignalR](https://github.com/Sakyawira/Guess#signalr).
5. [Accessibility](https://github.com/Sakyawira/Guess#accessibility).

## Question Area
Get New Question Button → Has Loading State for FeedBack during loading.
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/GetQ.PNG?raw=true" width="640" height="140"/>
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/Loading.PNG?raw=true" width="640" height="140"/>

"Get New Question" Button:
1. It has a Loading State for FeedBack during loading.
2. It generates a question by calling the "Get Random Transcription" API from my backend. 
3. This API call will return a random transcription and a video-ID.
4. The web app will push this video-ID to an array.

<img src="https://github.com/Sakyawira/Guess/blob/master/docs/GetRandomVideo.PNG?raw=true" width="720" height="32"/>

5. It will then get two other random videos that are guarateed to be different from each other.
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/GetRandomTranscription.PNG?raw=true" width="720" height="32"/>

6. Because they are different calls of random there is a chance that the second API call will have one of the same video, but I made it so the if one of them is the same, the webapp just discard the one of them.

<p float="left">
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/qGenerated.png" width="384" height="216"/> 
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/correct.png?raw=true" width="384" height="216"/>
</p>

7. The Choices → Assign the one with transcription to a button that handles on correct click, which increment the score.
→ and the other one to the on false click which decrement the lives.
 So once we have the three / two videos. We will shuffle the array before printing them as buttons.
 
<p float="left">
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/lastlive.png?raw=true" width="384" height="216"/> 
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/replay.png?raw=true" width="384" height="216"/>
</p>

8. Replay → So once the lives are gone. I use a replay button to reset the question, the scores and the lives.
Something else will also pop up that allows you to enter your name.
Which once it finishes sending the data to the API, it will scrolll the window to the leader-board section.


## Leader Board
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/leaderboard.png?raw=true" width="640" height="360"/>
It sorted the highest scoring player to the lowest and it has its own database table as well.
You can minimize this table and in fact it started as minimized. 


## Video List
Add button has loading state.
It is from the newest video so people can see the video that they added as soon as the loading is done.
So for this I need a new logic to put the favourite on top of them.
Because  before it pushes back which will be print last and unshift favourites which will be printed first.
Now I need to use a temporary array to store the favourite videos and push it after the rest of the video is finished push to the main array.

# Advanced Features


## Bootstrap
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/mobile.PNG?raw=true" width="640" height="420"/>
Scaleable for different Screen Sizes.

## Social Media Integration
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/Screenshot%20(250).png?raw=true" width="640" height="360"/>
Easy social media sharing.

## Accessibility
<p float="left">
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/dark.png?raw=true" width="384" height="216"/>
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/light.png?raw=true" width="384" height="216"/>
</p>
Support for Dark Mode and Light Mode.

## SignalR
<img src="https://github.com/Sakyawira/Guess/blob/master/docs/signalr.PNG?raw=true" width="640" height="140"/>
Shows you how many people are connected to the Web-App.

## Unit Testing
