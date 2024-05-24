/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AddMemberPayload */
export interface AddMemberPayload {
  /** User Id */
  user_id: number;
  /** Employee Id */
  employee_id: number;
}

/** Body_change_members_admin_chats__task_id__members_post */
export interface BodyChangeMembersAdminChatsTaskIdMembersPost {
  /** Add Members */
  add_members: AddMemberPayload[];
  /** Remove Members */
  remove_members: AddMemberPayload[];
  /** Set Members */
  set_members: AddMemberPayload[];
}

/** Body_create_chat_admin_chats__task_id__post */
export interface BodyCreateChatAdminChatsTaskIdPost {
  /** Members */
  members: AddMemberPayload[];
}

/** Body_set_status_message_admin_messages__message_uuid__patch */
export interface BodySetStatusMessageAdminMessagesMessageUuidPatch {
  /** Status */
  status: string;
}

/** Body_use_message_button_admin_messages__message_uuid__buttons_post */
export interface BodyUseMessageButtonAdminMessagesMessageUuidButtonsPost {
  /** Name */
  name: string;
}

/** Button */
export interface Button {
  /**
   * Uuid
   * @format uuid
   */
  uuid: string;
  /** Employee Id */
  employee_id: number;
  /** Name */
  name: string;
  /**
   * Client Time
   * @format date-time
   */
  client_time: string;
  /**
   * Server Time
   * @format date-time
   */
  server_time: string;
}

/** Chat */
export interface Chat {
  /** Task Id */
  task_id: number;
  /** Message Count */
  message_count: number;
  /** Last Message Time */
  last_message_time: string | null;
  /** Archived */
  archived: boolean;
  /** Members */
  members: Member[];
}

/** CreateMessageBody */
export interface CreateMessageBody {
  /** Text */
  text: string;
  /**
   * Status
   * @default ""
   */
  status?: string;
  /** Attachments */
  attachments?: string[] | null;
  /** Edits */
  edits?: object | null;
  /** Client Time */
  client_time?: string | null;
  /** Client Uuid */
  client_uuid?: string | null;
}

/** EditMessageBody */
export interface EditMessageBody {
  /** Text */
  text: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** MediaFile */
export interface MediaFile {
  /** Path */
  path: string;
  /** Content Type */
  content_type: string;
}

/** Member */
export interface Member {
  /** Employee Id */
  employee_id: number;
  /** Allow View */
  allow_view: boolean;
  /** Allow Read */
  allow_read: boolean;
  /** Allow Edit */
  allow_edit: boolean;
}

/** Message */
export interface Message {
  /**
   * Uuid
   * @format uuid
   */
  uuid: string;
  /** Client Uuid */
  client_uuid: string | null;
  /** Employee Id */
  employee_id: number;
  /** Text */
  text: string;
  /** Status */
  status: string;
  /**
   * Client Time
   * @format date-time
   */
  client_time: string;
  /**
   * Server Time
   * @format date-time
   */
  server_time: string;
  /** Changed */
  changed: boolean;
  /** Allow Edit */
  allow_edit: boolean;
  /** Allow Delete */
  allow_delete: boolean;
  /** Media Files */
  media_files?: MediaFile[];
  /** Used Buttons */
  used_buttons?: Button[];
}

/** UseMessageButtonBody */
export interface UseMessageButtonBody {
  /** Name */
  name: string;
  /** Client Time */
  client_time?: string | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type StatusStatusGetData = any;

export interface GetActiveChatsApiActiveChatsGetParams {
  /** Authorization */
  authorization: string;
}

/** Response Get Active Chats Api Active Chats Get */
export type GetActiveChatsApiActiveChatsGetData = Chat[];

export interface GetArchivedChatsApiArchivedChatsGetParams {
  /** Authorization */
  authorization: string;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Limit
   * @default 20
   */
  limit?: number;
}

/** Response Get Archived Chats Api Archived Chats Get */
export type GetArchivedChatsApiArchivedChatsGetData = Chat[];

export interface GetChatApiChatsTaskIdGetParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
}

export type GetChatApiChatsTaskIdGetData = Chat;

export interface GetMessagesApiChatsTaskIdMessagesGetParams {
  /** Authorization */
  authorization: string;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Limit
   * @default 20
   */
  limit?: number;
  /** Task Id */
  taskId: number;
}

/** Response Get Messages Api Chats  Task Id  Messages Get */
export type GetMessagesApiChatsTaskIdMessagesGetData = Message[];

export interface CreateMessageApiChatsTaskIdMessagesPostParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
}

