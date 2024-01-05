// @ts-ignore
import { render } from "reefjs";
import { createSignature } from "../components/createSignature/main";
import { findSignatures } from "./zendesk/_findSignatures";
import { getCurrentUser } from "./zendesk/_getCurrentUser";
import { zdStore } from "./zendesk/store";
import { selectSignature } from "../components/selectSignature/main";
import { renderSelectedSignature } from "../components/selectSignature/modals/_selectSignatureModal";
import { activeSignatureInfo } from "../components/activeSignatureInfo/main";
import { attachTicketSaveHandler } from "../plugins/zignatures";

export const initStores = () => {
  getCurrentUser().then((user) => {
    zdStore.currentUser = user;
    render("#createSignature", createSignature());
    findSignatures(zdStore.currentUser.currentUser.id).then((response) => {
      zdStore.signatures = response.custom_object_records;
      console.log(response.custom_object_records);
      render("#selectSignature", selectSignature(), {
        renderSelectedSignature
      });
      render("#activeSignatureInfo", activeSignatureInfo())
      attachTicketSaveHandler();
    });
  });
};
