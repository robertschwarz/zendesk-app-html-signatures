import zafClient from "@app/zendesk/sdk";
import { signatureSearchResult } from "../../types/_zendeskApi";

export const findSignatures = async (
  agentId: number
): Promise<signatureSearchResult> => {
  const apiSettings = {
    url: `/api/v2/custom_objects/agent_signature/records/search?query=${agentId}`,
    type: "GET",
    dataType: "json",
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const response: signatureSearchResult = await zafClient.request(
      apiSettings
    );

    return response;
  } catch (error) {
    console.log(error);
    return {
      error: JSON.stringify(error),
    };
  }
};
