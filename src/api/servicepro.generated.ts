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

export interface AccountRegistration {
  readonly ok: string;
  /** @maxLength 128 */
  password: string;
  /**
   * @minLength 10
   * @maxLength 80
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  profile?: DefaultProfile | null;
  /** @format email */
  email?: string;
  readonly uid: string;
}

export interface ControlPoint {
  readonly id: number;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name?: string;
  /** @format double */
  longitude?: number;
  /** @format double */
  latitude?: number;
  /** Permanent */
  is_permanent?: boolean;
  physical_address?: number | null;
  organization: number;
}

export interface DaDataOrganization {
  inn: string;
  kpp: string;
  ogrn: string;
  /** @format date-time */
  ogrn_date: string;
  type: string;
  name_full_with_opf: string;
  name_short_with_opf: string;
  name_latin: string;
  name_full: string;
  name_short: string;
  owner_name: string;
  state_status: string;
  address: DaDataSimpleAddress;
}

export interface DaDataSimpleAddress {
  value: string;
  /** @format double */
  latitude: number;
  /** @format double */
  longitude: number;
}

export interface DefaultProfile {
  readonly id: number;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 120 */
  last_name?: string;
  /** @maxLength 120 */
  first_name?: string;
  /** @maxLength 120 */
  middle_name?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /** @maxLength 128 */
  phone_number?: string;
  /** @maxLength 120 */
  position?: string;
  /**
   * Фото
   * @format uri
   */
  photo?: string;
  /** @maxLength 120 */
  telegram?: string;
  /** @maxLength 120 */
  whatsapp?: string;
  /** @maxLength 120 */
  viber?: string;
}

export interface Device {
  readonly id: number;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 255 */
  user_agent?: string;
  /**
   * * `0` - Ничего
   * * `1` - DB
   * * `100` - Email
   * * `200` - FCM Mobile
   * * `210` - FCM Web
   * * `300` - HPK Mobile
   */
  device_type?: DeviceTypeEnum;
  /** @maxLength 255 */
  token: string;
  readonly user: number;
}

/**
 * * `0` - Ничего
 * * `1` - DB
 * * `100` - Email
 * * `200` - FCM Mobile
 * * `210` - FCM Web
 * * `300` - HPK Mobile
 */
export enum DeviceTypeEnum {
  Value0 = 0,
  Value1 = 1,
  Value100 = 100,
  Value200 = 200,
  Value210 = 210,
  Value300 = 300,
}

export interface Employee {
  readonly id: number;
  /**
   * * `client` - client
   * * `engineer` - engineer
   * * `coordinator` - coordinator
   */
  role: RoleEnum;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** Owner */
  is_owner?: boolean;
  /** Active */
  is_active?: boolean;
  readonly organization: number;
  profile?: number | null;
}

export interface EmployeeDetailed {
  readonly id: number;
  /**
   * * `client` - client
   * * `engineer` - engineer
   * * `coordinator` - coordinator
   */
  role: RoleEnum;
  readonly profile: Profile;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** Owner */
  is_owner?: boolean;
  /** Active */
  is_active?: boolean;
  readonly organization: number;
}

export interface MyEmployment {
  readonly id: number;
  /**
   * * `client` - client
   * * `engineer` - engineer
   * * `coordinator` - coordinator
   */
  role: RoleEnum;
  readonly profile: Profile;
  readonly organization: Organization;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** Owner */
  is_owner?: boolean;
  /** Active */
  is_active?: boolean;
}

export interface MyInvite {
  readonly id: number;
  readonly is_expired: boolean;
  /**
   * * `client` - client
   * * `engineer` - engineer
   * * `coordinator` - coordinator
   */
  role: RoleEnum;
  readonly organization: Organization;
  readonly profile: Profile;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /**
   * Username
   * @maxLength 120
   */
  user_username?: string;
  /**
   * Email
   * @format email
   * @maxLength 254
   */
  user_email?: string;
  /** Accepted */
  is_accepted?: boolean;
  /** @format date-time */
  accept_date?: string | null;
  /** @format date-time */
  expiry_date?: string | null;
  creator: number | null;
  suggest?: number | null;
}

