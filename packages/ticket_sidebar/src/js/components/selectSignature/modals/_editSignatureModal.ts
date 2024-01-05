import { deleteRecord } from "../../../clients/customObjectsClient";
import { decodeHtml } from "../../../helpers/decodeHtml";
import { zdStore } from "../../../stores/zendesk/store";
import { signatureRecord } from "../../../types/_zendeskApi";
import { updateSignature } from "./_updateHandler";

document.addEventListener("submit", (e: Event) => {
  if ((e.target as HTMLElement).id.includes("updateForm")) {
    const signatureId = (e.target as HTMLElement).id.split("-")[1];
    e.preventDefault();
    updateSignature(signatureId);
  }
});

const signatureDetails = (signature: signatureRecord) => {
  return /* html */ `
  <p class="text-xs">
   <strong>Title</strong><br /> ${signature.name.split("|")[1]}<br />
   <strong>Created at</strong><br /> ${signature.created_at}<br />
   <strong>Last updated</strong><br /> ${signature.updated_at}<br />
   <strong>Is active?</strong><br /> ${
     signature.custom_object_fields.active
   }<br />
  </p>
 `;
};

const formInputElements = (signatureText: string, signatureId: string) => {
  return /* html */ `
   <label for="updateHtml-${signatureId}">HTML Code</label>
   <textarea 
    required id="updateHtml-${signatureId}" 
    name="updateHtml-${signatureId}"
    class="uk-border-rounded uk-margin-bottom uk-textarea">${decodeHtml(
      signatureText
    )}
   </textarea>
   <input 
   class="uk-checkbox toggle-checkbox hidden"
   type="checkbox"
   aria-label="Make this my active signature."
   name="activate-${signatureId}"
   id="activate-${signatureId}"
   />
   <label for="activate-${signatureId}" class="toggle-checkbox-label"></label>
   <span class="toggle-label">Make this my Active signature</span>
 `;
};

export const confirmDeletion = (event: Event) => {
  console.log(event);
  const button: HTMLButtonElement = document.querySelector(
    "#" + (event.target as HTMLElement).id
  )!;
  button.classList.add("bg-darken-2");
  button.innerHTML = "Are you sure?";

  const recordId = button.id.split("-")[1];

  console.log(recordId);
  button.addEventListener("click", () => {
    button.disabled = true;
    button.innerHTML = "<div uk-spinner></div>";
    deleteRecord(recordId)
      .then(() => {
        button.innerHTML = "Done! Reloading now.";
        setTimeout(() => {window.location.reload()}, 2000)
      })
      .catch((error) => {
        button.innerHTML = "Failed to delete :(";
        const errorPanel = document.querySelector("#errorPanel")!;
        errorPanel.classList.remove("uk-hidden");
        errorPanel.innerHTML = JSON.stringify(error);
      });
  });
};

export const editSignatureModal = () => {
  const selectedSignatureId = zdStore.selectedSignature;
  const allSignatures = zdStore.signatures;

  const selectedSignature = allSignatures.find(
    (i: signatureRecord) => i.id == selectedSignatureId
  );
  const signatureFields = selectedSignature.custom_object_fields;

  return /* html */ `
  <div uk-modal style="display: none" id="editSignatureModal">
  <div class="uk-modal-dialog uk-border-rounded">
    <div class="uk-modal-header uk-border-rounded">
      Edit ${selectedSignature.name.split("|")[1]}
    </div>
    <pre id="errorPanel" class="uk-hidden"></pre>
    <div class="uk-modal-body">
      <button
       id="delete-${selectedSignature.id}" 
       onclick="confirmDeletion()"
       class="uk-margin-bottom uk-float-right uk-button uk-border-rounded text--white bg--error">
       Delete
      </button>
      <form id="updateForm-${selectedSignature.id}" name="updateSignature">
        ${signatureDetails(selectedSignature)}
        <p class="uk-margin-bottom">
         ${formInputElements(
           signatureFields.html_signature,
           selectedSignature.id
         )}
        </p>
        <button
        type="submit"
        class="uk-button uk-border-rounded bg--secondary text--white"
        id="updateSignatureSubmit"
      >
        Update
      </button>
      </form>
    </div>
    <button class="uk-modal-close-default" type="button" uk-close></button>
  </div>
  </div>
 `;
};
