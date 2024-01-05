import zafClient from "@app/zendesk/sdk";
import { genericCrudResponse } from "../types/_crudResponses";
import { zdStore } from "../stores/zendesk/store";
import { signatureRecord, signatureSearchResult } from "../types/_zendeskApi";
import { findSignatures } from "../stores/zendesk/_findSignatures";

export class htmlSignature {
  custom_object_record: {
    id?: string;
    name: string;
    custom_object_fields: {
      agent: string;
      html_signature: string;
      active: boolean;
    };
  };

  constructor(
    name: string,
    html_signature: string,
    active: boolean,
    agentId: string
  ) {
    this.custom_object_record = {
      name: `${agentId} | ${name}`,
      custom_object_fields: {
        html_signature: html_signature,
        agent: agentId,
        active: active,
      },
    };
  }

  async create(): Promise<genericCrudResponse> {
    const payload = {
      custom_object_record: this.custom_object_record,
    };

    const apiSettings = {
      url: "/api/v2/custom_objects/agent_signature/records",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const response: { custom_object_record: signatureRecord } =
        await zafClient.request(apiSettings);

      const agentId = Number(response.custom_object_record.created_by_user_id);
      const recordId = response.custom_object_record.id;

      if (response.custom_object_record.custom_object_fields.active) {
        await toggleActiveSignatures(agentId, recordId);
      }

      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: JSON.stringify(error),
      };
    }
  }
}

const toggleActiveSignatures = async (agentId: number, recordId: string) => {
  const disableSignature = (id: string) => {
    const payload = {
      custom_object_record: {
        custom_object_fields: {
          active: false,
        },
      },
    };

    const apiSettings = {
      url: `/api/v2/custom_objects/agent_signature/records/${id}`,
      type: "PATCH",
      dataType: "json",
      data: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    };

    zafClient.request(apiSettings);
  };

  findSignatures(agentId).then((response: signatureSearchResult) => {
    const toggleList = response.custom_object_records?.filter(
      (record: signatureRecord) => record.id != recordId
    );

    toggleList?.map((record: signatureRecord) => {
      disableSignature(record.id);
    });
  });
};

export const deleteRecord = async (recordId: string) => {
  const apiSettings = {
    url: `/api/v2/custom_objects/agent_signature/records/${recordId}`,
    type: "DELETE",
  };
  try {
    await zafClient.request(apiSettings);
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
};

export const updateRecord = async (data: {
  signature: string;
  active: boolean;
  id: string;
}): Promise<genericCrudResponse> => {
  const payload = {
    custom_object_record: {
      custom_object_fields: {
        html_signature: data.signature,
        active: data.active,
      },
    },
  };

  const apiSettings = {
    url: `/api/v2/custom_objects/agent_signature/records/${data.id}`,
    type: "PATCH",
    dataType: "json",
    data: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  };

  try {
    const response: { custom_object_record: signatureRecord } =
      await zafClient.request(apiSettings);

    const agentId = Number(response.custom_object_record.created_by_user_id);
    const recordId = response.custom_object_record.id;

    if (response.custom_object_record.custom_object_fields.active) {
      await toggleActiveSignatures(agentId, recordId);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
};
