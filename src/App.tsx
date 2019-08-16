import * as React from 'react';
import ReactPlayer from 'react-player';
import { StickyShareButtons } from 'sharethis-reactjs';
import QuestionArea from 'src/Components/QuestionArea';
import Header from 'src/Components/Header';
import VideoList from 'src/Components/VideoList';
import 'src/App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Spinner from 'react-bootstrap/Spinner';

interface IState {

  body: any,
  hubConnection: any,
  input: string,
  isBoardHidden: any,
  isDarkMode: any,
  isLoading: any,
  lives: any,
  player: any,
  playingURL: string,
  result: any,
  score: number,
  updateVideoList: any,
  usersCountCurrent: any,
  videoList: object,
}

class App extends React.Component<{}, IState>{
  public signalR = require("@aspnet/signalr");
  public constructor(props: any) {
    super(props);
    this.state = {
      body: [],

      hubConnection: new this.signalR.HubConnectionBuilder().withUrl("https://guesssongapi.azurewebsites.net/hub").build(),
      input: "",
      isBoardHidden: true,
      isDarkMode: this.getSavedMode(),
      isLoading: false,
      lives: 3,
      player: null,
      playingURL: "",
      result: [],
      score: 0,
      updateVideoList: null,
      usersCountCurrent: 0,
      videoList: [],
    }
  }

  // A function to print the LeaderBoard
  public printBoard = () => {
    fetch('https://guesssongapi.azurewebsites.net/api/LeaderBoards', {
      method: 'GET'

      // if returned, then convert into .json
    }).then((ret: any) => {
      return ret.json();

      // If succesful then 
    }).then((result: any) => {
      const output: any[] = []

      // for each Player that we get, we sort it so the one with highest score is at top
      result.sort((a: any, b: any) => {
        if (a.score > b.score) {
          return -1;
        }
        else if (a.score < b.score) {
          return 1;
        }
        return 0;
      });

      result.forEach((player: any) => {
        const row = (<tr>
          <td className="align-middle" >{player.playerName}</td>
          <td className="align-middle" >{player.score}</td>
        </tr>)

        output.push(row);
        console.log(row);
      });
      // Set this to the output
      this.setState({ body: output });
      this.setState({ isLoading: false });
      window.scrollTo(0, window.innerHeight);
    })
  }

