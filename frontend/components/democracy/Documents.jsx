import React, {useCallback} from 'react';
import {getDocuments} from "../../helpers/democracyHelper";
import {useNavigate} from 'react-router-dom';
import Loading from "../global/Loading";
import {documentEnum, getDocumentTypeName} from "../../models/documentEnum";
import {documentModel} from "../../models/documentModel";
import {Collapse} from "react-daisyui";
import date from 'date-and-time'


class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {documents: []};
    }

    async componentDidMount(){
        const documents = await getDocuments()
        this.setState({documents: documents.map(((document) => new documentModel(document)))});
        console.log(documents)
    }

    goToPage = (file, id) =>
    {
        window.open("files/documents/" + id + "/" + file,'_blank')
    }


    render() {
        let documentsByCategory = [];
        for (let documentEnumValue in Object.values(documentEnum)) {
            let enumDoc = this.state.documents.filter((document) => {return (document.category == documentEnumValue)});
            enumDoc.sort((a, b) => {return (b.date.valueOf() - a.date.valueOf())});
            console.log(enumDoc);
            let enumDocByYear = [];
            enumDoc.forEach((document) => {
                if (enumDocByYear.length === 0 || enumDocByYear[enumDocByYear.length - 1][0].date.getFullYear() !== document.date.getFullYear()) {
                    enumDocByYear.push([document]);
                } else {
                    enumDocByYear[enumDocByYear.length - 1].push(document);
                }
            });
            documentsByCategory.push(enumDocByYear);
            console.log(enumDocByYear)
        }
        console.log(documentsByCategory)
        return <div className="my-2 p-8">
            <div className="text-4xl font-bold">JCR Documents</div>
            Here you'll find JCR standing orders, minutes, and other documents.
            {this.state.documents.length > 0?
                <>
                    {Object.values(documentEnum).map((documentCategory, index) => {
                        if (documentsByCategory[index].length > 0) {
                            return (
                                <Collapse className="my-2 hover:bg-gray-100 active:bg-gray-200" icon="arrow" >
                                    <input id={"toggle" + this.props.index} type="checkbox" className="peer"/>

                                    <Collapse.Title className="border-l-4 border-gray-400 text-xl font-semibold">
                                        {getDocumentTypeName(documentCategory)}
                                    </Collapse.Title>
                                    <Collapse.Content className="bg-white border-l-4 border-gray-200">
                                        <div>
                                            {documentsByCategory[index].map((yearDocument) => {
                                                return (<div className="my-1">
                                                    <div className="font-semibold text-lg my-1">{yearDocument[0].date.getFullYear()}</div>
                                                    {yearDocument.map((document) => {
                                                        return (
                                                            <div>

                                                                <button className="text-blue-700 hover:underline"
                                                                        onClick={()=> this.goToPage(document.address, document._id)}>{document.name}</button>
                                                                <span className="ml-2 italic">- {date.format(document.date, 'DD/MM/YY')}</span>
                                                            </div>
                                                        );
                                                    })
                                                    }
                                                </div>);
                                                })
                                            }


                                        </div>
                                    </Collapse.Content>
                                </Collapse>
                            );
                        }

                    })
                    }

                </>
                :
            <Loading/>
            }

        </div>

    }

}
export default function(props) {
    const navigate = useNavigate();

    return <Documents {...props} navigate={navigate} />;
}
