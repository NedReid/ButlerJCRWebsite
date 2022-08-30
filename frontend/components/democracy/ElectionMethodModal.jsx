import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import React from "react";
import {Modal, Button} from "react-daisyui"
import {methodEnum, methodName} from "../../models/roles/roleEnums";

class ElectionMethodModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false}
    }
    render()
    {
        return <>
            <button className="text-blue-700" onClick={() => this.setState({open: true})}>{this.props.text}</button>
            <Modal open={this.state.open} onClickBackdrop={() => this.setState({open: false})}>
                <Modal.Header>
                    {methodName(this.props.method)} Elections
                </Modal.Header>
                <Modal.Body>
                    {this.props.method === methodEnum.m1 && <div>
                        <b>Method 1</b> is the election method we use for our <b>Executive Committee Elections</b> at Butler!
                        For this method, you are allowed to create a <b>Poster</b>, <b>Promotional Image</b>, <b>Manifesto</b>, and <b>Promotional Video </b>
                        in order to advertise your campaign!
                        <br/>
                        There is a <b>Period of Campaigning</b> before the election, and husts are 4 minute max (5 minutes for President and FACSO).
                        You need to make sure you speak to the Sabbs before running for these roles, and follow the individual requirements for these roles in the SOs!
                    </div>
                    }
                    {this.props.method === methodEnum.m2 && <div>
                        <b>Method 2</b> is what we use for most roles within the JCR! You can run for these roles on the spot, but it's recommended talking
                        to Democracy Committee and/or the previous officers before running! Also check the SOs for role to find out any specific requirements for running!
                        <br/>
                        All you need to prepare (with some exceptions!) is an up-to 3-minute hust to read in the JCR Meeting! People will then allowed to ask questions to you.
                        Your candidacy will then be voted upon either in-meeting or online.
                    </div>
                    }
                    {this.props.method === methodEnum.m2a && <div>
                        <b>Method 2a</b> is what we use for some of the reps within the JCR! You can run for these roles on the spot, but it's recommended talking
                        to Democracy Committee and/or the previous officers before running!
                        <br/>
                        In order to run for a 2a role, you must identify as a member of the group you are representing. All you need to prepare is an up-to 3-minute hust to read in the JCR Meeting! People will then allowed to ask questions to you.
                        Your candidacy will then be voted upon online.
                    </div>
                    }
                    {this.props.method === methodEnum.m3 && <div>
                        <b>Method 3</b> is the method we generally use for our <b>Exec Assistants</b>.
                        These roles are generally elected through application process and/or interview.
                    </div>
                    }
                    <Modal.Actions>
                        <Button onClick={() => this.setState({open: false})}>Close</Button>
                    </Modal.Actions>
                </Modal.Body>

            </Modal>
        </>
    }
}

export default ElectionMethodModal;