import { htmlSignature } from "../../../clients/customObjectsClient";
import { genericCrudResponse } from "../../../types/_crudResponses";
import { zdStore } from "../../../stores/zendesk/store";

const handleCreationResult = (result: genericCrudResponse) => {
  const button: HTMLButtonElement = document.querySelector(
    "#newSignatureSubmit"
  )!;

  button.classList.remove("bg--secondary");
  button.removeAttribute("onclick");

  if (result.success) {
    button.disabled = false;
    button.classList.add("bg--success");
    button.innerHTML = "Signature saved! 🎉< br/> Reloading now.";
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
    "#newSignatureSubmit"
  )!;
  button.disabled = true;
  button.innerHTML = "<div uk-spinner></div>";
};

export const createSignature = () => {
  setLoader();

  const form: HTMLFormElement = document.querySelector("#newSignature")!;
  const data: FormData = new FormData(form);

  const signatureName: FormDataEntryValue = data.get("signatureName")!;
  const signatureHtmlCode: FormDataEntryValue = data.get("signatureHtmlCode")!;
  const signatureActive: FormDataEntryValue = data.get("signatureActive")!;

  const signature = new htmlSignature(
    signatureName.toString(),
    signatureHtmlCode.toString(),
    signatureActive == "on",
    zdStore.currentUser.currentUser.id
  );

   signature.create().then((result: genericCrudResponse) => {
    handleCreationResult(result);
  });
};
