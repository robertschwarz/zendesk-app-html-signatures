/* 
 Heavily inspired by this:
 https://github.com/zendesk/zignatures/blob/master/assets/js/application.js
*/

import zafClient from "@app/zendesk/sdk";
import { signatureRecord, ticketComment } from "../types/_zendeskApi";
import { zdStore } from "../stores/zendesk/store";

export const attachTicketSaveHandler = () => {
  zafClient.on("ticket.save", () => {
    return zafClient.get("ticket.comment").then((response: ticketComment) => {
      const signatures: [signatureRecord] = zdStore.signatures;

      const activeSignature: signatureRecord | undefined = signatures.find(
        (record: signatureRecord) => record.custom_object_fields.active
      );

      const isPublicReply: boolean =
        response["ticket.comment"].type == "publicReply";
      const hasContent: boolean = response["ticket.comment"].text.length > 0;

      const isSignable: boolean = isPublicReply && hasContent;

      if (activeSignature && isSignable) {
        const activeSignatureHtml: string =
          activeSignature.custom_object_fields.html_signature;

        const signatureSpacer: string = /* html */ `
         <br />
         ---
         <br />
         <br />
        `;

        zafClient.invoke(
          "comment.appendHtml",
          signatureSpacer + activeSignatureHtml
        );
      }
    });
  });
};
