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
                <WhosWhoBlock name="Daniel Stuart " pronouns="He/Him" role="JCR President" photo="2023/dans.webp" email="butler.jcr@durham.ac.uk"/>
                <WhosWhoBlock name="Arman Huq" pronouns="He/Him" role="FACSO" photo="2023/armanh.webp" email="butler.facso@durham.ac.uk"/>
                <WhosWhoBlock name="Eloise Fleming" pronouns="She/Her" role="JCR Chair" photo="2023/eloisef.webp" email="butler.chair@durham.ac.uk"/>
                <WhosWhoBlock name="Lottie Gibson" pronouns="She/Her" role="Societies Officer" photo="2023/lottieg.webp" email="butler.societies@durham.ac.uk"/>
                <WhosWhoBlock name="Niamh Morton" pronouns="She/Her" role="Sports Officer" photo="2023/niamhm.webp" email="niamh.e.morton@durham.ac.uk"/>
                <WhosWhoBlock name="Alice Lee" pronouns="She/Her" role="Social Chair" photo="2023/alicel.webp" email="alice.lee@durham.ac.uk"/>
                <WhosWhoBlock name="Ben Baker" pronouns="He/Him" role="Vice-President" photo="2023/benb.webp" email="ben.baker@durham.ac.uk"/>
                <WhosWhoBlock name="Shannon Southern" pronouns="She/Her" role="JBs Officer" photo="2023/shannons.webp" email="shannon.e.southern@durham.ac.uk"/>
                {/*<WhosWhoBlock name="Harry Clipston" pronouns="He/Him" role="Technical Director" photo="2023/dans.webp" email="jbtechcomm@gmail.com"/>*/}
                <WhosWhoBlock name="Rosa Aziz" pronouns="They/She" role="Welfare Officer" photo="2023/rosaa.webp" email="butler.welfarejcr@durham.ac.uk"/>
                <WhosWhoBlock name="Mathilde Wilson-Drummond" pronouns="She/They" role="Welfare Officer" photo="2023/mathildewd.webp" email="butler.welfarejcr@durham.ac.uk"/>
                <WhosWhoBlock name="Jakub Kostrzewa" pronouns="He/Him" role="Treasurer" photo="2023/jakubk.webp" email="butler.treasurer@durham.ac.uk"/>
                <WhosWhoBlock name="Hazel Cheung" pronouns="She/Her" role="Publicity Officer" photo="2023/hazelc.webp" email="hazel.m.cheung@durham.ac.uk"/>
                <WhosWhoBlock name="Zeni (Xeni) Pun" pronouns="She/Her" role="International Officer" photo="2023/xenip.webp" email="zeni.pun@durham.ac.uk"/>
            </div>
        </div>

    }

}

export default WhosWho;