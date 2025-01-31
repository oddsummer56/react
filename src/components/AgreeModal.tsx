import React from "react";

function AgreeModal(props:any) {


    return (
        <>
            <span data-bs-toggle="modal" data-bs-target={"#modal" + props.tagId} className={"agree-modal"} >
                내용보기
            </span>

            <div className="modal fade" id={"modal" + props.tagId} aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">{props.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" id={"btn-close"}></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                {props.body}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AgreeModal;