export interface MyOrgInvite {
  readonly id: number;
  readonly is_rejected: boolean;
  is_service_center?: boolean;
  requisites: OrganizationRequisites;
  settings?: OrganizationSettings | null;
  readonly service_center: ServiceCenter;
  contact: Profile;
  profile: Profile;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** @maxLength 125 */
  identifier: string;
  /** @maxLength 28 */
  identifier_kind?: string;
  /** Created as new */
  as_new?: boolean;
  /** Approved */
  is_approved?: boolean;
  /** @format date-time */
  verdict_date?: string | null;
  reject_message?: string;
  creator: number | null;
  organization: number | null;
}

export interface MyUserAll {
  readonly id: number;
  /**
   * Required. 120 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 120
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Admin email
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /** @format date-time */
  last_login?: string | null;
  /** @format date-time */
  date_joined?: string;
  /** Activated */
  is_activated?: boolean;
  profile: DefaultProfile;
  readonly employments: MyEmployment[];
  readonly user_invites: MyInvite[];
  readonly org_invites: MyOrgInvite[];
}

export interface MyUserEmployment {
  readonly id: number;
  /**
   * Required. 120 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 120
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Admin email
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /** @format date-time */
  last_login?: string | null;
  /** @format date-time */
  date_joined?: string;
  /** Activated */
  is_activated?: boolean;
  profile: DefaultProfile;
  readonly employments: MyEmployment[];
}

export interface MyUserInvite {
  readonly id: number;
  /**
   * Required. 120 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 120
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Admin email
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /** @format date-time */
  last_login?: string | null;
  /** @format date-time */
  date_joined?: string;
  /** Activated */
  is_activated?: boolean;
  profile: DefaultProfile;
  readonly user_invites: MyInvite[];
  readonly org_invites: MyOrgInvite[];
}

export interface Notification {
  readonly id: number;
  /** @format date-time */
  readonly created_at: string;
  /** @maxLength 255 */
  title: string;
  text: string;
  payload?: Record<string, any>;
  readonly user: number;
}

export interface Organization {
  readonly id: number;
  readonly is_service_center: boolean;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** Active */
  is_active?: boolean;
  /**
   * Фото
   * @format uri
   */
  photo?: string;
  /** Organization requisites */
  requisites?: number | null;
  /** Organization contact */
  contact?: number | null;
}

export interface OrganizationDetailed {
  readonly id: number;
  readonly is_service_center: boolean;
  requisites: OrganizationRequisites;
  settings: OrganizationSettings;
  service_center: ServiceCenter;
  contact: Profile;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** Active */
  is_active?: boolean;
  /**
   * Фото
   * @format uri
   */
  photo?: string;
}

export interface OrganizationInn {
  inn: string;
  readonly results: DaDataOrganization[];
}

export interface OrganizationInvite {
  readonly id: number;
  readonly is_rejected: boolean;
  is_service_center?: boolean;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** @maxLength 125 */
  identifier: string;
  readonly identifier_kind: string;
  /** Created as new */
  readonly as_new: boolean;
  /** Approved */
  readonly is_approved: boolean;
  /** @format date-time */
  readonly verdict_date: string | null;
  reject_message?: string;
  readonly creator: number | null;
  /** Organization requisites */
  requisites?: number | null;
  profile?: number | null;
  /** Organization contact */
  contact?: number | null;
  /** Organization settings */
  settings?: number | null;
  service_center?: number | null;
  readonly organization: number | null;
}

export interface OrganizationInviteDetailed {
  readonly id: number;
  readonly is_rejected: boolean;
  is_service_center?: boolean;
  requisites: OrganizationRequisites;
  settings?: OrganizationSettings | null;
  readonly service_center: ServiceCenter;
  contact: Profile;
  profile: Profile;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** @maxLength 125 */
  identifier: string;
  readonly identifier_kind: string;
  /** Created as new */
  readonly as_new: boolean;
  /** Approved */
  readonly is_approved: boolean;
  /** @format date-time */
  readonly verdict_date: string | null;
  reject_message?: string;
  readonly creator: number | null;
  readonly organization: number | null;
}

