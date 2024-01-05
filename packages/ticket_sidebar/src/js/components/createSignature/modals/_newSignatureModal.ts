import { createSignature } from "./_submissionHandler";

document.addEventListener("submit", (e: Event) => {
  if ((e.target as HTMLElement).id == "newSignature") {
    e.preventDefault();
    createSignature();
  }
});

export const newSignatureModal = () => {
  return /* html */ `
  <div uk-modal style="display:none" id="newSignatureModal">
    <div class="uk-modal-dialog uk-border-rounded">
      <div class="uk-modal-header uk-border-rounded">Create a new signature</div>
      <div class="uk-modal-body">
      <form id="newSignature">
          <input
            class="uk-input uk-margin-bottom uk-border-rounded"
            type="text"
            required
            placeholder="Give your signature a name!"
            aria-label="Signature Name"
            name="signatureName"
          />
          <textarea
          class="uk-textarea uk-margin-bottom uk-border-rounded"
            rows="5"
            required
            placeholder="Insert your HTML Content here"
            aria-label="HTML Code"
            name="signatureHtmlCode"
           ></textarea>
            <input 
            class="uk-checkbox toggle-checkbox hidden"
            type="checkbox"
            aria-label="Make this my active signature."
            name="signatureActive"
            id="signatureActive"
            />
            <label for="signatureActive" class="toggle-checkbox-label"></label>
            <span class="toggle-label">Make this my Active signature</span>
           <button
           type="submit"
           class="uk-button uk-border-rounded bg--secondary text--white uk-margin-top"
           id="newSignatureSubmit"
         >
           Save Signature
         </button>
      </form>
      <pre class="uk-hidden uk-text-small uk-text-break" id="errorMessage"></pre>
      </div>
      <button class="uk-modal-close-default" type="button" uk-close></button>
    </div>
  </div>
  `;
};
