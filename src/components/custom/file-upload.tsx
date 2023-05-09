/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react"
import shortid from "shortid"
import { ScrollArea } from "../ui/scroll-area";

const FileUpload = () => {
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);


    const filesizes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const InputChange = (e: { target: { files: string | any[]; }; }) => {
        // --For Multiple File Input
        const images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            const reader = new FileReader();
            const file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: shortid.generate(),
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            filesize: filesizes(e.target.files[i].size)
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                reader.readAsDataURL(file);
            }
        }
    }


    const DeleteSelectFile = (id: never) => {
        if (window.confirm("Are you sure you want to delete this Image?")) {
            const result = selectedfile.filter((data) => data.id !== id);
            SetSelectedFile(result);
        } else {
            // alert('No');
        }

    }

    const FileUploadSubmit = async (e: { preventDefault: () => void; target: { reset: () => void; }; }) => {
        e.preventDefault();

        // form reset on submit 
        e.target.reset();
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles((preValue) => {
                    return [
                        ...preValue,
                        selectedfile[index]
                    ]
                })
            }
            SetSelectedFile([]);
        } else {
            alert('Please select file')
        }
    }


    const DeleteFile = async (id: never) => {
        if (window.confirm("Are you sure you want to delete this Image?")) {
            const result = Files.filter((data) => data.id !== id);
            SetFiles(result);
        } else {
            // alert('No');
        }
    }

    return (

        <div className="fileupload-view">
            <div className="row justify-content-center m-0">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <div className="kb-data-box">
                                <form>
                                    <div className="kb-file-upload">
                                        <div className="file-upload-box">
                                            <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} multiple />
                                            <span>Drag and drop or <span className="file-link">Choose your files</span></span>
                                        </div>
                                    </div>
                                    <ScrollArea className="kb-attach-box mb-2 h-24">
                                        <div className="kb-attach-box mb-2">
                                            {
                                                selectedfile.map((data, index) => {
                                                    const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                    return (
                                                        <div className="file-atc-box" key={id}>
                                                            {

                                                                filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                    <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                    <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                            }
                                                            <div className="file-detail">
                                                                <h6>{filename}</h6>
                                                                <p></p>
                                                                <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p>
                                                                <div className="file-actions">
                                                                    <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </ScrollArea>
                                </form>
                                {Files.length > 0 ?
                                    <div className="kb-attach-box flex items-center justify-start">
                                        <hr />
                                        {
                                            Files.map((data, index) => {
                                                const { id, filename, fileimage, datetime, filesize } = data;
                                                return (
                                                    <div className="file-atc-box" key={index}>
                                                        {
                                                            filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                        }
                                                        <div className="file-detail">
                                                            <h6>{filename}</h6>
                                                            <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p>
                                                            <div className="file-actions">
                                                                <button className="file-action-btn" onClick={() => DeleteFile(id)}>Delete</button>
                                                                <a href={fileimage} className="file-action-btn" download={filename}>Download</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FileUpload;