import { newSignatureModal } from "./modals/_newSignatureModal";

export const createSignature = () => {
  return /* html */ `
  <div class="uk-width-1-1" id="createSignature">
      <button 
        class="uk-button uk-width-1-1 uk-button-small uk-border-rounded bg--secondary text--white"
        uk-toggle="target: #newSignatureModal"
      >
        <span uk-icon="plus-circle"></span>
        Create a new Signature
      </button>
    ${newSignatureModal()}
  </div>
  `;
};