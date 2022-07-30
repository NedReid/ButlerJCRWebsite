import React, {useCallback} from 'react';
import {getRoleHeaders} from "../../helpers/democracyHelper";
import {useNavigate} from 'react-router-dom';
import parse from 'html-react-parser';
import {tailwindParse} from "../../helpers/tailwindParse";
import RoleHeader from "./RoleHeader";

class RolesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {roles: []};
    }

    async componentDidMount(){
        const roles = await getRoleHeaders()
        this.setState({roles: roles});
        console.log(roles)
    }

    editPage = (id) =>
    {
        this.props.navigate('edit:' + id, {replace: false})
    }

    goToPage = (slug) =>
    {
        this.props.navigate(slug, {replace: false})
    }

    render() {
        return <div className="my-2 p-8">
            <div className="text-4xl font-bold">JCR Roles</div>
            We have a bunch of different roles in college, and you can run for any of them! Take a look at the large variety of JCR Roles below!
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {this.state.roles.map((role, index) => {
                    return (
                        <RoleHeader editPage={this.editPage} goToPage={this.goToPage} role={role} username={this.props.username}/>
                    );
                })}
            </div>

        </div>

    }

}
export default function(props) {
    const navigate = useNavigate();

    return <RolesPage {...props} navigate={navigate} />;
}