export type CreateMessageApiChatsTaskIdMessagesPostData = Message;

export interface EditMessageApiChatsTaskIdMessagesMessageUuidPatchParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
  /**
   * Message Uuid
   * @format uuid
   */
  messageUuid: string;
}

export type EditMessageApiChatsTaskIdMessagesMessageUuidPatchData = Message;

export interface DeleteMessageApiChatsTaskIdMessagesMessageUuidDeleteParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
  /**
   * Message Uuid
   * @format uuid
   */
  messageUuid: string;
}

export type DeleteMessageApiChatsTaskIdMessagesMessageUuidDeleteData = any;

export interface UseMessageButtonApiChatsTaskIdMessagesMessageUuidButtonsPostParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
  /**
   * Message Uuid
   * @format uuid
   */
  messageUuid: string;
}

export type UseMessageButtonApiChatsTaskIdMessagesMessageUuidButtonsPostData = Button;

export interface GetChatAdminChatsTaskIdGetParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
}

export type GetChatAdminChatsTaskIdGetData = Chat;

export interface CreateChatAdminChatsTaskIdPostParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
}

export type CreateChatAdminChatsTaskIdPostData = Chat;

export interface DeleteChatAdminChatsTaskIdDeleteParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
}

export type DeleteChatAdminChatsTaskIdDeleteData = any;

export interface RefreshActiveChatsAdminActiveChatsPostParams {
  /** Authorization */
  authorization: string;
}

export type RefreshActiveChatsAdminActiveChatsPostData = any;

export interface ArchiveChatAdminArchivedChatsTaskIdPostParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
}

export type ArchiveChatAdminArchivedChatsTaskIdPostData = Chat;

export interface ChangeMembersAdminChatsTaskIdMembersPostParams {
  /** Authorization */
  authorization: string;
  /** Task Id */
  taskId: number;
}

export type ChangeMembersAdminChatsTaskIdMembersPostData = Chat;

export interface SetStatusMessageAdminMessagesMessageUuidPatchParams {
  /** Authorization */
  authorization: string;
  /**
   * Message Uuid
   * @format uuid
   */
  messageUuid: string;
}

export type SetStatusMessageAdminMessagesMessageUuidPatchData = any;

export interface UseMessageButtonAdminMessagesMessageUuidButtonsPostParams {
  /** Authorization */
  authorization: string;
  /**
   * Message Uuid
   * @format uuid
   */
  messageUuid: string;
}

export type UseMessageButtonAdminMessagesMessageUuidButtonsPostData = Button;

export interface RemoveMessageButtonAdminButtonsButtonUuidDeleteParams {
  /** Authorization */
  authorization: string;
  /**
   * Button Uuid
   * @format uuid
   */
  buttonUuid: string;
}

export type RemoveMessageButtonAdminButtonsButtonUuidDeleteData = any;

