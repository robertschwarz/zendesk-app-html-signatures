import { decodeHtml } from "../../helpers/decodeHtml";
import { zdStore } from "../../stores/zendesk/store";
import { signatureRecord } from "../../types/_zendeskApi";

export const activeSignatureInfo = () => {
  const signatures: [signatureRecord] = zdStore.signatures;

  const activeSignature = signatures.find(
    (record: signatureRecord) => record.custom_object_fields.active
  );

  if (!signatures.length) {
    return /* html */ `
   <div class="uk-border-rounded bg--secondary bg-lighten-4 uk-card uk-card-body">
    <h6><strong>Signature Preview</strong></h6>
    <hr class="uk-divider-icon">
    <p><strong>No signature found!</strong></p>
    <p>Click on "Create a new Signature" to create a new signature. You'll see a preview here.</p>
   </div>
   `;
  }

  if (!activeSignature) {
    return /* html */ `
    <div class="uk-border-rounded bg--secondary bg-lighten-4 uk-card uk-card-body">
     <h6><strong>Signature Preview</strong></h6>
     <hr class="uk-divider-icon">
     <p><strong>No active signature selected!</strong></p>
     <p>Click on "My Signatures" to active one!</p>
    </div>
    `;
  }

  return /* html */ `
  <div class="uk-border-rounded bg--secondary bg-lighten-4 uk-card uk-card-body">
      <h6>Active Signature Preview<br /><strong>${
        activeSignature.name.split("|")[1]
      }</strong></h6>
      <hr class="uk-divider-icon">
      <div>
       ${decodeHtml(activeSignature.custom_object_fields.html_signature)}
      </div>
  </div>
 `;
};
