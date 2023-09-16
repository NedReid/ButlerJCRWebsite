import React from 'react';
import WhosWhoBlock from "../static/WhosWhoBlock";

class MCRWhosWho extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div className="flex text-center flex-col w-full justify-center place-items-center">
            <div className="my-4 text-5xl font-semibold">Who's Who?</div>
            <div className="my-4 text-3xl font-semibold">MCR Exec</div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <WhosWhoBlock name="Molly Knox" pronouns="She/They" role="MCR President" photo="2023/mcr/mollyk.webp" email="mcr.president@durham.ac.uk"/>
                {/*<WhosWhoBlock name="Sam Sutcliffe" pronouns="He/Him" role="Treasurer" photo="jb.jpg" email="placeholder@durham.ac.uk"/>*/}
                {/*<WhosWhoBlock name="Ananya Rao" pronouns="She/Her" role="Vice-President" photo="jb.jpg" email="placeholder@durham.ac.uk"/>*/}
                {/*<WhosWhoBlock name="Kelsey Cox" pronouns="She/Her" role="Welfare Officer" photo="jb.jpg" email="placeholder@durham.ac.uk"/>*/}
                {/*<WhosWhoBlock name="Josephine Thomas" pronouns="She/Her" role="Welfare Officer" photo="jb.jpg" email="placeholder@durham.ac.uk"/>*/}
                {/*<WhosWhoBlock name="Arjun Cheruvally" pronouns="He/Him" role="Secretary" photo="jb.jpg" email="placeholder@durham.ac.uk"/>*/}
                {/*<WhosWhoBlock name="Stine Vieweg" pronouns="She/Her" role="Social Secretary" photo="jb.jpg" email="placeholder@durham.ac.uk"/>*/}
                {/*<WhosWhoBlock name="Cerys Fearn" pronouns="She/Her" role="Social Secretary" photo="jb.jpg" email="placeholder@durham.ac.uk"/>*/}
            </div>
            <div className="my-4 text-xl">Further exec roles will be elected in the first MCR meeting.</div>
        </div>

    }

}

export default MCRWhosWho;