export type HtmlWsPageWsPageGetData = any;

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title СервисПро Чат
 * @version 1.0.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  status = {
    /**
     * No description
     *
     * @tags default
     * @name StatusStatusGet
     * @summary Status
     * @request GET:/status
     */
    statusStatusGet: (params: RequestParams = {}) =>
      this.request<StatusStatusGetData, any>({
        path: `/status`,
        method: "GET",
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags chat
     * @name GetActiveChatsApiActiveChatsGet
     * @summary Get Active Chats
     * @request GET:/api/active-chats
     */
    getActiveChatsApiActiveChatsGet: (query: GetActiveChatsApiActiveChatsGetParams, params: RequestParams = {}) =>
      this.request<GetActiveChatsApiActiveChatsGetData, HTTPValidationError>({
        path: `/api/active-chats`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chat
     * @name GetArchivedChatsApiArchivedChatsGet
     * @summary Get Archived Chats
     * @request GET:/api/archived-chats
     */
    getArchivedChatsApiArchivedChatsGet: (
      query: GetArchivedChatsApiArchivedChatsGetParams,
      params: RequestParams = {},
    ) =>
      this.request<GetArchivedChatsApiArchivedChatsGetData, HTTPValidationError>({
        path: `/api/archived-chats`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chat
     * @name GetChatApiChatsTaskIdGet
     * @summary Get Chat
     * @request GET:/api/chats/{task_id}
     */
    getChatApiChatsTaskIdGet: ({ taskId, ...query }: GetChatApiChatsTaskIdGetParams, params: RequestParams = {}) =>
      this.request<GetChatApiChatsTaskIdGetData, HTTPValidationError>({
        path: `/api/chats/${taskId}`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chat
     * @name GetMessagesApiChatsTaskIdMessagesGet
     * @summary Get Messages
     * @request GET:/api/chats/{task_id}/messages
     */
    getMessagesApiChatsTaskIdMessagesGet: (
      { taskId, ...query }: GetMessagesApiChatsTaskIdMessagesGetParams,
      params: RequestParams = {},
    ) =>
      this.request<GetMessagesApiChatsTaskIdMessagesGetData, HTTPValidationError>({
        path: `/api/chats/${taskId}/messages`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chat
     * @name CreateMessageApiChatsTaskIdMessagesPost
     * @summary Create Message
     * @request POST:/api/chats/{task_id}/messages
     */
    createMessageApiChatsTaskIdMessagesPost: (
      { taskId, ...query }: CreateMessageApiChatsTaskIdMessagesPostParams,
      data: CreateMessageBody,
      params: RequestParams = {},
    ) =>
      this.request<CreateMessageApiChatsTaskIdMessagesPostData, HTTPValidationError>({
        path: `/api/chats/${taskId}/messages`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chat
     * @name EditMessageApiChatsTaskIdMessagesMessageUuidPatch
     * @summary Edit Message
     * @request PATCH:/api/chats/{task_id}/messages/{message_uuid}
     */
    editMessageApiChatsTaskIdMessagesMessageUuidPatch: (
      { taskId, messageUuid, ...query }: EditMessageApiChatsTaskIdMessagesMessageUuidPatchParams,
      data: EditMessageBody,
      params: RequestParams = {},
    ) =>
      this.request<EditMessageApiChatsTaskIdMessagesMessageUuidPatchData, HTTPValidationError>({
        path: `/api/chats/${taskId}/messages/${messageUuid}`,
        method: "PATCH",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chat
     * @name DeleteMessageApiChatsTaskIdMessagesMessageUuidDelete
     * @summary Delete Message
     * @request DELETE:/api/chats/{task_id}/messages/{message_uuid}
     */
    deleteMessageApiChatsTaskIdMessagesMessageUuidDelete: (
      { taskId, messageUuid, ...query }: DeleteMessageApiChatsTaskIdMessagesMessageUuidDeleteParams,
      params: RequestParams = {},
    ) =>
      this.request<DeleteMessageApiChatsTaskIdMessagesMessageUuidDeleteData, HTTPValidationError>({
        path: `/api/chats/${taskId}/messages/${messageUuid}`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chat
     * @name UseMessageButtonApiChatsTaskIdMessagesMessageUuidButtonsPost
     * @summary Use Message Button
     * @request POST:/api/chats/{task_id}/messages/{message_uuid}/buttons
     */
    useMessageButtonApiChatsTaskIdMessagesMessageUuidButtonsPost: (
      { taskId, messageUuid, ...query }: UseMessageButtonApiChatsTaskIdMessagesMessageUuidButtonsPostParams,
      data: UseMessageButtonBody,
      params: RequestParams = {},
    ) =>
      this.request<UseMessageButtonApiChatsTaskIdMessagesMessageUuidButtonsPostData, HTTPValidationError>({
        path: `/api/chats/${taskId}/messages/${messageUuid}/buttons`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags admin
     * @name GetChatAdminChatsTaskIdGet
     * @summary Get Chat
     * @request GET:/admin/chats/{task_id}
     */
    getChatAdminChatsTaskIdGet: ({ taskId, ...query }: GetChatAdminChatsTaskIdGetParams, params: RequestParams = {}) =>
      this.request<GetChatAdminChatsTaskIdGetData, HTTPValidationError>({
        path: `/admin/chats/${taskId}`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name CreateChatAdminChatsTaskIdPost
     * @summary Create Chat
     * @request POST:/admin/chats/{task_id}
     */
    createChatAdminChatsTaskIdPost: (
      { taskId, ...query }: CreateChatAdminChatsTaskIdPostParams,
      data: BodyCreateChatAdminChatsTaskIdPost,
      params: RequestParams = {},
    ) =>
      this.request<CreateChatAdminChatsTaskIdPostData, HTTPValidationError>({
        path: `/admin/chats/${taskId}`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name DeleteChatAdminChatsTaskIdDelete
     * @summary Delete Chat
     * @request DELETE:/admin/chats/{task_id}
     */
    deleteChatAdminChatsTaskIdDelete: (
      { taskId, ...query }: DeleteChatAdminChatsTaskIdDeleteParams,
      params: RequestParams = {},
    ) =>
      this.request<DeleteChatAdminChatsTaskIdDeleteData, HTTPValidationError>({
        path: `/admin/chats/${taskId}`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name RefreshActiveChatsAdminActiveChatsPost
     * @summary Refresh Active Chats
     * @request POST:/admin/active-chats
     */
    refreshActiveChatsAdminActiveChatsPost: (
      query: RefreshActiveChatsAdminActiveChatsPostParams,
      params: RequestParams = {},
    ) =>
      this.request<RefreshActiveChatsAdminActiveChatsPostData, HTTPValidationError>({
        path: `/admin/active-chats`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name ArchiveChatAdminArchivedChatsTaskIdPost
     * @summary Archive Chat
     * @request POST:/admin/archived-chats/{task_id}
     */
    archiveChatAdminArchivedChatsTaskIdPost: (
      { taskId, ...query }: ArchiveChatAdminArchivedChatsTaskIdPostParams,
      params: RequestParams = {},
    ) =>
      this.request<ArchiveChatAdminArchivedChatsTaskIdPostData, HTTPValidationError>({
        path: `/admin/archived-chats/${taskId}`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name ChangeMembersAdminChatsTaskIdMembersPost
     * @summary Change Members
     * @request POST:/admin/chats/{task_id}/members
     */
    changeMembersAdminChatsTaskIdMembersPost: (
      { taskId, ...query }: ChangeMembersAdminChatsTaskIdMembersPostParams,
      data: BodyChangeMembersAdminChatsTaskIdMembersPost,
      params: RequestParams = {},
    ) =>
      this.request<ChangeMembersAdminChatsTaskIdMembersPostData, HTTPValidationError>({
        path: `/admin/chats/${taskId}/members`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name SetStatusMessageAdminMessagesMessageUuidPatch
     * @summary Set Status Message
     * @request PATCH:/admin/messages/{message_uuid}
     */
    setStatusMessageAdminMessagesMessageUuidPatch: (
      { messageUuid, ...query }: SetStatusMessageAdminMessagesMessageUuidPatchParams,
      data: BodySetStatusMessageAdminMessagesMessageUuidPatch,
      params: RequestParams = {},
    ) =>
      this.request<SetStatusMessageAdminMessagesMessageUuidPatchData, HTTPValidationError>({
        path: `/admin/messages/${messageUuid}`,
        method: "PATCH",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name UseMessageButtonAdminMessagesMessageUuidButtonsPost
     * @summary Use Message Button
     * @request POST:/admin/messages/{message_uuid}/buttons
     */
    useMessageButtonAdminMessagesMessageUuidButtonsPost: (
      { messageUuid, ...query }: UseMessageButtonAdminMessagesMessageUuidButtonsPostParams,
      data: BodyUseMessageButtonAdminMessagesMessageUuidButtonsPost,
      params: RequestParams = {},
    ) =>
      this.request<UseMessageButtonAdminMessagesMessageUuidButtonsPostData, HTTPValidationError>({
        path: `/admin/messages/${messageUuid}/buttons`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name RemoveMessageButtonAdminButtonsButtonUuidDelete
     * @summary Remove Message Button
     * @request DELETE:/admin/buttons/{button_uuid}
     */
    removeMessageButtonAdminButtonsButtonUuidDelete: (
      { buttonUuid, ...query }: RemoveMessageButtonAdminButtonsButtonUuidDeleteParams,
      params: RequestParams = {},
    ) =>
      this.request<RemoveMessageButtonAdminButtonsButtonUuidDeleteData, HTTPValidationError>({
        path: `/admin/buttons/${buttonUuid}`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
  ws = {
    /**
     * No description
     *
     * @tags ws
     * @name HtmlWsPageWsPageGet
     * @summary Html Ws Page
     * @request GET:/ws/page
     */
    htmlWsPageWsPageGet: (params: RequestParams = {}) =>
      this.request<HtmlWsPageWsPageGetData, any>({
        path: `/ws/page`,
        method: "GET",
        ...params,
      }),
  };
}
