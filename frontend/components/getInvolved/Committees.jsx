import React from "react";
import { getSSCHeaders } from "../../helpers/getInvolvedHelper";
import { useNavigate } from "react-router-dom";
import { SSCEnum } from "../../models/SSCEnum";
import SSCHeader from "./SSCHeader";

class CommitteesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { SSCs: [] };
    }

    async componentDidMount() {
        const SSCs = await getSSCHeaders();
        this.setState({ SSCs: SSCs });
        console.log(SSCs);
    }

    editPage = (id) => {
        this.props.navigate("edit/" + id, { replace: false });
    };

    goToPage = (slug) => {
        this.props.navigate(slug, { replace: false });
    };

    render() {
        return (
            <div className="my-2 p-8">
                <div className="text-4xl font-bold">Committees</div>
                Committees are made up of elected chairs and any members who would like to join, as
                well as any other exec members who are internally elected.
                <br /> Committees have a purpose, like welfare committee or democracy committee.
                They are an integral part of college and help keep the JCR running smoothly.
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {this.state.SSCs.filter((ssc) => {
                        return ssc.type === SSCEnum.committee;
                    }).map((ssc) => {
                        return (
                            <SSCHeader
                                key={ssc._id}
                                editPage={this.editPage}
                                goToPage={this.goToPage}
                                ssc={ssc}
                                username={this.props.username}
                            ></SSCHeader>
                        );
                    })}
                </div>
            </div>
        );
    }
}
const Committees = (props) => {
    const navigate = useNavigate();

    return <CommitteesComponent {...props} navigate={navigate} />;
};

export default Committees;
