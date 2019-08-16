import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import * as React from 'react'

interface IState {
    input: string,
    isCorrect: any,
    isFirst: any,
    isLoading: any,
    isNewQuest: any,
    lives: number,
    result: any,
    score: number,
    scrollY: any,
    body: any,
    question: any,
    wrongResult: any,
}

interface IProps {
    currentVideo: any,
    iScore: any,
    isDarkMode: any,
    iLives: any,
    play: any,
}

export default class QuestionArea extends React.Component<IProps, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            body: [],
            input: "",
            isCorrect: "",
            isFirst: true,
            isLoading: false,
            isNewQuest: true,
            lives: 3,
            question: [],
            result: [],
            score: 0,
            scrollY: 0,
            wrongResult: [],
        }
    }

    public reset = () => {
        this.setState({ score: 0 });
        this.setState({ lives: 3 });
        this.props.iScore(0);
        this.props.iLives(3);
        this.setState({ question: [] });
        this.setState({ body: [] });
        this.setState({ isCorrect: "" });
    }

    // make a reference that allows App.tsx to access updateList from video.tsx
    public listMounted = (callbacks: any) => {
        //   this.setState({ updateVideoList: callbacks })
    }
    // Handle the creation of question
    public GenerateQuestion = () => {
        this.props.iScore(this.state.score);
        this.props.iLives(this.state.lives);

        let inumber: number = 0;
        let runnumber: number = 2;

        if (this.state.isFirst === false) {
            runnumber = 1;
        }

        while (inumber < runnumber) {
            this.setState({ isNewQuest: true });
            this.setState({ isLoading: true });

            fetch("https://guesssongapi.azurewebsites.net/api/Videos/GetRandomVideo", {
                headers: {
                    Accept: "text/plain"
                },
                method: "GET"

                // convert the response to json
            }).then(response => {

                return response.json()

                // convert the result to a table
            }).then(answer => {
                this.setState({ wrongResult: answer })
            })

            // Get Random transcription and change its like value
            fetch("https://guesssongapi.azurewebsites.net/api/Transcriptions/GetRandomTranscription", {
                headers: {
                    Accept: "text/plain"
                },
                method: "GET"

                // convert the response to json
            }).then(response => {

                return response.json()

                // convert the result to a table
            }).then(answer => {
                this.setState({ result: answer }, () => this.makeTableBody())

            })
            inumber += 1;
        }
        this.setState({
            isCorrect: ""
        });
        this.setState({ scrollY: 0 });
    }

    public makeFav = (video: any) => {
        // Create the object to send
        const toSend = [{
            "from": "",
            "op": "replace",
            "path": "/isFavourite",
            "value": true,
        }]
        fetch("https://guesssongapi.azurewebsites.net/api/Videos/update/" + video.videoId, {
            body: JSON.stringify(toSend),
            headers: {
                // Tell the fetch so it knows what to accept 
                Accept: "text/plain",
                // Tell the fetch to know the type of the content
                "Content-Type": "application/json-patch+json"
            },
            method: "PATCH"
        })
    }

    public handleRightAnswer = (video: any, timedURL: string) => {
        // scroll the window to the top

        // play video at the specific time
        if (this.state.isNewQuest === true && this.state.lives !== 0) {
            this.props.play(video.webUrl + "&t=" + timedURL + "s")

            this.setState({
                isCorrect:
                    <Button variant={'outline-success'} size="sm" disabled={true}>
                        "Correct!"
            </Button>
            });

            const n: number = this.state.score;
            this.setState({ score: n + 100 });
            this.props.iScore(n + 100);

            this.setState({ scrollY: 78 });

            this.setState({ isNewQuest: false });

        }
        else if (this.state.lives === 0) {
            this.setState({
                isCorrect:
                    <Button variant={'outline-danger'} size="sm" disabled={true}>
                        ""You have run out of lives! Reload to play again!""
                    </Button>
            });
        }
        else {
            this.setState({
                isCorrect:
                    <Button variant={'outline-secondary'} size="sm" disabled={true}>
                        Click here =>
            </Button>
            });
            this.setState({ scrollY: 0 });
        }
    }

    public handleWrongAnswer = () => {
        if (this.state.isNewQuest === true && this.state.lives !== 0) {
            this.setState({ isNewQuest: false });

            // this.setState({lives : this.state.lives - 1});
            this.setState({ scrollY: 0 });
            this.setState({ isCorrect: <Button variant={'outline-danger'} size="sm" disabled={true}> "Wrong!"</Button> });

            const n: number = this.state.lives;
            console.log(n);
            this.setState({ lives: n - 1 });

            console.log(n);


            this.props.iLives(n - 1);

        }

        else if (this.state.lives === 0) {
            this.setState({
                isCorrect:
                    <Button variant={'outline-danger'} size="sm" disabled={true}>
                        ""You have run out of lives! Reload to play again!""
                    </Button>
            });
        }

        else {
            this.setState({
                isCorrect:
                    <Button variant={'outline-secondary'} size="sm" disabled={true}>
                        Click here =>
           </Button>
            });
            this.setState({ scrollY: 0 });
        }
    }

    // Make a table
    public makeTableBody = () => {
        let questionId: any = 0;
        const toRet: any[] = [];
        const toRet2: any[] = [];

        this.state.result.forEach((video: any) => {
            let pushedID: any;
            // for each video's transcription
            video.transcription.forEach((caption: any) => {
                // make a table row for each transcription (caption)

                // if pushedID (the id of the video that has just been pushed) is not equal to the current video's id
                // the video is null
                if (pushedID !== video.videoId && video != null) {
                    toRet2.push
                        (
                            // Push the caption into an array
                            <td className="align-left">
                                <td>"{caption.phrase}"</td>
                            </td>
                        )
                }
                pushedID = video.videoId;
            })
        });

        this.state.result.forEach((video: any) => {
            let pushedID: any;
            // for each video's transcription
            video.transcription.forEach((caption: any) => {

                // make a table row for each transcription (caption)
                // if pushedID (the id of the video that has just been pushed) is not equal to the current video's id
                if (pushedID !== video.videoId && video != null) {
                    toRet.push
                        (

                            <div className={this.props.isDarkMode === false ? "table" : "table-dark"}>
                                <Button
                                    variant={this.props.isDarkMode === false ? "link" : "link"}
                                    size="sm"
                                    disabled={false}>
                                        
                                    <td className="align-left" onClick={() => this.handleRightAnswer(video, caption.startTime)}><img src={video.thumbnailUrl} width="130px" alt="Thumbnail" /></td>
                                    <td className="align-right" onClick={() => this.handleRightAnswer(video, caption.startTime)}><b>{video.videoTitle}</b></td>
            
                                </Button>

                            </div>
                        )
                }
                pushedID = video.videoId;
                // Set the question id to the one pushed last
                questionId = video.videoId;
            })
        });

        // declare and set the currentID to 0
        let currentId: any = 0;

        console.log(toRet);
        // runs up to here

        this.state.wrongResult.forEach((video: any) => {
            currentId = video.videoId;
            if (currentId !== questionId) {

                let pushedID: any;

                // for each video's transcription
                video.transcription.forEach((caption: any) => {
                    // make a table row for each transcription (caption)

                    if (pushedID !== video.videoId && video != null) {
                        toRet.push(

                            <div className={this.props.isDarkMode === false ? "table" : "table-dark"}>
                                <Button
                                    variant={this.props.isDarkMode === false ? "link" : "link"}
                                    size="sm"
                                    disabled={false}
                                >

                                    <td className="align-left" onClick={() => this.handleWrongAnswer()}><img src={video.thumbnailUrl} width="130px" alt="Thumbnail" /></td>
                                    <td className="align-right" onClick={() => this.handleWrongAnswer()}><b>{video.videoTitle}</b></td>

                                </Button>
                            </div>
                        )
                    }

                    pushedID = video.videoId;
                })
            }
        });

        // if the length of the table row is 0
        if (toRet.length === 1) 
        {
            // if the input was empty
        }
        else {
            this.shuffleInPlace(toRet);
            console.log(toRet);
            this.setState({ body: toRet2 })
            this.setState({ question: toRet })
        }
        if (this.state.isFirst === false) {
            this.setState({ isLoading: false });
        }
        this.setState({ isFirst: false });
    }

    public shuffleInPlace<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const swap = array[i];
            array[i] = array[j];
            array[j] = swap;
        }
        return array;
    }


    public render() {

        return (

            <div className={this.props.isDarkMode === true ? "caption-area-dark" : "caption-area"}>
                <Container>

                    <Row>
                        <Col xs={12} md={8} lg={8}>
                            <h1 ><span className="lyric-heading">Which song contains these lyrics?</span></h1>

                        </Col>

                        <Col xs={12} md={2} lg={2}>
                            {this.state.isCorrect}

                        </Col>
                        <Col xs={12} md={2} lg={2}>
                            {this.state.lives === 0 ?
                                <Button
                                    variant="warning"
                                    size="sm"
                                    disabled={this.state.isLoading}
                                    onClick={() => this.reset()}
                                >
                                    {this.state.isLoading ? 'Loading…' : 'Replay'}
                                    {this.state.isLoading ?

                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        : null}
                                </Button>
                                :
                                <Button
                                    variant="danger"
                                    size="sm"
                                    disabled={this.state.isLoading}
                                    onClick={() => this.GenerateQuestion()}
                                >
                                    {this.state.isLoading ? 'Loading…' : 'Get new question'}
                                    {this.state.isLoading ?

                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        : null}
                                </Button>
                            }
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={7} lg={8}>
                            <h1 ><span className={this.props.isDarkMode === true ? "hWhite" : ""}>{this.state.body}</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        {/* make a table */}

                        {/* videos*/}
                        <Col xs={12} md={7} lg={4}>
                            <th>  {this.state.question[0]}</th>
                        </Col>

                        <Col xs={12} md={7} lg={4}>
                            <th>  {this.state.question[1]}</th>
                        </Col>

                        <Col xs={12} md={7} lg={4}>
                            <th>  {this.state.question[2]}</th>
                        </Col>
                    </Row>
                    {/* make a table content */}
                    <Row>
                        <Col xs={12} md={7} lg={7}>
                            {/* feedback */}

                        </Col>
                        {window.scrollTo(0, this.state.scrollY)}
                    </Row>


                </Container>

            </div>

        )
    }
}