export interface OrganizationRequisites {
  readonly id: number;
  /** Индивидуальный Предприниматель */
  readonly is_ip: boolean;
  /** Юридическое Лицо */
  readonly is_ul: boolean;
  /** Физическое Лицо */
  readonly is_fl: boolean;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 255 */
  full_name: string;
  /** @maxLength 9 */
  kpp?: string;
  /** @maxLength 12 */
  inn?: string;
  /** @maxLength 15 */
  ogrn?: string;
  /**
   * Ogrn issue date
   * @format date
   */
  ogrn_date?: string | null;
  physical_address?: number | null;
  legal_address?: number | null;
  postal_address?: number | null;
}

export interface OrganizationSettings {
  readonly id: number;
  time_zone: string;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
}

export type PaginatedControlPointList = ControlPoint[];

export type PaginatedDeviceList = Device[];

export type PaginatedEmployeeList = Employee[];

export type PaginatedNotificationList = Notification[];

export type PaginatedOrganizationInviteList = OrganizationInvite[];

export type PaginatedOrganizationList = Organization[];

export type PaginatedUserInviteList = UserInvite[];

export interface PatchedControlPoint {
  readonly id?: number;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** @maxLength 127 */
  name?: string;
  /** @format double */
  longitude?: number;
  /** @format double */
  latitude?: number;
  /** Permanent */
  is_permanent?: boolean;
  physical_address?: number | null;
  organization?: number;
}

export interface PatchedEmployee {
  readonly id?: number;
  /**
   * * `client` - client
   * * `engineer` - engineer
   * * `coordinator` - coordinator
   */
  role?: RoleEnum;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** Owner */
  is_owner?: boolean;
  /** Active */
  is_active?: boolean;
  readonly organization?: number;
  profile?: number | null;
}

export interface PatchedProfile {
  readonly id?: number;
  /** @format uri */
  photo?: string;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** @maxLength 120 */
  last_name?: string;
  /** @maxLength 120 */
  first_name?: string;
  /** @maxLength 120 */
  middle_name?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /** @maxLength 128 */
  phone_number?: string;
  /** @maxLength 120 */
  position?: string;
  /** @maxLength 120 */
  telegram?: string;
  /** @maxLength 120 */
  whatsapp?: string;
  /** @maxLength 120 */
  viber?: string;
}

export interface PatchedUserPersonal {
  readonly id?: number;
  /** Required. 120 characters or fewer. Letters, digits and @/./+/-/_ only. */
  readonly username?: string;
  profile?: DefaultProfile;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  readonly is_staff?: boolean;
  /** @format date-time */
  readonly last_login?: string | null;
  /** @format date-time */
  readonly date_joined?: string;
  /** Activated */
  readonly is_activated?: boolean;
}

export interface Profile {
  readonly id: number;
  /** @format uri */
  photo: string;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 120 */
  last_name?: string;
  /** @maxLength 120 */
  first_name?: string;
  /** @maxLength 120 */
  middle_name?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /** @maxLength 128 */
  phone_number?: string;
  /** @maxLength 120 */
  position?: string;
  /** @maxLength 120 */
  telegram?: string;
  /** @maxLength 120 */
  whatsapp?: string;
  /** @maxLength 120 */
  viber?: string;
}

/**
 * * `client` - client
 * * `engineer` - engineer
 * * `coordinator` - coordinator
 */
export enum RoleEnum {
  Client = "client",
  Engineer = "engineer",
  Coordinator = "coordinator",
}

export interface ServiceCenter {
  readonly id: number;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
}

export interface TokenObtainPair {
  username: string;
  password: string;
  readonly access: string;
  readonly refresh: string;
}

export interface TokenRefresh {
  readonly access: string;
  refresh: string;
}

export interface TokenVerify {
  token: string;
}

export interface UserAcceptInvite {
  readonly id: string;
  readonly is_expired: string;
  readonly is_accepted: string;
}

export interface UserActivation {
  readonly ok: string;
  uid: string;
  token: string;
}

export interface UserDeleteAccount {
  readonly ok: string;
  readonly uid: string;
}

