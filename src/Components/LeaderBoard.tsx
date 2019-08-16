
import * as React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface IState {
    input: string,
    result: any,
    body: any,
}

interface IProps {
    currentVideo: any,
    isDarkMode: any,
    play: any,
}

export default class LeaderBoard extends React.Component<IProps, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            body: [],
            input: "",
            result: [],
        }
    }


    public render() {
        return (
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <table className={this.props.isDarkMode === true ? "table dark" : "table"} >
                        <tr className="lyric-heading">
                            <th>Player Name</th>
                            <th>Score</th>
                        </tr>
                        <tbody>
                            {this.state.body}
                        </tbody>
                    </table>
                </Col>
            </Row>
        )
    }
}