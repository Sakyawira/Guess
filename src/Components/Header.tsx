import * as React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { InlineFollowButtons } from 'sharethis-reactjs';

interface IProps {
    addVideo: any,
    isDarkMode: any,
    setDarkMode: any,
}

interface IState {
    input: string
}

export default class Header extends React.Component<IProps, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            input: ""
        }
    }

    public addVideo = () => {
        this.props.addVideo(this.state.input)
    }
    public setDarkMode = () => {
        this.props.setDarkMode();
    }

    public render() {
        return (

            <div className={this.props.isDarkMode === true ? "header-dark" : "header"}>
                <Container>
                    <Row>
                        <Col xs={12} md={3} lg={3}>
                            <h2><span className="red-heading2">Guess</span>The Song</h2>
                        </Col>
                        <Col xs={3} md={2} lg={5}>
                        <div className="toggle-container">
                            <span style={{ color: this.props.isDarkMode ? "grey" : "orange" }}>☀︎</span>
                            <span className="toggle">
                                <input
                                    checked={this.props.isDarkMode}
                                    onChange={() => this.setDarkMode()}
                                    id="checkbox"
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <label htmlFor="checkbox" />
                            </span>
                            <span style={{ color: this.props.isDarkMode ? "slateblue" : "grey" }}>☾</span>

                        </div>
                        </Col>
                        <Col xs={9} md={7} lg={4}>
                            <InlineFollowButtons
                                config={this.props.isDarkMode === true ?
                                    {
                                        action: "", // call to action (STRING)
                                        action_enable: true,  // show/hide call to action (true, false)
                                        action_pos: 'left', // position of call to action (left, top, right)
                                        alignment: 'right',  // alignment of buttons (left, center, right)
                                        color: 'white', // set the color of buttons (social, white)
                                        enabled: true,        // show/hide buttons (true, false)
                                        networks: [         // which networks to include (see FOLLOW NETWORKS)
                                            'github',
                                            'instagram',
                                            'facebook',
                                            'twitter',
                                            // 'youtube',

                                        ],
                                        padding: 8,           // padding within buttons (INTEGER)
                                        profiles: {           // social profile links for buttons
                                            facebook: 'sakyawira.nandaruslim?ref=bookmarks',
                                            github: 'sakyawira',

                                            instagram: 'sakyawira',
                                            twitter: 'sakyawira',


                                            // youtube: '/channel/UC6eh_JZFR8O9w-de4sIjR5g?view_as=subscriber'
                                        },
                                        radius: 9,            // the corner radius on each button (INTEGER)
                                        size: 32,             // the size of each button (INTEGER)
                                        spacing: 8            // the spacing between buttons (INTEGER)
                                    }
                                    :

                                    {
                                        action: "", // call to action (STRING)
                                        action_enable: true,  // show/hide call to action (true, false)
                                        action_pos: 'left', // position of call to action (left, top, right)
                                        alignment: 'right',  // alignment of buttons (left, center, right)
                                        color: 'social', // set the color of buttons (social, white)
                                        enabled: true,        // show/hide buttons (true, false)
                                        networks: [         // which networks to include (see FOLLOW NETWORKS)
                                            'github',
                                            'instagram',
                                            'facebook',
                                            'twitter',
                                            // 'youtube',

                                        ],
                                        padding: 8,           // padding within buttons (INTEGER)
                                        profiles: {           // social profile links for buttons
                                            facebook: 'sakyawira.nandaruslim?ref=bookmarks',
                                            github: 'sakyawira',

                                            instagram: 'sakyawira',
                                            twitter: 'sakyawira',


                                            // youtube: '/channel/UC6eh_JZFR8O9w-de4sIjR5g?view_as=subscriber'
                                        },
                                        radius: 9,            // the corner radius on each button (INTEGER)
                                        size: 32,             // the size of each button (INTEGER)
                                        spacing: 8            // the spacing between buttons (INTEGER)
                                    }}
                            />

                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}
