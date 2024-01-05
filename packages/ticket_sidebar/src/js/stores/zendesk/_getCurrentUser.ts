import zafClient from "@app/zendesk/sdk";
import { userData } from "../../types/_zendeskApi";

export const getCurrentUser = async () => {
  try {
    const response: userData = await zafClient.get("currentUser");
    return response;
  } catch (error) {
    console.log(error);
    return {
     error: JSON.stringify(error)
    };
  }
};
