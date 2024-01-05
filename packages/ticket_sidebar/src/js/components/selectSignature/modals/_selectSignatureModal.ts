// @ts-ignore
import { render } from "reefjs";
import { zdStore } from "../../../stores/zendesk/store";
import { signatureFields } from "../../../types/_zendeskApi";
import { signatureRecord } from "../../../types/_zendeskApi";
import { confirmDeletion, editSignatureModal } from "./_editSignatureModal";
import UIkit from "uikit";

export const renderSelectedSignature = (event: Event) => {
  zdStore.selectedSignature = (event.target as HTMLElement).id;

  const modalWindow = document.querySelector("#editSignatureModal")!;
  if (!modalWindow) {
   render("#editModalContainer", editSignatureModal(), { confirmDeletion });
  }
 
  UIkit.modal(modalWindow).show();
};

const createSignatureList = (signatures: [signatureRecord]) => {
  signatures.sort((a, b) => {
    const AisActive = a.custom_object_fields.active;
    const BisActive = b.custom_object_fields.active;

    return AisActive === BisActive ? 0 : AisActive ? -1 : 1;
  });

  return signatures
    .map((signature: signatureRecord) => {
      const signatureFields: signatureFields = signature.custom_object_fields;
      let activeElement: string = "";
      let activeBackgroundClass = signatureFields.active
        ? "bg--secondary"
        : "bg--inactive bg-lighten-7";

      if (signatureFields.active) {
        activeElement = /* html */ `
    <span class="chip"><span uk-icon="check"></span>Active</span>
   `;
      }

      return /* html */ `
  <div class="text--xs uk-margin-bottom modal--trigger ${activeBackgroundClass}">
    ${activeElement}
    <strong>${signature.name.split("|")[1]}</strong>
    <br />Last Edited: ${signature.created_at.split("T")[0]}
    <br /> <button class="edit-button" onclick="renderSelectedSignature()" id="${
      signature.id
    }">Edit</button>
  </div>
  `;
    })
    .join("");
};

export const selectSignatureModal = () => {
  const signatures: [signatureRecord] = zdStore.signatures;

  if (!signatures) {
    return "Loading..";
  }

  //handle scenario where no signatures exist
  if (!signatures.length) {
    return "";
  }

  return /* html */ `
  <div uk-modal style="display:none" id="selectSignatureModal">
    <div class="uk-modal-dialog uk-border-rounded">
      <div class="uk-modal-header uk-border-rounded">My Signatures</div>
      <div class="uk-modal-body">
        ${createSignatureList(signatures)}
      </div>
      <button class="uk-modal-close-default" type="button" uk-close></button>
    </div>
  </div>
  <div id="editModalContainer"></div>
  `;
};
