import React from "react";
import TextEditor from "../global/TextEditor";
import { getSSC, updateSSC, uploadSSCLogo } from "../../helpers/getInvolvedHelper";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../global/Loading";

class EditSSCComponent extends React.Component {
    constructor(props) {
        super(props);
        let SSCId = this.props.params["id"];
        console.log(SSCId);
        this.state = { SSC: undefined, SSCId: SSCId, logo: "" };
    }

    async componentDidMount() {
        const SSC = await getSSC(this.state.SSCId);
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

    handleImageChange = async (event) => {
        let im = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.state.logo = reader.result;
            this.forceUpdate();
        };
        reader.readAsDataURL(im);
    };

    handlePage = (page) => {
        this.state.SSC.page = page;
    };

    submitButton = async () => {
        await uploadSSCLogo({ logo: this.state.logo, id: this.state.SSC._id });
        await updateSSC(this.state.SSC);

        this.props.navigate("/get-involved/ssc/" + this.state.SSC.slug, { replace: false });
    };

    render() {
        console.log("RENDERING");
        if (this.state.SSC !== undefined) {
            return (
                <>
                    <div className="mt-4 text-3xl font-semibold">Editing {this.state.SSC.name}</div>

                    <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">
                        <label>
                            {" "}
                            SSC Name:
                            <input
                                className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                name="name"
                                type="text"
                                defaultValue={this.state.SSC.name}
                                onChange={(event) => this.handleChange(event, "name")}
                            />
                        </label>

                        <label>
                            {" "}
                            SSC Description:
                            <input
                                className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                name="name"
                                type="text"
                                defaultValue={this.state.SSC.desc}
                                onChange={(event) => this.handleChange(event, "desc")}
                            />
                        </label>

                        <label>
                            {" "}
                            SSC Slug:
                            <input
                                className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                name="name"
                                type="text"
                                defaultValue={this.state.SSC.slug}
                                onChange={(event) => this.handleChange(event, "slug")}
                                onKeyPress={(event) => {
                                    if (!/[[a-z0-9-]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </label>

                        <label> Visible:</label>
                        <span>
                            <label>
                                <input
                                    defaultChecked={this.state.SSC.visible === false}
                                    onChange={(event) => this.handleBoolChange(event, "visible")}
                                    type="radio"
                                    name={this.state.SSC._id + "visible"}
                                    value={false}
                                />
                                False
                            </label>
                            <label className="ml-2">
                                <input
                                    defaultChecked={this.state.SSC.visible === true}
                                    onChange={(event) => this.handleBoolChange(event, "visible")}
                                    type="radio"
                                    name={this.state.SSC._id + "visible"}
                                    value={true}
                                />
                                True
                            </label>
                        </span>

                        <label>
                            Logo:
                            <input
                                className=" ml-2 mb-2 rounded border-2 border-slate-500"
                                name="logo"
                                type="file"
                                accept="image/png, image/jpeg, iamge/tiff, image/webp, image/gif"
                                onChange={(event) => this.handleImageChange(event)}
                            />
                            {this.state.logo !== "" && (
                                <img className="h-24 object-contain" src={this.state.logo} />
                            )}
                        </label>

                        <label> SSC Page:</label>
                        <div className="p-1 rounded border-2 border-slate-500">
                            <TextEditor
                                initialValue={this.state.SSC.page}
                                onUpdate={this.handlePage}
                            />
                        </div>
                    </div>
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={this.submitButton}
                    >
                        Submit SSC
                    </button>
                </>
            );
        } else {
            return <Loading></Loading>;
        }
    }
}

const EditSSC = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <EditSSCComponent {...props} params={params} navigate={navigate} />;
};
export default EditSSC;
