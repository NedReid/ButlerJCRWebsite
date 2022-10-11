import React from 'react';
import WhosWhoBlock from "./WhosWhoBlock";

class WhosWho extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div className="flex text-center flex-col w-full justify-center place-items-center">
            <div className="my-4 text-5xl font-semibold">Who's Who?</div>
            <div className="my-4 text-3xl font-semibold">JCR Exec</div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <WhosWhoBlock name="Urwah Mirza" pronouns="She/Her" role="JCR President" photo="urwah.jpg" email="butler.jcr@durham.ac.uk"/>
                <WhosWhoBlock name="Joseph Chesters" pronouns="He/Him" role="FACSO" photo="joe.jpg" email="butler.facso@durham.ac.uk"/>
                <WhosWhoBlock name="Ned Reid" pronouns="He/Him" role="JCR Chair" photo="ned.jpg" email="butler.chair@durham.ac.uk"/>
                <WhosWhoBlock name="Morgan Miller" pronouns="She/Her" role="Societies Officer" photo="morgan.jpg" email="butler.societies@durham.ac.uk"/>
                <WhosWhoBlock name="Georgina Solly" pronouns="She/They" role="Sports Officer" photo="georgina.jpg" email="rnvp64@durham.ac.uk"/>
                <WhosWhoBlock name="Chloé Margaux" pronouns="She/Her" role="Social Chair" photo="chloe.jpg" email="rngm25@durham.ac.uk"/>
                <WhosWhoBlock name="Daniel Stuart" pronouns="He/Him" role="Vice-President" photo="dan.jpg" email="jb.vicepresident@durham.ac.uk"/>
                <WhosWhoBlock name="Emily Wilson" pronouns="She/Her" role="JBs Officer" photo="emily.jpg" email="pnhm47@durham.ac.uk"/>
                <WhosWhoBlock name="Harry Clipston" pronouns="He/Him" role="Technical Director" photo="harry.jpg" email="jbtechcomm@gmail.com"/>
                <WhosWhoBlock name="Mariah Bennett" pronouns="She/Her" role="Welfare Officer" photo="mariah.jpg" email="butler.welfarejcr@durham.ac.uk"/>
                <WhosWhoBlock name="Molly Knox" pronouns="She/They" role="Welfare Officer" photo="molly.jpg" email="butler.welfarejcr@durham.ac.uk"/>
                <WhosWhoBlock name="Quentin O'Brien" pronouns="He/Him" role="Treasurer" photo="quentin.jpg" email="butler.treasurer@durham.ac.uk"/>
                <WhosWhoBlock name="Rosaleen Tite-Ahern" pronouns="She/Her" role="Publicity Officer" photo="rosaleen.jpg" email="xsrr55@durham.ac.uk"/>
                <WhosWhoBlock name="Saujanya Vinayy" pronouns="She/Her" role="International Officer" photo="saujanya.jpg" email="tbfh39@durham.ac.uk"/>
            </div>
        </div>

    }

}

export default WhosWho;