import React from "react";
import { getOfficers, getRoleHeaders } from "../../helpers/adminHelper";
import CreateEditOfficer from "./CreateEditOfficer";
import { roleCategoryEnum, roleCategoryNames } from "../../models/roles/roleEnums";

class Officers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addingOfficer: false,
            officers: [],
            currentOfficer: undefined,
            typeSelect: "",
            roleSelect: undefined,
        };
        this.officerSelect = React.createRef();
    }

    async componentDidMount() {
        const officers = await getOfficers();
        const roles = await getRoleHeaders();
        this.setState({ officers: officers, roles: roles });
        console.log(officers);
    }

    editOfficer = (event) => {
        const currentOfficer = this.state.officers.find((officer) => {
            return officer._id === event.target.value;
        });
        console.log(currentOfficer);
        this.setState({ currentOfficer: currentOfficer });
    };

    onUpdated = async () => {
        this.currentOfficer = undefined;
        this.setState({ officers: [] });
        const officers = await getOfficers();
        this.setState({ officers: officers });
    };

    onCreated = async () => {
        this.setState({ addingOfficer: false });
        this.setState({ officers: [] });
        const officers = await getOfficers();
        this.setState({ officers: officers });
    };

    changeTargetType = async (event) => {
        this.setState({ currentOfficer: undefined });
        await this.setState({ typeSelect: parseInt(event.target.value) });
        this.forceUpdate();
    };

    changeRoleType = (event) => {
        const currentRole = this.state.roles.find((role) => {
            return role._id === event.target.value;
        });
        console.log(currentRole);
        this.setState({ roleSelect: currentRole });
    };

    render() {
        return (
            <div className="my-2 p-2 rounded border-2 border-amber-500">
                {this.state.addingOfficer === false && (
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={() => {
                            this.setState({ addingOfficer: true });
                        }}
                    >
                        Create Officer
                    </button>
                )}
                {this.state.addingOfficer === true && (
                    <>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={() => {
                                this.setState({ addingOfficer: false });
                            }}
                        >
                            Cancel
                        </button>
                        <CreateEditOfficer closeTab={this.onCreated} roles={this.state.roles} />
                    </>
                )}
                <br />
                Edit Current Officer:
                <br />
                <select
                    defaultValue=""
                    onChange={this.changeTargetType}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Type of Role</option>
                    {Object.values(roleCategoryEnum).map((roleCategory) => {
                        return (
                            <option value={roleCategory} key="roleType">
                                {roleCategoryNames(roleCategory)}
                            </option>
                        );
                    })}
                </select>
                <br />
                {this.state.typeSelect !== "" && (
                    <select
                        defaultValue=""
                        onChange={this.changeRoleType}
                        key={this.state.typeSelect}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="">Select {roleCategoryNames(this.state.typeSelect)}</option>
                        {this.state.roles
                            .filter((role) => {
                                return role.category === this.state.typeSelect;
                            })
                            .map((role, index) => {
                                return (
                                    <option value={role._id} key={this.typeSelect + "_" + index}>
                                        {role.name}
                                    </option>
                                );
                            })}
                    </select>
                )}
                <br />
                {this.state.roleSelect !== undefined && (
                    <select
                        defaultValue=""
                        onChange={this.editOfficer}
                        key={this.state.roleSelect._id}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="">Select Officer</option>
                        {this.state.officers
                            .filter((officer) => {
                                return officer.role === this.state.roleSelect._id;
                            })
                            .map((officer, index) => {
                                return (
                                    <option value={officer._id} key={this.typeSelect + "_" + index}>
                                        {officer.name}
                                    </option>
                                );
                            })}
                    </select>
                )}
                <br />
                {this.state.currentOfficer !== undefined &&
                    this.state.officers.map((officer, index) => {
                        if (officer === this.state.currentOfficer) {
                            return (
                                <CreateEditOfficer
                                    closeTab={this.onUpdated}
                                    key={index}
                                    officer={this.state.currentOfficer}
                                    roles={this.state.roles}
                                />
                            );
                        }
                    })}
            </div>
        );
    }
}

export default Officers;