export interface UserDeleteAccountConfirm {
  readonly ok: string;
  token: string;
}

export interface UserInvite {
  readonly id: number;
  readonly is_expired: boolean;
  /**
   * * `client` - client
   * * `engineer` - engineer
   * * `coordinator` - coordinator
   */
  role: RoleEnum;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /**
   * Username
   * @maxLength 120
   */
  user_username?: string;
  /**
   * Email
   * @format email
   * @maxLength 254
   */
  user_email?: string;
  /** Accepted */
  readonly is_accepted: boolean;
  /** @format date-time */
  readonly accept_date: string | null;
  /** @format date-time */
  readonly expiry_date: string | null;
  readonly creator: number | null;
  readonly organization: number;
  profile: number | null;
  readonly suggest: number | null;
}

export interface UserInviteDetailed {
  readonly id: number;
  readonly is_expired: boolean;
  /**
   * * `client` - client
   * * `engineer` - engineer
   * * `coordinator` - coordinator
   */
  role: RoleEnum;
  readonly organization: Organization;
  profile: Profile;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /**
   * Username
   * @maxLength 120
   */
  user_username?: string;
  /**
   * Email
   * @format email
   * @maxLength 254
   */
  user_email?: string;
  /** Accepted */
  readonly is_accepted: boolean;
  /** @format date-time */
  readonly accept_date: string | null;
  /** @format date-time */
  readonly expiry_date: string | null;
  readonly creator: number | null;
  readonly suggest: number | null;
}

export interface UserPersonal {
  readonly id: number;
  /** Required. 120 characters or fewer. Letters, digits and @/./+/-/_ only. */
  readonly username: string;
  profile: DefaultProfile;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  readonly is_staff: boolean;
  /** @format date-time */
  readonly last_login: string | null;
  /** @format date-time */
  readonly date_joined: string;
  /** Activated */
  readonly is_activated: boolean;
}

export interface UserResendActivation {
  readonly ok: string;
  username: string;
  readonly uid: string;
  /** @format email */
  email?: string;
}

export interface UserResetPassword {
  readonly ok: string;
  username: string;
  readonly uid: string;
}

