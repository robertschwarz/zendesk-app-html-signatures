export type ticketComment = {
 errors: {};
 'ticket.comment': {
     text: string;
     type: string;
     useRichText: boolean;
     attachments: any[];
 };
}

type userTimeZone = {
  name: string | null;
  translatedName: string | null;
  ianaName: string | null;
  offset: number | null;
  formattedOffset: string | null;
};

type userIdentity = {
  id: number | null;
  type: string | null;
  value: string | null;
  verified: boolean | null;
  primary: boolean | null;
  userId: number | null;
  undeliverableCount?: number | null;
  deliverableState?: string | null;
};

type userGroup = {
  id: number | null;
  name: string | null;
};

export type userOrganization = {
  group: userGroup | null;
  domains: string | null;
  id: number | null;
  name: string | null;
  organizationFields: Record<string, any>;
  sharedComments: boolean | null;
  sharedTickets: boolean | null;
};

export type userData = {
  error?: string;
  errors: Record<string, unknown>;
  currentUser: {
    alias: string;
    avatarUrl: string;
    details: string;
    email: string;
    externalId: string;
    id: number;
    isSystemUser: boolean;
    locale: string;
    name: string;
    notes: string;
    role: string;
    signature: string;
    tags: string[];
    timeZone: userTimeZone;
    groups: userGroup[];
    identities: userIdentity[];
    organizations: userOrganization[];
  };
};
export type signatureFields = {
  agent: string;
  html_signature: string;
  active: boolean;
};

export type signatureRecord = {
  url: string;
  id: string;
  name: string;
  custom_object_key: string;
  custom_object_fields: signatureFields;
  created_by_user_id: string;
  updated_by_user_id: string;
  created_at: string;
  updated_at: string;
  external_id: null | string;
};

export type signatureSearchResult = {
  custom_object_records?: Array<signatureRecord>;
  error?: string
};
