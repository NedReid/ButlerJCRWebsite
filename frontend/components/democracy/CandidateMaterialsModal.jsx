import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import React from "react";
import {Modal, Button, Collapse} from "react-daisyui"
import {methodEnum, methodName} from "../../models/roles/roleEnums";
import ElectionMethodModal from "./ElectionMethodModal";
import parse from "html-react-parser";
import {tailwindParse} from "../../helpers/tailwindParse";

class CandidateMaterialsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false}
    }
    render()
    {
        let candidate = this.props.candidate;
        let rName = this.props.rName;
        return <><div onClick={() => this.setState({open:true})} className="group relative hover:cursor-pointer w-48 h-48">
                <img className="w-full object-contain absolute"
                     src={candidate.promotionalImage !== undefined && candidate.promotionalImage.length > 0 ? "../../" + candidate.promotionalImage : "../../media/global/JCRLogo.png"}>
                </img>
                <div
                    className="bg-opacity-0 transition group-hover:block absolute h-full w-full group-hover:bg-opacity-20 bg-slate-900"></div>
                <div className="hidden group-hover:block transition group-hover:animate-fadein">
                    <div className="<absolute translate-y-32 h-16 w-full bg-opacity-60 bg-slate-900 text-white text-sm">
                        <b>{candidate.name}</b>
                        <br/>
                        For <b>{rName}</b>
                    </div>
                </div>

            </div>
            <Modal className="w-5/6 max-w-4xl h-fit" open={this.state.open} onClickBackdrop={() => this.setState({open: false})}>
                <Modal.Header>{candidate.name} For {rName}</Modal.Header>
                <Modal.Body className="h-max" >
                    {(candidate.poster !== undefined && candidate.poster.length > 0) && <Collapse className={"group bg-slate-100"} checkbox={true} icon="arrow">
                        <Collapse.Title className="group-hover:bg-slate-200 text-xl font-semibold">Poster</Collapse.Title>
                        <Collapse.Content className="bg-slate-50">
                            <img className="w-full max-h-[70vh] object-contain"
                                 src={candidate.poster !== undefined && candidate.poster.length > 0 ? "../../" + candidate.poster : "../../media/global/JCRLogo.png"}>
                            </img>
                        </Collapse.Content>
                    </Collapse>}
                    {(candidate.manifesto !== undefined && candidate.manifesto.length > 0) !== undefined && <Collapse className={"group bg-slate-100"} checkbox={true} icon="arrow">
                        <Collapse.Title className="group-hover:bg-slate-200 text-xl font-semibold">Manifesto</Collapse.Title>
                        <Collapse.Content className="bg-slate-50">
                            <div className="bangle-editor prose max-w-none text-left">
                                {parse(tailwindParse(candidate.manifesto))}
                            </div>
                        </Collapse.Content>
                    </Collapse>}
                    {(candidate.video !== undefined && candidate.video.length > 0)  !== undefined && <Collapse className={"group bg-slate-100"} checkbox={true} icon="arrow">
                        <Collapse.Title className="group-hover:bg-slate-200 text-xl font-semibold">Video</Collapse.Title>
                        <Collapse.Content className="bg-slate-50">
                            <div className="bangle-editor prose max-w-none">
                                <iframe className="w-full max-w-lg aspect-video" src={candidate.video.replace("watch?v=", "embed/")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
                            </div>
                        </Collapse.Content>
                    </Collapse>}

                </Modal.Body>

            </Modal>
            </>
    }
}

export default CandidateMaterialsModal;