export interface UserResetPasswordConfirm {
  readonly ok: string;
  uid: string;
  token: string;
  new_password: string;
}

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
 * @title СервисПро
 * @version 0.0.1 (v1)
 *
 * Автодокументация
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags account
     * @name AccountActionsActivationCreate
     * @request POST:/api/v1/account/actions/activation/
     * @secure
     */
    accountActionsActivationCreate: (data: UserActivation, params: RequestParams = {}) =>
      this.request<UserActivation, any>({
        path: `/api/v1/account/actions/activation/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountActionsRegistrationCreate
     * @request POST:/api/v1/account/actions/registration/
     * @secure
     */
    accountActionsRegistrationCreate: (data: AccountRegistration, params: RequestParams = {}) =>
      this.request<AccountRegistration, any>({
        path: `/api/v1/account/actions/registration/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountActionsResendActivationCreate
     * @request POST:/api/v1/account/actions/resend-activation/
     * @secure
     */
    accountActionsResendActivationCreate: (data: UserResendActivation, params: RequestParams = {}) =>
      this.request<UserResendActivation, any>({
        path: `/api/v1/account/actions/resend-activation/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountActionsResetPasswordCreate
     * @request POST:/api/v1/account/actions/reset-password/
     * @secure
     */
    accountActionsResetPasswordCreate: (data: UserResetPassword, params: RequestParams = {}) =>
      this.request<UserResetPassword, any>({
        path: `/api/v1/account/actions/reset-password/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountActionsResetPasswordConfirmCreate
     * @request POST:/api/v1/account/actions/reset-password-confirm/
     * @secure
     */
    accountActionsResetPasswordConfirmCreate: (data: UserResetPasswordConfirm, params: RequestParams = {}) =>
      this.request<UserResetPasswordConfirm, any>({
        path: `/api/v1/account/actions/reset-password-confirm/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountDeviceList
     * @request GET:/api/v1/account/device/
     * @secure
     */
    accountDeviceList: (
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedDeviceList, any>({
        path: `/api/v1/account/device/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountDeviceCreate
     * @request POST:/api/v1/account/device/
     * @secure
     */
    accountDeviceCreate: (data: Device, params: RequestParams = {}) =>
      this.request<Device, any>({
        path: `/api/v1/account/device/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountDeviceRetrieve
     * @request GET:/api/v1/account/device/{id}/
     * @secure
     */
    accountDeviceRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Device, any>({
        path: `/api/v1/account/device/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountDeviceDestroy
     * @request DELETE:/api/v1/account/device/{id}/
     * @secure
     */
    accountDeviceDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/account/device/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
     *
     * @tags account
     * @name AccountJwtCreateCreate
     * @request POST:/api/v1/account/jwt/create/
     */
    accountJwtCreateCreate: (data: TokenObtainPair, params: RequestParams = {}) =>
      this.request<TokenObtainPair, any>({
        path: `/api/v1/account/jwt/create/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags account
     * @name AccountJwtRefreshCreate
     * @request POST:/api/v1/account/jwt/refresh/
     */
    accountJwtRefreshCreate: (data: TokenRefresh, params: RequestParams = {}) =>
      this.request<TokenRefresh, any>({
        path: `/api/v1/account/jwt/refresh/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a token and indicates if it is valid.  This view provides no information about a token's fitness for a particular use.
     *
     * @tags account
     * @name AccountJwtVerifyCreate
     * @request POST:/api/v1/account/jwt/verify/
     */
    accountJwtVerifyCreate: (data: TokenVerify, params: RequestParams = {}) =>
      this.request<TokenVerify, any>({
        path: `/api/v1/account/jwt/verify/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountMeRetrieve
     * @request GET:/api/v1/account/me/
     * @secure
     */
    accountMeRetrieve: (params: RequestParams = {}) =>
      this.request<UserPersonal, any>({
        path: `/api/v1/account/me/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountMePartialUpdate
     * @request PATCH:/api/v1/account/me/
     * @secure
     */
    accountMePartialUpdate: (data: PatchedUserPersonal, params: RequestParams = {}) =>
      this.request<UserPersonal, any>({
        path: `/api/v1/account/me/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountMeDeleteAccountCreate
     * @request POST:/api/v1/account/me/delete-account/
     * @secure
     */
    accountMeDeleteAccountCreate: (data: UserDeleteAccount, params: RequestParams = {}) =>
      this.request<UserDeleteAccount, any>({
        path: `/api/v1/account/me/delete-account/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountMeDeleteAccountConfirmCreate
     * @request POST:/api/v1/account/me/delete-account-confirm/
     * @secure
     */
    accountMeDeleteAccountConfirmCreate: (data: UserDeleteAccountConfirm, params: RequestParams = {}) =>
      this.request<UserDeleteAccountConfirm, any>({
        path: `/api/v1/account/me/delete-account-confirm/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountNotificationList
     * @request GET:/api/v1/account/notification/
     * @secure
     */
    accountNotificationList: (
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
        title?: string;
        user?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedNotificationList, any>({
        path: `/api/v1/account/notification/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountNotificationRetrieve
     * @request GET:/api/v1/account/notification/{id}/
     * @secure
     */
    accountNotificationRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Notification, any>({
        path: `/api/v1/account/notification/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgMyRetrieve
     * @request GET:/api/v1/org/my/
     * @secure
     */
    orgMyRetrieve: (params: RequestParams = {}) =>
      this.request<MyUserAll, any>({
        path: `/api/v1/org/my/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgMyEmploymentsRetrieve
     * @request GET:/api/v1/org/my-employments/
     * @secure
     */
    orgMyEmploymentsRetrieve: (params: RequestParams = {}) =>
      this.request<MyUserEmployment, any>({
        path: `/api/v1/org/my-employments/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgMyInvitesRetrieve
     * @request GET:/api/v1/org/my-invites/
     * @secure
     */
    orgMyInvitesRetrieve: (params: RequestParams = {}) =>
      this.request<MyUserInvite, any>({
        path: `/api/v1/org/my-invites/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsList
     * @request GET:/api/v1/org/orgs/
     * @secure
     */
    orgOrgsList: (
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /**
         * Ordering
         *
         * * `created_at` - Created at
         * * `-created_at` - Created at (descending)
         * * `updated_at` - Updated at
         * * `-updated_at` - Updated at (descending)
         */
        o?: ("-created_at" | "-updated_at" | "created_at" | "updated_at")[];
        /** The initial index from which to return the results. */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedOrganizationList, any>({
        path: `/api/v1/org/orgs/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsInvitesList
     * @request GET:/api/v1/org/orgs-invites/
     * @secure
     */
    orgOrgsInvitesList: (
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /**
         * Ordering
         *
         * * `created_at` - Created at
         * * `-created_at` - Created at (descending)
         * * `updated_at` - Updated at
         * * `-updated_at` - Updated at (descending)
         */
        o?: ("-created_at" | "-updated_at" | "created_at" | "updated_at")[];
        /** The initial index from which to return the results. */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedOrganizationInviteList, any>({
        path: `/api/v1/org/orgs-invites/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsInvitesCreate
     * @request POST:/api/v1/org/orgs-invites/
     * @secure
     */
    orgOrgsInvitesCreate: (data: OrganizationInviteDetailed, params: RequestParams = {}) =>
      this.request<OrganizationInviteDetailed, any>({
        path: `/api/v1/org/orgs-invites/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsInvitesRetrieve
     * @request GET:/api/v1/org/orgs-invites/{id}/
     * @secure
     */
    orgOrgsInvitesRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<OrganizationInviteDetailed, any>({
        path: `/api/v1/org/orgs-invites/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsInvitesDestroy
     * @request DELETE:/api/v1/org/orgs-invites/{id}/
     * @secure
     */
    orgOrgsInvitesDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/org/orgs-invites/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsInvitesInnCreate
     * @request POST:/api/v1/org/orgs-invites/inn/
     * @secure
     */
    orgOrgsInvitesInnCreate: (data: OrganizationInn, params: RequestParams = {}) =>
      this.request<OrganizationInn, any>({
        path: `/api/v1/org/orgs-invites/inn/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsEmployeesList
     * @request GET:/api/v1/org/orgs/{org_id}/employees/
     * @secure
     */
    orgOrgsEmployeesList: (
      orgId: string,
      query?: {
        is_active?: boolean;
        is_owner?: boolean;
        /** Number of results to return per page. */
        limit?: number;
        /**
         * Ordering
         *
         * * `created_at` - Created at
         * * `-created_at` - Created at (descending)
         * * `updated_at` - Updated at
         * * `-updated_at` - Updated at (descending)
         */
        o?: ("-created_at" | "-updated_at" | "created_at" | "updated_at")[];
        /** The initial index from which to return the results. */
        offset?: number;
        profile?: number;
        role?: string;
        user?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedEmployeeList, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsEmployeesCreate
     * @request POST:/api/v1/org/orgs/{org_id}/employees/
     * @secure
     */
    orgOrgsEmployeesCreate: (orgId: string, data: Employee, params: RequestParams = {}) =>
      this.request<Employee, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsEmployeesRetrieve
     * @request GET:/api/v1/org/orgs/{org_id}/employees/{id}/
     * @secure
     */
    orgOrgsEmployeesRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<EmployeeDetailed, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsEmployeesPartialUpdate
     * @request PATCH:/api/v1/org/orgs/{org_id}/employees/{id}/
     * @secure
     */
    orgOrgsEmployeesPartialUpdate: (id: number, orgId: string, data: PatchedEmployee, params: RequestParams = {}) =>
      this.request<Employee, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsEmployeesDestroy
     * @request DELETE:/api/v1/org/orgs/{org_id}/employees/{id}/
     * @secure
     */
    orgOrgsEmployeesDestroy: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsMyProfileRetrieve
     * @request GET:/api/v1/org/orgs/{org_id}/my-profile/
     * @secure
     */
    orgOrgsMyProfileRetrieve: (orgId: string, params: RequestParams = {}) =>
      this.request<Profile, any>({
        path: `/api/v1/org/orgs/${orgId}/my-profile/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsMyProfilePartialUpdate
     * @request PATCH:/api/v1/org/orgs/{org_id}/my-profile/
     * @secure
     */
    orgOrgsMyProfilePartialUpdate: (orgId: string, data: PatchedProfile, params: RequestParams = {}) =>
      this.request<Profile, any>({
        path: `/api/v1/org/orgs/${orgId}/my-profile/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsPointsList
     * @request GET:/api/v1/org/orgs/{org_id}/points/
     * @secure
     */
    orgOrgsPointsList: (
      orgId: string,
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /**
         * Ordering
         *
         * * `created_at` - Created at
         * * `-created_at` - Created at (descending)
         * * `updated_at` - Updated at
         * * `-updated_at` - Updated at (descending)
         */
        o?: ("-created_at" | "-updated_at" | "created_at" | "updated_at")[];
        /** The initial index from which to return the results. */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedControlPointList, any>({
        path: `/api/v1/org/orgs/${orgId}/points/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsPointsCreate
     * @request POST:/api/v1/org/orgs/{org_id}/points/
     * @secure
     */
    orgOrgsPointsCreate: (orgId: string, data: ControlPoint, params: RequestParams = {}) =>
      this.request<ControlPoint, any>({
        path: `/api/v1/org/orgs/${orgId}/points/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsPointsRetrieve
     * @request GET:/api/v1/org/orgs/{org_id}/points/{id}/
     * @secure
     */
    orgOrgsPointsRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<ControlPoint, any>({
        path: `/api/v1/org/orgs/${orgId}/points/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsPointsPartialUpdate
     * @request PATCH:/api/v1/org/orgs/{org_id}/points/{id}/
     * @secure
     */
    orgOrgsPointsPartialUpdate: (id: number, orgId: string, data: PatchedControlPoint, params: RequestParams = {}) =>
      this.request<ControlPoint, any>({
        path: `/api/v1/org/orgs/${orgId}/points/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsPointsDestroy
     * @request DELETE:/api/v1/org/orgs/{org_id}/points/{id}/
     * @secure
     */
    orgOrgsPointsDestroy: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/org/orgs/${orgId}/points/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsUserInvitesList
     * @request GET:/api/v1/org/orgs/{org_id}/user-invites/
     * @secure
     */
    orgOrgsUserInvitesList: (
      orgId: string,
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /**
         * Ordering
         *
         * * `created_at` - Created at
         * * `-created_at` - Created at (descending)
         * * `updated_at` - Updated at
         * * `-updated_at` - Updated at (descending)
         */
        o?: ("-created_at" | "-updated_at" | "created_at" | "updated_at")[];
        /** The initial index from which to return the results. */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedUserInviteList, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsUserInvitesCreate
     * @request POST:/api/v1/org/orgs/{org_id}/user-invites/
     * @secure
     */
    orgOrgsUserInvitesCreate: (orgId: string, data: UserInviteDetailed, params: RequestParams = {}) =>
      this.request<UserInviteDetailed, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsUserInvitesRetrieve
     * @request GET:/api/v1/org/orgs/{org_id}/user-invites/{id}/
     * @secure
     */
    orgOrgsUserInvitesRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<UserInviteDetailed, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsUserInvitesDestroy
     * @request DELETE:/api/v1/org/orgs/{org_id}/user-invites/{id}/
     * @secure
     */
    orgOrgsUserInvitesDestroy: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsUserInvitesAcceptCreate
     * @request POST:/api/v1/org/orgs/{org_id}/user-invites/{id}/accept/
     * @secure
     */
    orgOrgsUserInvitesAcceptCreate: (id: number, orgId: string, data: UserAcceptInvite, params: RequestParams = {}) =>
      this.request<UserAcceptInvite, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/${id}/accept/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsRetrieve
     * @request GET:/api/v1/org/orgs/{id}/
     * @secure
     */
    orgOrgsRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<OrganizationDetailed, any>({
        path: `/api/v1/org/orgs/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