  // A function that will make the 'player' state to refer to the passed in parameter
  public setRef = (playerRef: any) => {
    this.setState({
      player: playerRef
    })
  }
  // A function to add the video, which accepts a string called url
  public addVideo = (url: string) => {
    const body = { "url": url }
    fetch("https://guesssongapi.azurewebsites.net/api/Videos", {
      body: JSON.stringify(body),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(() => {
      this.state.updateVideoList();
    }).then(() => { this.state.hubConnection.invoke("AddVideo") });
  }

  // A function to add your name at the end of the game
  // Your name will then be linked to the score and send to the database
  public addPlayer = (name: string) => {
    this.setState({ isLoading: true });

    const body = { "playerName": name, "score": this.state.score }

    fetch("https://guesssongapi.azurewebsites.net/api/LeaderBoards", {

      // convert body to a string
      body: JSON.stringify(body),

      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json"
      },
      // use POST method to send content to the API
      method: "POST"

      // call the updateVideoList which calls the updateVideo function in VideoList.tsx
    }).then(() => {
      this.leaderBoardSwitch();
    }).then(() => { this.state.hubConnection.invoke("AddVideo") });
  }

  // Update the URL to change the video we are playing
  public updateURL = (url: string) => {
    // check if it is currently playing the passed in url
    if (this.state.playingURL === url) {
      // react video player quirk -> if we give it the same url, it won't update to go back to where we wanted to
      // set playing url into an empty string
      // set state can have a callback function so we pass in another set state that set it to our passed in url
      this.setState({ playingURL: "" }, () => this.setState({ playingURL: url }))
    } else {
      // else set the playing url to url
      this.setState({ playingURL: url })
    }
  }

  public updateScore = (iScore: number) => {
    this.setState({ score: iScore });
    console.log(this.state.score);

  }

  public updateLives = (iLives: number) => {
    this.setState({ lives: iLives });
    console.log(this.state.lives);

  }

  // make a reference that allows App.tsx to access updateList from video.tsx
  public listMounted = (callbacks: any) => {
    this.setState({ updateVideoList: callbacks })
  }

  public componentDidMount = () => {
    this.state.hubConnection.on("Join", () => {
      console.log('A new user has joined the game.');
    });

    this.state.hubConnection.on("UpdateVideoList", () => {
      this.state.updateVideoList();
      console.log('A new video has been added!');
    });
    this.state.hubConnection.on("CountUsers", (usersCount: any) => {
      console.log(usersCount);
      this.setState({ usersCountCurrent: usersCount });
    });


    this.state.hubConnection.start().then(() => this.state.hubConnection.invoke("BroadcastMessage"));
  }
  // Set a mode and save that mode to the local storage
  public setDarkMode = () => {
    const iDarkMode: boolean = this.state.isDarkMode;
    this.setState({ isDarkMode: !iDarkMode });

    localStorage.setItem("isDark", JSON.stringify(!iDarkMode));

  }
  // Get the saved mode from local storage
  public getSavedMode() {
    const isUser: any = "isDark" in localStorage;
    let savedMode: string;
    const savedJson: any = localStorage.getItem("isDark");
    savedMode = savedJson !== null ? JSON.parse(savedJson) : '{}';

    if (isUser) {
      return savedMode;
    }
    else {
      return false;
    }
  }

  // Hide / Unhide LeaderBoards
  public leaderBoardSwitch = () => {
    const iBoardHidden: boolean = this.state.isBoardHidden;
    this.setState({ isBoardHidden: !iBoardHidden });
    this.printBoard();
  }

  public render() {

    const style = {
      display: 'inline-flex',
      fontSize: 25,
      verticalAlign: 'middle',
    }
    return (

      <div className={this.state.isDarkMode === true ? "body-dark" : "body-light"}>
        <div className={this.state.isDarkMode === true ? "body-dark" : "body-light"}>
          <style dangerouslySetInnerHTML={{
            __html: `
          html, body {
            margin: 0;
            padding: 0;
            text-align: center;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
          }
          hr {
            margin-bottom: 40px;
            margin-top: 40px;
            width: 50%;
          }
        `}} />

          <StickyShareButtons
            config={{
              alignment: 'left',    // alignment of buttons (left, right)
              color: 'social',      // set the color of buttons (social, white)
              enabled: true,        // show/hide buttons (true, false)
              font_size: 16,        // font size for the buttons
              hide_desktop: false,  // hide buttons on desktop (true, false)
              labels: 'counts',     // button labels (cta, counts, null)
              language: 'en',       // which language to use (see LANGUAGES)
              min_count: 0,         // hide react counts less than min_count (INTEGER)
              networks: [           // which networks to include (see SHARING NETWORKS)
                'linkedin',
                'facebook',
                'twitter',
                'pinterest',
                'reddit'
              ],
              padding: 12,          // padding within buttons (INTEGER)
              radius: 4,            // the corner radius on each button (INTEGER)
              show_mobile: true,    // show/hide the buttons on mobile (true, false)
              show_toggle: true,    // show/hide the toggle buttons (true, false)
              show_total: true,     // show/hide the total share count (true, false)


              size: 48,             // the size of each button (INTEGER)
              top: 260,             // offset in pixels from the top of the page


            }}
          />

        </div>
        {/* call the addVideo function */}
        <Header addVideo={this.addVideo} isDarkMode={this.state.isDarkMode} setDarkMode={this.setDarkMode} />
        {/* render the caption area */}
        <Container>

          <Row>
            <Col xs={12} md={12} lg={12}>
              <Button
                variant="link"
                size="sm"
                disabled={true}>
                <Badge pill={true} variant="success">&nbsp;</Badge>
                <span style={style}><b> &nbsp;{this.state.usersCountCurrent} online</b></span>
              </Button>

              <Button
                variant="link"
                size="sm"
                disabled={true}>
                <Badge pill={true} variant="warning">&nbsp;</Badge>
                <span style={style}><b> &nbsp;{this.state.score} points</b></span>
              </Button>

              <Button
                variant="link"
                size="sm"
                disabled={true}>
                <Badge pill={true} variant="danger">&nbsp;</Badge>
                <span style={style}><b> &nbsp;{this.state.lives} lives</b></span>
              </Button>
            </Col>
          </Row>
          <Row>
            {this.state.lives === 0 ?
              <Col xs={12} md={12} lg={12}>
                <TextField
                  id={this.state.isDarkMode === true ? "Search-Bar-Dark" : "Search-Bar"}
                  className="SearchBar"
                  placeholder="Enter your name"
                  margin="dense"
                  variant="outlined"
                  onChange={(event: any) => this.setState({ input: event.target.value })}
                  value={this.state.input}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        disabled={this.state.isLoading}
                        onClick={() => this.addPlayer(this.state.input)}
                      >
                        {this.state.isLoading ? <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        /> : '+'}

                      </Button>
                    </InputAdornment>,
                  }}
                />

              </Col>
              : null}
          </Row>
        </Container>
        <Container>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <QuestionArea isDarkMode={this.state.isDarkMode} iLives={this.updateLives} iScore={this.updateScore} currentVideo={this.state.playingURL} play={this.updateURL} />
            </Col>
          </Row>
          <Row>
            <h1>&nbsp;</h1>
          </Row>
          <Row>
            <Col xs={12} md={5} lg={7}>

              <ReactPlayer
                className="player"
                ref={this.setRef}
                controls={true}
                // a state to know what video is currently playing
                url={this.state.playingURL}
                width="100%"
                height= "404px"
                playing={true}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 },
                    preload: true
                  }
                }
                }
              />
            </Col>

            <Col xs={12} md={7} lg={5}>

              {/* render the video list */}
              <VideoList isDarkMode={this.state.isDarkMode} addVideo={this.addVideo} play={this.updateURL} mount={this.listMounted} hubConnection={this.state.hubConnection} />

            </Col>
          </Row>

          <Row>
            <h1>&nbsp;</h1>
          </Row>

          <Row>
         
          {/* </Row>

        
            <Row> */}
            {/* <Col xs={12} md={1} lg={1}>
          
          </Col> */}
              <Col xs={12} md={12} lg={12}>
                <table className={this.state.isDarkMode === true ? "table dark" : "table"} >
                  <tr className="lyric-heading">
                  
                    <th> <Button
                      variant={this.state.isBoardHidden === true ? "link" : "link"}
                      size="sm"
                      disabled={this.state.isLoading}
                      onClick={() => this.leaderBoardSwitch()}  >
                      {this.state.isBoardHidden === true ? 'V' : '^'}
                    </Button>Player Name</th>
                    <th><Button
                      variant={this.state.isBoardHidden === true ? "link" : "link"}
                      size="sm"
                      disabled={this.state.isLoading}
                      onClick={() => this.leaderBoardSwitch()}  >
                      {this.state.isBoardHidden === true ? 'V' : '^'}
                    </Button>Score</th>


                  </tr>

                  <tbody>
                  {this.state.isBoardHidden === false ?
                    this.state.body
                    :
                    null
                  }
                  </tbody>
                </table>

              </Col>
            </Row>
           
          <Row>
            <h1>&nbsp;</h1>
          </Row>
          <Row>
            <h1>&nbsp;</h1>
          </Row>
          <Row>
            <h1>&nbsp;</h1>
          </Row>
        </Container>

      </div>

    )
  }
}

export default App;