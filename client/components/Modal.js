import React from 'react';


const Modal =({modalTitle, children}) => {
  return(
    <div className="modal fade" id="openModal" role="dialog">
           <div className="modal-dialog">
             <div className="modal-content">
               <div className="modal-header">
                 <button type="button" className="close" data-dismiss="modal">&times;</button>
                 <h4 className="modal-title">{modalTitle}</h4>
               </div>
               <div className="modal-body">
                {children}
               </div>
               <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
             </div>
           </div>
         </div>
  )
}

export default Modal;
