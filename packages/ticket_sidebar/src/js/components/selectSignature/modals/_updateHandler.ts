import {
  htmlSignature,
  updateRecord,
} from "../../../clients/customObjectsClient";
import { genericCrudResponse } from "../../../types/_crudResponses";
import { zdStore } from "../../../stores/zendesk/store";

const handleCreationResult = (result: genericCrudResponse) => {
  const button: HTMLButtonElement = document.querySelector(
    "#updateSignatureSubmit"
  )!;

  button.classList.remove("bg--secondary");
  button.removeAttribute("onclick");

  if (result.success) {
    button.disabled = false;
    button.classList.add("bg--success");
    button.classList.add("bg-darken-2")
    button.innerHTML = "Signature saved! 🎉<br />Reloading now..";
    setTimeout(() => {window.location.reload()}, 2000)
  } else {
    button.disabled = true;
    button.innerHTML = "Failed to create note. See the error note below";
    button.classList.add("bg--error");
    const errorElement: HTMLDivElement =
      document.querySelector("#errorMessage")!;
    errorElement.innerHTML = result.error!;
    errorElement.classList.remove("uk-hidden");
  }
};

const setLoader = () => {
  const button: HTMLButtonElement = document.querySelector(
    "#updateSignatureSubmit"
  )!;
  button.disabled = true;
  button.innerHTML = "<div uk-spinner></div>";
};

export const updateSignature = (signatureId: string) => {
  setLoader();

  const form: HTMLFormElement = document.querySelector(
    `#updateForm-${signatureId}`
  )!;

  const data: FormData = new FormData(form);

  const signatureHtmlCode: FormDataEntryValue = data.get(
    `updateHtml-${signatureId}`
  )!;
  const signatureActive: FormDataEntryValue = data.get(
    `activate-${signatureId}`
  )!;

  const signaturePayload = {
    id: signatureId,
    signature: signatureHtmlCode.toString(),
    active: signatureActive == "on",
  };

  updateRecord(signaturePayload).then((result: genericCrudResponse) => {
    handleCreationResult(result);
  });
};
