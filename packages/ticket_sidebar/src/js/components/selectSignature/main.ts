import { zdStore } from "../../stores/zendesk/store";
import { selectSignatureModal } from "./modals/_selectSignatureModal";

export const selectSignature = () => {
  const signatureList = zdStore.signatures;

  if (!signatureList) {
    return "Loading..";
  }

  //handle scenario where no signatures exist
  if (!signatureList.length) {
    return "";
  }

  return /* html */ `
     <button 
       class="uk-button uk-width-1-1 uk-button-small uk-border-rounded bg--secondary text--white"
       uk-toggle="target: #selectSignatureModal"
     >
       <span uk-icon="pencil"></span>
       My Signatures
     </button>
   ${selectSignatureModal()}
 `;
};
