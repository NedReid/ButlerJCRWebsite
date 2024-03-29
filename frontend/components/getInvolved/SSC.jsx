import React from "react";
import { getSSCBySlug, updateSSC } from "../../helpers/getInvolvedHelper";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../global/Loading";
import parse from "html-react-parser";
import { tailwindParse } from "../../helpers/tailwindParse";

class SSCComponent extends React.Component {
    constructor(props) {
        super(props);
        let SSCId = this.props.params["id"];
        console.log(SSCId);
        this.state = { SSC: undefined, SSCId: SSCId };
    }

    async componentDidMount() {
        const SSC = await getSSCBySlug(this.state.SSCId);
        this.setState({ SSC: SSC });
        console.log(SSC);
    }

    handleChange = (event, type) => {
        this.state.SSC[type] = event.target.value;
        console.log(this.state.SSC);
    };

    handleBoolChange = (event, type) => {
        this.state.SSC[type] = event.target.value === "true";
        console.log(this.state.SSC);
    };

    handlePage = (page) => {
        this.state.SSC.page = page;
    };

    submitButton = async () => {
        await updateSSC(this.state.SSC);

        this.props.navigate("get-involved/" + this.state.SSC.slug, { replace: false });
    };

    render() {
        console.log("RENDERING");
        if (this.state.SSC !== undefined) {
            return (
                <div className="p-4">
                    <div className="my-4 text-3xl font-semibold">{this.state.SSC.name}</div>
                    <div className="bangle-editor prose max-w-2xl">
                        {/*{parse(this.state.SSC.page)}*/}
                        {parse(tailwindParse(this.state.SSC.page))}
                    </div>
                </div>
            );
        } else {
            return <Loading></Loading>;
        }
    }
}

const SSC = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <SSCComponent {...props} params={params} navigate={navigate} />;
};
export default SSC;
