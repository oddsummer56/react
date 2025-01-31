import React from "react";
import {v4 as uuidv4} from "uuid";

function ArtistModal(props:any) {


    return (
        <>
            <span data-bs-toggle="modal" data-bs-target={"#artistModal" } className={"artist-modal btn btn-secondary"} >
                더 보기 &gt;
            </span>

            <div className="modal fade" id={"artistModal"} aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{margin:"20px 7.5%"}} >
                    <div className="modal-content" style={{width:"85vw"}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">출연진</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" id={"btn-close"}></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                {props.castingData.map((i:{[key:string]:string}) => {
                                    return (
                                        <div className={"artistElem"} key={uuidv4()}>
                                            <div className={"artistImg"}
                                                 style={{backgroundImage: `url(${props.artistData[i["actor"]]})`}}></div>
                                            <div>{i["actor"]}</div>
                                            <small>{i["role"]}</small>
                                        </div>)
                                })}
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

export default ArtistModal;



