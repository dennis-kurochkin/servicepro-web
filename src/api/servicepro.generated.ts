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
  readonly refresh: string;
  readonly access: string;
}

export interface AccountRegistrationRetry {
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
  readonly refresh: string;
  readonly access: string;
}

export interface Address {
  /** @min 0 */
  id?: number | null;
  /** @maxLength 250 */
  value?: string;
  readonly region: Region | null;
  /** @default "user" */
  source?: SourceEnum;
  /** @maxLength 15 */
  postal_code?: string;
  /** @format double */
  longitude?: number;
  /** @format double */
  latitude?: number;
  readonly is_clean: boolean;
  readonly is_final: boolean;
}

export interface ControlPoint {
  readonly id: number;
  address?: Address;
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
  organization: number;
}

export interface CookieTokenRefresh {
  readonly access: string;
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
  /** @format uri */
  photo?: string | null;
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

/** * `vehicle_catalog` - vehicle_catalog */
export enum KeyEnum {
  VehicleCatalog = "vehicle_catalog",
}

/**
 * * `info` - info
 * * `warning` - warning
 * * `critical` - critical
 */
export enum LevelEnum {
  Info = "info",
  Warning = "warning",
  Critical = "critical",
}

/**
 * * `draft` - draft
 * * `posted` - posted
 * * `reject` - reject
 * * `delete` - delete
 */
export enum MarkEnum {
  Draft = "draft",
  Posted = "posted",
  Reject = "reject",
  Delete = "delete",
}

/**
 * * `0` - Черновик
 * * `10` - Опубликована
 * * `20` - Отклонена
 * * `30` - Удалена
 */
export enum MarkEnumEnum {
  Value0 = 0,
  Value10 = 10,
  Value20 = 20,
  Value30 = 30,
}

/**
 * * `info` - info
 * * `problem` - problem
 * * `recommendation` - recommendation
 */
export enum MeaningEnum {
  Info = "info",
  Problem = "problem",
  Recommendation = "recommendation",
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
  payload?: any;
  readonly user: number;
}

export interface OrgWorkTask {
  readonly id: number;
  /**
   * * `draft` - draft
   * * `posted` - posted
   * * `reject` - reject
   * * `delete` - delete
   */
  mark: MarkEnum;
  /**
   * * `search` - search
   * * `approval` - approval
   * * `wait` - wait
   * * `pause` - pause
   * * `work` - work
   * * `done` - done
   */
  status: StatusEnum;
  readonly service_center: OrganizationPublic;
  readonly vehicle: Vehicle;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  number: number;
  /** @maxLength 120 */
  title?: string;
  /** @format date-time */
  status_date?: string | null;
  /** @format date-time */
  mark_date?: string | null;
  /** Mark */
  mark_enum?: MarkEnumEnum;
  organization: number;
  customer?: number | null;
  coordinator?: number | null;
  readonly executor: number | null;
  /** Parent task */
  parent?: number | null;
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

export interface OrganizationCacheFile {
  readonly id: number;
  readonly is_personal: boolean;
  /** * `vehicle_catalog` - vehicle_catalog */
  key: KeyEnum;
  /** @format date-time */
  readonly updated_at: string;
  /** @format uri */
  file?: string;
  format_version?: number;
}

export interface OrganizationDetailed {
  readonly id: number;
  readonly is_service_center: boolean;
  requisites: OrganizationRequisites;
  settings: OrganizationSettings;
  service_center: ServiceCenter;
  contact: Profile;
  /** @format uri */
  photo?: string | null;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** Active */
  is_active?: boolean;
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
  readonly reject_message: string;
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

export interface OrganizationPublic {
  readonly id: number;
  readonly is_service_center: boolean;
  requisites: OrganizationRequisites;
  contact: Profile;
  /** @format uri */
  photo?: string | null;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** Active */
  is_active?: boolean;
}

export interface OrganizationRequisites {
  readonly id: number;
  physical_address?: Address;
  legal_address?: Address;
  postal_address?: Address;
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

export type PaginatedOrgWorkTaskList = OrgWorkTask[];

export type PaginatedOrganizationInviteList = OrganizationInvite[];

export type PaginatedOrganizationList = Organization[];

export type PaginatedSerWorkTaskList = SerWorkTask[];

export type PaginatedUserInviteList = UserInvite[];

export type PaginatedVehicleBrandList = VehicleBrand[];

export type PaginatedVehicleDocumentationDetailedList = VehicleDocumentationDetailed[];

export type PaginatedVehicleEquipmentList = VehicleEquipment[];

export type PaginatedVehicleList = Vehicle[];

export type PaginatedVehicleModelDetailedList = VehicleModelDetailed[];

export type PaginatedVehicleNoteList = VehicleNote[];

export type PaginatedVehiclePhotoDetailedList = VehiclePhotoDetailed[];

export type PaginatedVehicleRecommendationDetailedList = VehicleRecommendationDetailed[];

export type PaginatedVehicleRuntimeList = VehicleRuntime[];

export type PaginatedWorkEmployeeList = WorkEmployee[];

export type PaginatedWorkOrganizationList = WorkOrganization[];

export type PaginatedWorkServiceCenterList = WorkServiceCenter[];

export type PaginatedWorkTaskStatusChangeDetailedList = WorkTaskStatusChangeDetailed[];

export type PaginatedWorkVehicleList = WorkVehicle[];

export interface PatchedControlPoint {
  readonly id?: number;
  address?: Address;
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

export interface PatchedOrgWorkTask {
  readonly id?: number;
  /**
   * * `draft` - draft
   * * `posted` - posted
   * * `reject` - reject
   * * `delete` - delete
   */
  mark?: MarkEnum;
  /**
   * * `search` - search
   * * `approval` - approval
   * * `wait` - wait
   * * `pause` - pause
   * * `work` - work
   * * `done` - done
   */
  status?: StatusEnum;
  readonly service_center?: OrganizationPublic;
  readonly vehicle?: Vehicle;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  number?: number;
  /** @maxLength 120 */
  title?: string;
  /** @format date-time */
  status_date?: string | null;
  /** @format date-time */
  mark_date?: string | null;
  /** Mark */
  mark_enum?: MarkEnumEnum;
  organization?: number;
  customer?: number | null;
  coordinator?: number | null;
  readonly executor?: number | null;
  /** Parent task */
  parent?: number | null;
}

export interface PatchedOrganizationRequisites {
  readonly id?: number;
  physical_address?: Address;
  legal_address?: Address;
  postal_address?: Address;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** @maxLength 255 */
  full_name?: string;
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
}

export interface PatchedOrganizationSettings {
  readonly id?: number;
  time_zone?: string;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
}

export interface PatchedProfile {
  readonly id?: number;
  /** @format uri */
  photo?: string | null;
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

export interface PatchedServiceCenter {
  readonly id?: number;
  readonly coverage_regions?: Region[];
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
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

export interface PatchedVehicleBrand {
  readonly id?: number;
  /** @format uri */
  icon?: string;
  readonly is_public?: boolean;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** @maxLength 126 */
  name?: string;
  /** @maxLength 510 */
  info?: string;
  /** @format double */
  order?: number;
  readonly organization?: number | null;
}

export interface PatchedVehicleEdit {
  readonly id?: number;
  readonly is_hidden?: boolean;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /**
   * Serial number
   * @maxLength 254
   */
  sn?: string;
  /** @maxLength 510 */
  info?: string;
  manufacture_date?: number | null;
  /** @maxLength 15 */
  gos_number?: string;
  /** @format double */
  order?: number;
  /** @format date-time */
  readonly hide_date?: string | null;
  /** Модель техники */
  model?: number | null;
  readonly organization?: number;
}

export interface PatchedVehicleModelDetailed {
  readonly id?: number;
  /** @format uri */
  icon?: string;
  readonly is_public?: boolean;
  readonly brand?: VehicleBrand;
  readonly equipment?: VehicleEquipment;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** @maxLength 126 */
  name_prefix?: string;
  /** @maxLength 126 */
  name?: string;
  /** @maxLength 510 */
  info?: string;
  /** @format double */
  order?: number;
  readonly organization?: number | null;
}

export interface PatchedVehicleNote {
  readonly id?: number;
  readonly author?: EmployeeDetailed;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** @maxLength 510 */
  text?: string;
  /** Personal */
  is_personal?: boolean;
  readonly vehicle?: number;
  readonly service_center?: number | null;
}

export interface PatchedVehiclePhotoUpdate {
  readonly id?: number;
  /**
   * * `info` - info
   * * `problem` - problem
   * * `recommendation` - recommendation
   */
  meaning?: MeaningEnum;
  /**
   * * `no` - no
   * * `posted` - posted
   * * `rejected` - rejected
   */
  verdict?: VerdictEnum;
  readonly author?: EmployeeDetailed;
  readonly is_approved?: boolean;
  readonly is_rejected?: boolean;
  readonly auditor?: EmployeeDetailed;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** @maxLength 120 */
  title?: string;
  /** @format uri */
  readonly file?: string;
  /** @format date-time */
  verdict_date?: string | null;
  readonly vehicle?: number;
  readonly recommendation?: number | null;
}

export interface PatchedVehicleRecommendationDetailed {
  readonly id?: number;
  /**
   * * `info` - info
   * * `warning` - warning
   * * `critical` - critical
   */
  level?: LevelEnum;
  /**
   * * `no` - no
   * * `complete` - complete
   */
  solution?: SolutionEnum;
  /**
   * * `no` - no
   * * `posted` - posted
   * * `rejected` - rejected
   */
  verdict?: VerdictEnum;
  readonly author?: EmployeeDetailed;
  readonly is_approved?: boolean;
  readonly is_rejected?: boolean;
  readonly is_completed?: boolean;
  /** @format date-time */
  readonly complete_date?: string;
  readonly auditor?: EmployeeDetailed;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  /** @maxLength 120 */
  title?: string;
  /** @maxLength 510 */
  text?: string;
  /** @format date-time */
  solution_date?: string | null;
  /** @format date-time */
  verdict_date?: string | null;
  readonly vehicle?: number;
  readonly service_center?: number | null;
}

export interface PatchedVehicleRuntime {
  readonly id?: number;
  /**
   * * `no` - no
   * * `posted` - posted
   * * `rejected` - rejected
   */
  verdict?: VerdictEnum;
  readonly is_rejected?: boolean;
  readonly is_completed?: boolean;
  readonly author?: EmployeeDetailed;
  readonly auditor?: EmployeeDetailed;
  /** @format date-time */
  readonly created_at?: string;
  /** @format date-time */
  readonly updated_at?: string;
  value?: number;
  /** @format date-time */
  verdict_date?: string | null;
  readonly vehicle?: number;
  readonly service_center?: number | null;
}

export interface PatchedWorkTaskStatusChangeDetailed {
  /** @format uuid */
  readonly uuid?: string;
  readonly initiator?: EmployeeDetailed;
  /** @format date-time */
  real_date?: string | null;
  /** @maxLength 510 */
  text?: string;
  /** @format double */
  longitude?: number;
  /** @format double */
  latitude?: number;
  /** Approved */
  readonly is_approved?: boolean;
}

export interface Profile {
  readonly id: number;
  /** @format uri */
  photo?: string | null;
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

export interface Region {
  /**
   * Iso 3166
   * @maxLength 15
   */
  iso_3166_code?: string;
  /**
   * Code
   * @maxLength 15
   */
  local_code?: string;
  /**
   * Name
   * @maxLength 120
   */
  local_name?: string;
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

export interface SerWorkTask {
  readonly id: number;
  /**
   * * `draft` - draft
   * * `posted` - posted
   * * `reject` - reject
   * * `delete` - delete
   */
  mark: MarkEnum;
  /**
   * * `search` - search
   * * `approval` - approval
   * * `wait` - wait
   * * `pause` - pause
   * * `work` - work
   * * `done` - done
   */
  status: StatusEnum;
  readonly organization: OrganizationPublic;
  readonly vehicle: Vehicle;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  number: number;
  /** @maxLength 120 */
  title?: string;
  /** @format date-time */
  status_date?: string | null;
  /** @format date-time */
  mark_date?: string | null;
  /** Mark */
  mark_enum?: MarkEnumEnum;
  service_center?: number | null;
  customer?: number | null;
  coordinator?: number | null;
  readonly executor: number | null;
  /** Parent task */
  parent?: number | null;
}

export interface SerWorkTaskVerbose {
  readonly id: number;
  /**
   * * `draft` - draft
   * * `posted` - posted
   * * `reject` - reject
   * * `delete` - delete
   */
  mark: MarkEnum;
  /**
   * * `search` - search
   * * `approval` - approval
   * * `wait` - wait
   * * `pause` - pause
   * * `work` - work
   * * `done` - done
   */
  status: StatusEnum;
  readonly organization: OrganizationPublic;
  readonly vehicle: Vehicle;
  readonly approval: WorkTaskApproval;
  readonly customer: EmployeeDetailed;
  readonly executor: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  number: number;
  /** @maxLength 120 */
  title?: string;
  /** @format date-time */
  status_date?: string | null;
  /** @format date-time */
  mark_date?: string | null;
  /** Mark */
  mark_enum?: MarkEnumEnum;
  readonly service_center: number | null;
  coordinator?: number | null;
  /** Parent task */
  parent?: number | null;
}

export interface ServiceCenter {
  readonly id: number;
  readonly coverage_regions: Region[];
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
}

/**
 * * `no` - no
 * * `complete` - complete
 */
export enum SolutionEnum {
  No = "no",
  Complete = "complete",
}

/**
 * * `user` - user
 * * `osm` - osm
 * * `dadata` - dadata
 * * `fias` - fias
 */
export enum SourceEnum {
  User = "user",
  Osm = "osm",
  Dadata = "dadata",
  Fias = "fias",
}

/**
 * * `search` - search
 * * `approval` - approval
 * * `wait` - wait
 * * `pause` - pause
 * * `work` - work
 * * `done` - done
 */
export enum StatusEnum {
  Search = "search",
  Approval = "approval",
  Wait = "wait",
  Pause = "pause",
  Work = "work",
  Done = "done",
}

export interface TokenBlacklist {
  refresh: string;
}

export interface TokenObtainPairSerializerV2 {
  readonly access: string;
  readonly refresh: string;
  username: string;
  password: string;
}

export interface TokenRefresh {
  readonly access: string;
  refresh: string;
}

export interface TokenVerify {
  token: string;
}

export interface TotalVehicleSummaryPair {
  /** Runtime summary */
  runtime_sum?: number;
  r_info_count?: number;
  r_warning_count?: number;
  r_critical_count?: number;
  r_complete_count?: number;
  r_incomplete_count?: number;
  t_active_count?: number;
  t_total_count?: number;
}

export interface UserAcceptInvite {
  readonly id: number;
  readonly is_expired: boolean;
  readonly is_accepted: boolean;
}

export interface UserActivation {
  readonly ok: string;
  uid: string;
  token: string;
  readonly refresh: string;
  readonly access: string;
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
  /** @maxLength 128 */
  new_password: string;
}

export interface Vehicle {
  readonly id: number;
  readonly is_hidden: boolean;
  readonly summary: VehicleSummary;
  readonly model: VehicleModelDetailed;
  readonly name: string;
  readonly gost_number: string;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /**
   * Serial number
   * @maxLength 254
   */
  sn?: string;
  /** @maxLength 510 */
  info?: string;
  manufacture_date?: number | null;
  /** @maxLength 15 */
  gos_number?: string;
  /** @format double */
  order?: number;
  /** @format date-time */
  readonly hide_date: string | null;
  readonly organization: number;
}

export interface VehicleBrand {
  readonly id: number;
  /** @format uri */
  icon: string;
  readonly is_public: boolean;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 126 */
  name: string;
  /** @maxLength 510 */
  info?: string;
  /** @format double */
  order?: number;
  readonly organization: number | null;
}

export interface VehicleDetailed {
  readonly id: number;
  readonly is_hidden: boolean;
  readonly summary: VehicleSummary;
  readonly model: VehicleModelDetailed;
  readonly name: string;
  readonly gost_number: string;
  readonly recommendations: VehicleRecommendationDetailed[];
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /**
   * Serial number
   * @maxLength 254
   */
  sn?: string;
  /** @maxLength 510 */
  info?: string;
  manufacture_date?: number | null;
  /** @maxLength 15 */
  gos_number?: string;
  /** @format double */
  order?: number;
  /** @format date-time */
  hide_date?: string | null;
  readonly organization: number;
}

export interface VehicleDocumentationDetailed {
  readonly id: number;
  /** @format uri */
  file: string;
  readonly is_public: boolean;
  readonly author: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 126 */
  title?: string;
  readonly model: number;
  readonly organization: number | null;
}

export interface VehicleEdit {
  readonly id: number;
  readonly is_hidden: boolean;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /**
   * Serial number
   * @maxLength 254
   */
  sn?: string;
  /** @maxLength 510 */
  info?: string;
  manufacture_date?: number | null;
  /** @maxLength 15 */
  gos_number?: string;
  /** @format double */
  order?: number;
  /** @format date-time */
  readonly hide_date: string | null;
  /** Модель техники */
  model?: number | null;
  readonly organization: number;
}

export interface VehicleEquipment {
  readonly id: number;
  /** @maxLength 126 */
  name: string;
  /** @format uri */
  icon?: string;
}

export interface VehicleModel {
  readonly id: number;
  /** @format uri */
  icon: string;
  readonly is_public: boolean;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 126 */
  name_prefix?: string;
  /** @maxLength 126 */
  name: string;
  /** @maxLength 510 */
  info?: string;
  /** @format double */
  order?: number;
  brand: number;
  readonly organization: number | null;
  equipment?: number | null;
}

export interface VehicleModelDetailed {
  readonly id: number;
  /** @format uri */
  icon: string;
  readonly is_public: boolean;
  readonly brand: VehicleBrand;
  readonly equipment: VehicleEquipment;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 126 */
  name_prefix?: string;
  /** @maxLength 126 */
  name: string;
  /** @maxLength 510 */
  info?: string;
  /** @format double */
  order?: number;
  readonly organization: number | null;
}

export interface VehicleNote {
  readonly id: number;
  readonly author: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 510 */
  text?: string;
  /** Personal */
  is_personal?: boolean;
  readonly vehicle: number;
  readonly service_center: number | null;
}

export interface VehiclePhotoDetailed {
  readonly id: number;
  /**
   * * `info` - info
   * * `problem` - problem
   * * `recommendation` - recommendation
   */
  meaning: MeaningEnum;
  /**
   * * `no` - no
   * * `posted` - posted
   * * `rejected` - rejected
   */
  verdict: VerdictEnum;
  /** @format uri */
  file: string;
  readonly author: EmployeeDetailed;
  readonly is_approved: boolean;
  readonly is_rejected: boolean;
  readonly auditor: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 120 */
  title?: string;
  /** @format date-time */
  verdict_date?: string | null;
  readonly vehicle: number;
  readonly recommendation: number | null;
}

export interface VehiclePhotoUpdate {
  readonly id: number;
  /**
   * * `info` - info
   * * `problem` - problem
   * * `recommendation` - recommendation
   */
  meaning: MeaningEnum;
  /**
   * * `no` - no
   * * `posted` - posted
   * * `rejected` - rejected
   */
  verdict: VerdictEnum;
  readonly author: EmployeeDetailed;
  readonly is_approved: boolean;
  readonly is_rejected: boolean;
  readonly auditor: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 120 */
  title?: string;
  /** @format uri */
  readonly file: string;
  /** @format date-time */
  verdict_date?: string | null;
  readonly vehicle: number;
  readonly recommendation: number | null;
}

export interface VehicleRecommendationDetailed {
  readonly id: number;
  /**
   * * `info` - info
   * * `warning` - warning
   * * `critical` - critical
   */
  level: LevelEnum;
  /**
   * * `no` - no
   * * `complete` - complete
   */
  solution: SolutionEnum;
  /**
   * * `no` - no
   * * `posted` - posted
   * * `rejected` - rejected
   */
  verdict: VerdictEnum;
  readonly author: EmployeeDetailed;
  readonly is_approved: boolean;
  readonly is_rejected: boolean;
  readonly is_completed: boolean;
  /** @format date-time */
  readonly complete_date: string;
  readonly auditor: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 120 */
  title?: string;
  /** @maxLength 510 */
  text?: string;
  /** @format date-time */
  solution_date?: string | null;
  /** @format date-time */
  verdict_date?: string | null;
  readonly vehicle: number;
  readonly service_center: number | null;
}

export interface VehicleRuntime {
  readonly id: number;
  /**
   * * `no` - no
   * * `posted` - posted
   * * `rejected` - rejected
   */
  verdict: VerdictEnum;
  readonly is_rejected: boolean;
  readonly is_completed: boolean;
  readonly author: EmployeeDetailed;
  readonly auditor: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  value: number;
  /** @format date-time */
  verdict_date?: string | null;
  readonly vehicle: number;
  readonly service_center: number | null;
}

export interface VehicleSummary {
  /** Runtime summary */
  runtime_sum?: number;
  r_info_count?: number;
  r_warning_count?: number;
  r_critical_count?: number;
  r_complete_count?: number;
  r_incomplete_count?: number;
  t_active_count?: number;
  t_total_count?: number;
}

/**
 * * `no` - no
 * * `posted` - posted
 * * `rejected` - rejected
 */
export enum VerdictEnum {
  No = "no",
  Posted = "posted",
  Rejected = "rejected",
}

export interface WorkEmployee {
  readonly id: number;
  /**
   * * `client` - client
   * * `engineer` - engineer
   * * `coordinator` - coordinator
   */
  role: RoleEnum;
  readonly profile: Profile;
  readonly tasks: WorkTaskShort[];
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

export interface WorkOrganization {
  readonly id: number;
  readonly is_service_center: boolean;
  requisites: OrganizationRequisites;
  contact: Profile;
  /** @format uri */
  photo?: string | null;
  readonly tasks: WorkTaskShort[];
  readonly summaries: TotalVehicleSummaryPair[];
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** Active */
  is_active?: boolean;
}

export interface WorkServiceCenter {
  readonly id: number;
  readonly is_service_center: boolean;
  requisites: OrganizationRequisites;
  contact: Profile;
  /** @format uri */
  photo?: string | null;
  readonly summaries: TotalVehicleSummaryPair[];
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 127 */
  name: string;
  /** Active */
  is_active?: boolean;
}

export interface WorkServiceCenterSearch {
  readonly service_centers: WorkServiceCenter[];
  region?: Region;
}

export interface WorkTaskApproval {
  readonly id: number;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /** @maxLength 510 */
  customer_description?: string;
  /** @maxLength 510 */
  coordinator_description?: string;
  /** @maxLength 510 */
  executor_note?: string;
  /** @maxLength 510 */
  description?: string;
  /** @format date-time */
  customer_approve_date?: string | null;
  /** @format date-time */
  coordinator_approve_date?: string | null;
  /** @format date-time */
  executor_approve_date?: string | null;
  /** @format date-time */
  want_start_date?: string | null;
  /** @format date-time */
  plan_start_date?: string | null;
  /** @format date-time */
  fact_start_date?: string | null;
  /** @format date-time */
  want_complete_date?: string | null;
  /** @format date-time */
  plan_complete_date?: string | null;
  /** @format date-time */
  fact_complete_date?: string | null;
  /** @format date-time */
  reject_date?: string | null;
  /** @maxLength 510 */
  reject_text?: string;
  readonly reject_initiator: number | null;
}

export interface WorkTaskCheck {
  readonly id: number;
  control_point: ControlPoint;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  readonly customer_mark: boolean;
  readonly coordinator_mark: boolean;
  readonly executor_mark: boolean;
  /** @maxLength 510 */
  text?: string;
}

export interface WorkTaskDetailed {
  readonly id: number;
  /**
   * * `draft` - draft
   * * `posted` - posted
   * * `reject` - reject
   * * `delete` - delete
   */
  mark: MarkEnum;
  /**
   * * `search` - search
   * * `approval` - approval
   * * `wait` - wait
   * * `pause` - pause
   * * `work` - work
   * * `done` - done
   */
  status: StatusEnum;
  readonly service_center: OrganizationPublic;
  readonly organization: OrganizationPublic;
  readonly vehicle: Vehicle;
  readonly approval: WorkTaskApproval;
  readonly checklist: WorkTaskCheck[];
  readonly customer: EmployeeDetailed;
  readonly coordinator: EmployeeDetailed;
  readonly executor: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  number: number;
  /** @maxLength 120 */
  title?: string;
  /** @format date-time */
  status_date?: string | null;
  /** @format date-time */
  mark_date?: string | null;
  /** Mark */
  mark_enum?: MarkEnumEnum;
  /** Parent task */
  parent?: number | null;
}

export interface WorkTaskShort {
  readonly id: number;
  /**
   * * `draft` - draft
   * * `posted` - posted
   * * `reject` - reject
   * * `delete` - delete
   */
  mark: MarkEnum;
  /**
   * * `search` - search
   * * `approval` - approval
   * * `wait` - wait
   * * `pause` - pause
   * * `work` - work
   * * `done` - done
   */
  status: StatusEnum;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  number: number;
  /** @maxLength 120 */
  title?: string;
  /** @format date-time */
  status_date?: string | null;
  /** @format date-time */
  mark_date?: string | null;
  /** Mark */
  mark_enum?: MarkEnumEnum;
  organization: number;
  customer?: number | null;
  coordinator?: number | null;
  readonly executor: number | null;
}

export interface WorkTaskShortWithExecutor {
  readonly id: number;
  /**
   * * `draft` - draft
   * * `posted` - posted
   * * `reject` - reject
   * * `delete` - delete
   */
  mark: MarkEnum;
  /**
   * * `search` - search
   * * `approval` - approval
   * * `wait` - wait
   * * `pause` - pause
   * * `work` - work
   * * `done` - done
   */
  status: StatusEnum;
  readonly executor: EmployeeDetailed;
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  number: number;
  /** @maxLength 120 */
  title?: string;
  /** @format date-time */
  status_date?: string | null;
  /** @format date-time */
  mark_date?: string | null;
  /** Mark */
  mark_enum?: MarkEnumEnum;
  organization: number;
  customer?: number | null;
  coordinator?: number | null;
}

export interface WorkTaskStatusChangeDetailed {
  /** @format uuid */
  readonly uuid: string;
  readonly initiator: EmployeeDetailed;
  /** @format date-time */
  real_date?: string | null;
  /** @maxLength 510 */
  text?: string;
  /** @format double */
  longitude?: number;
  /** @format double */
  latitude?: number;
  /** Approved */
  readonly is_approved: boolean;
}

export interface WorkVehicle {
  readonly id: number;
  readonly is_hidden: boolean;
  readonly summary: VehicleSummary;
  readonly model: VehicleModelDetailed;
  readonly name: string;
  readonly gost_number: string;
  readonly tasks: WorkTaskShortWithExecutor[];
  /** @format date-time */
  readonly created_at: string;
  /** @format date-time */
  readonly updated_at: string;
  /**
   * Serial number
   * @maxLength 254
   */
  sn?: string;
  /** @maxLength 510 */
  info?: string;
  manufacture_date?: number | null;
  /** @maxLength 15 */
  gos_number?: string;
  /** @format double */
  order?: number;
  /** @format date-time */
  hide_date?: string | null;
  readonly organization: number;
}

export type AccountActionsActivationCreateData = UserActivation;

export type AccountActionsRegistrationCreateData = AccountRegistration;

export type AccountActionsResendActivationCreateData = UserResendActivation;

export type AccountActionsResetPasswordCreateData = UserResetPassword;

export type AccountActionsResetPasswordConfirmCreateData = UserResetPasswordConfirm;

export interface AccountDeviceListParams {
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
}

export type AccountDeviceListData = PaginatedDeviceList;

export type AccountDeviceCreateData = Device;

export type AccountDeviceRetrieveData = Device;

export type AccountDeviceDestroyData = any;

export type AccountJwtBlacklistCreateData = TokenBlacklist;

export type AccountJwtBlacklistCookieCreateData = any;

export type AccountJwtCreateCreateData = TokenObtainPairSerializerV2;

export type AccountJwtCreateCookieCreateData = TokenObtainPairSerializerV2;

export type AccountJwtRefreshCreateData = TokenRefresh;

export type AccountJwtRefreshCookieCreateData = CookieTokenRefresh;

export type AccountJwtVerifyCreateData = TokenVerify;

export type AccountMeRetrieveData = UserPersonal;

export type AccountMePartialUpdateData = UserPersonal;

export type AccountMeAccountRegistrationRetryCreateData = AccountRegistrationRetry;

export type AccountMeDeleteAccountCreateData = UserDeleteAccount;

export type AccountMeDeleteAccountConfirmCreateData = UserDeleteAccountConfirm;

export interface AccountNotificationListParams {
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
  title?: string;
  user?: number;
}

export type AccountNotificationListData = PaginatedNotificationList;

export type AccountNotificationRetrieveData = Notification;

export type OrgMyRetrieveData = MyUserAll;

export type OrgMyEmploymentsRetrieveData = MyUserEmployment;

export type OrgMyInvitesRetrieveData = MyUserInvite;

export interface OrgOrgsListParams {
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
}

export type OrgOrgsListData = PaginatedOrganizationList;

export interface OrgOrgsInvitesListParams {
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
}

export type OrgOrgsInvitesListData = PaginatedOrganizationInviteList;

export type OrgOrgsInvitesCreateData = OrganizationInviteDetailed;

export type OrgOrgsInvitesRetrieveData = OrganizationInviteDetailed;

export type OrgOrgsInvitesDestroyData = any;

export type OrgOrgsInvitesInnCreateData = OrganizationInn;

export type OrgOrgsContactPartialUpdateData = Profile;

export interface OrgOrgsEmployeesListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type OrgOrgsEmployeesListData = PaginatedEmployeeList;

export type OrgOrgsEmployeesCreateData = Employee;

export type OrgOrgsEmployeesRetrieveData = EmployeeDetailed;

export type OrgOrgsEmployeesPartialUpdateData = Employee;

export type OrgOrgsEmployeesDestroyData = any;

export type OrgOrgsMyProfileRetrieveData = Profile;

export type OrgOrgsMyProfilePartialUpdateData = Profile;

export interface OrgOrgsPointsListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type OrgOrgsPointsListData = PaginatedControlPointList;

export type OrgOrgsPointsCreateData = ControlPoint;

export type OrgOrgsPointsRetrieveData = ControlPoint;

export type OrgOrgsPointsPartialUpdateData = ControlPoint;

export type OrgOrgsPointsDestroyData = any;

export type OrgOrgsRequisitesPartialUpdateData = OrganizationRequisites;

export type OrgOrgsServiceCenterPartialUpdateData = ServiceCenter;

export type OrgOrgsSettingsPartialUpdateData = OrganizationSettings;

export interface OrgOrgsUserInvitesListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type OrgOrgsUserInvitesListData = PaginatedUserInviteList;

export type OrgOrgsUserInvitesCreateData = UserInviteDetailed;

export type OrgOrgsUserInvitesRetrieveData = UserInviteDetailed;

export type OrgOrgsUserInvitesDestroyData = any;

export type OrgOrgsUserInvitesAcceptCreateData = UserAcceptInvite;

export type OrgOrgsRetrieveData = OrganizationDetailed;

export interface VehicleOrgsBrandsListParams {
  equipment?: string;
  equipment_name?: string;
  /** Number of results to return per page. */
  limit?: number;
  name?: string;
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type VehicleOrgsBrandsListData = PaginatedVehicleBrandList;

export type VehicleOrgsBrandsCreateData = VehicleBrand;

export type VehicleOrgsBrandsRetrieveData = VehicleBrand;

export type VehicleOrgsBrandsPartialUpdateData = VehicleBrand;

export type VehicleOrgsBrandsDestroyData = any;

export interface VehicleOrgsEquipmentListParams {
  brand?: number;
  brand_name?: string;
  /** Number of results to return per page. */
  limit?: number;
  name?: string;
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type VehicleOrgsEquipmentListData = PaginatedVehicleEquipmentList;

export interface VehicleOrgsModelsListParams {
  brand?: number;
  /** Number of results to return per page. */
  limit?: number;
  name?: string;
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type VehicleOrgsModelsListData = PaginatedVehicleModelDetailedList;

export type VehicleOrgsModelsCreateData = VehicleModel;

export type VehicleOrgsModelsRetrieveData = VehicleModelDetailed;

export type VehicleOrgsModelsPartialUpdateData = VehicleModelDetailed;

export type VehicleOrgsModelsDestroyData = any;

export interface VehicleOrgsVehiclesListParams {
  gos_number?: string;
  /** Number of results to return per page. */
  limit?: number;
  name?: string;
  /**
   * Ordering
   *
   * * `created_at` - Created at
   * * `-created_at` - Created at (descending)
   * * `updated_at` - Updated at
   * * `-updated_at` - Updated at (descending)
   * * `order` - Order
   * * `-order` - Order (descending)
   */
  o?: ("-created_at" | "-order" | "-updated_at" | "created_at" | "order" | "updated_at")[];
  /** The initial index from which to return the results. */
  offset?: number;
  sn?: string;
  /** @pattern ^\d+$ */
  orgId: string;
}

export type VehicleOrgsVehiclesListData = PaginatedVehicleList;

export type VehicleOrgsVehiclesCreateData = VehicleEdit;

export type VehicleOrgsVehiclesRetrieveData = VehicleDetailed;

export type VehicleOrgsVehiclesPartialUpdateData = VehicleEdit;

export type VehicleOrgsVehiclesDestroyData = any;

export interface VehicleOrgsVehiclesDocsListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleOrgsVehiclesDocsListData = PaginatedVehicleDocumentationDetailedList;

export type VehicleOrgsVehiclesDocsCreateData = VehicleDocumentationDetailed;

export type VehicleOrgsVehiclesDocsRetrieveData = VehicleDocumentationDetailed;

export type VehicleOrgsVehiclesDocsDestroyData = any;

export interface VehicleOrgsVehiclesPhotosListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleOrgsVehiclesPhotosListData = PaginatedVehiclePhotoDetailedList;

export type VehicleOrgsVehiclesPhotosCreateData = VehiclePhotoDetailed;

export type VehicleOrgsVehiclesPhotosRetrieveData = VehiclePhotoDetailed;

export type VehicleOrgsVehiclesPhotosPartialUpdateData = VehiclePhotoUpdate;

export type VehicleOrgsVehiclesPhotosDestroyData = any;

export interface VehicleOrgsVehiclesRecsListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleOrgsVehiclesRecsListData = PaginatedVehicleRecommendationDetailedList;

export type VehicleOrgsVehiclesRecsRetrieveData = VehicleRecommendationDetailed;

export interface VehicleOrgsVehiclesRuntimeListParams {
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
  service_center?: number;
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleOrgsVehiclesRuntimeListData = PaginatedVehicleRuntimeList;

export type VehicleOrgsVehiclesRuntimeRetrieveData = VehicleRuntime;

export interface VehicleSersVehiclesListParams {
  gos_number?: string;
  /** Number of results to return per page. */
  limit?: number;
  name?: string;
  /**
   * Ordering
   *
   * * `created_at` - Created at
   * * `-created_at` - Created at (descending)
   * * `updated_at` - Updated at
   * * `-updated_at` - Updated at (descending)
   * * `order` - Order
   * * `-order` - Order (descending)
   */
  o?: ("-created_at" | "-order" | "-updated_at" | "created_at" | "order" | "updated_at")[];
  /** The initial index from which to return the results. */
  offset?: number;
  sn?: string;
  /** @pattern ^\d+$ */
  orgId: string;
}

export type VehicleSersVehiclesListData = PaginatedVehicleList;

export type VehicleSersVehiclesRetrieveData = VehicleDetailed;

export interface VehicleSersVehiclesDocsListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleSersVehiclesDocsListData = PaginatedVehicleDocumentationDetailedList;

export type VehicleSersVehiclesDocsCreateData = VehicleDocumentationDetailed;

export type VehicleSersVehiclesDocsRetrieveData = VehicleDocumentationDetailed;

export type VehicleSersVehiclesDocsDestroyData = any;

export interface VehicleSersVehiclesNotesListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleSersVehiclesNotesListData = PaginatedVehicleNoteList;

export type VehicleSersVehiclesNotesCreateData = VehicleNote;

export type VehicleSersVehiclesNotesRetrieveData = VehicleNote;

export type VehicleSersVehiclesNotesPartialUpdateData = VehicleNote;

export type VehicleSersVehiclesNotesDestroyData = any;

export interface VehicleSersVehiclesPhotosListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleSersVehiclesPhotosListData = PaginatedVehiclePhotoDetailedList;

export type VehicleSersVehiclesPhotosCreateData = VehiclePhotoDetailed;

export type VehicleSersVehiclesPhotosRetrieveData = VehiclePhotoDetailed;

export type VehicleSersVehiclesPhotosPartialUpdateData = VehiclePhotoUpdate;

export type VehicleSersVehiclesPhotosDestroyData = any;

export interface VehicleSersVehiclesRecsListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleSersVehiclesRecsListData = PaginatedVehicleRecommendationDetailedList;

export type VehicleSersVehiclesRecsCreateData = VehicleRecommendationDetailed;

export type VehicleSersVehiclesRecsRetrieveData = VehicleRecommendationDetailed;

export type VehicleSersVehiclesRecsPartialUpdateData = VehicleRecommendationDetailed;

export type VehicleSersVehiclesRecsDestroyData = any;

export interface VehicleSersVehiclesRuntimeListParams {
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
  service_center?: number;
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  vehicleId: string;
}

export type VehicleSersVehiclesRuntimeListData = PaginatedVehicleRuntimeList;

export type VehicleSersVehiclesRuntimeCreateData = VehicleRuntime;

export type VehicleSersVehiclesRuntimeRetrieveData = VehicleRuntime;

export type VehicleSersVehiclesRuntimePartialUpdateData = VehicleRuntime;

export type VehicleSersVehiclesRuntimeDestroyData = any;

export interface WorkOrgsSersListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type WorkOrgsSersListData = PaginatedWorkServiceCenterList;

export type WorkOrgsSersRetrieveData = WorkServiceCenter;

export type WorkOrgsSersSearchCreateData = WorkServiceCenterSearch;

export interface WorkOrgsTaskListParams {
  /** Number of results to return per page. */
  limit?: number;
  number?: number;
  /**
   * Ordering
   *
   * * `created_at` - Created at
   * * `-created_at` - Created at (descending)
   * * `updated_at` - Updated at
   * * `-updated_at` - Updated at (descending)
   * * `status_date` - Status date
   * * `-status_date` - Status date (descending)
   */
  o?: ("-created_at" | "-status_date" | "-updated_at" | "created_at" | "status_date" | "updated_at")[];
  /** The initial index from which to return the results. */
  offset?: number;
  title?: string;
  /** @pattern ^\d+$ */
  orgId: string;
}

export type WorkOrgsTaskListData = PaginatedOrgWorkTaskList;

export type WorkOrgsTaskCreateData = OrgWorkTask;

export type WorkOrgsTaskRetrieveData = WorkTaskDetailed;

export type WorkOrgsTaskPartialUpdateData = OrgWorkTask;

export type WorkOrgsTaskDestroyData = any;

export interface WorkOrgsTasksTaskListParams {
  /** Number of results to return per page. */
  limit?: number;
  /**
   * Ordering
   *
   * * `created_at` - Created at
   * * `-created_at` - Created at (descending)
   * * `updated_at` - Updated at
   * * `-updated_at` - Updated at (descending)
   * * `verdict_date` - Verdict date
   * * `-verdict_date` - Verdict date (descending)
   */
  o?: ("-created_at" | "-updated_at" | "-verdict_date" | "created_at" | "updated_at" | "verdict_date")[];
  /** The initial index from which to return the results. */
  offset?: number;
  text?: string;
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  taskId: string;
}

export type WorkOrgsTasksTaskListData = PaginatedWorkTaskStatusChangeDetailedList;

export type WorkOrgsTasksTaskCreateData = WorkTaskStatusChangeDetailed;

export type WorkOrgsTasksTaskRetrieveData = WorkTaskStatusChangeDetailed;

export type WorkOrgsTasksTaskPartialUpdateData = WorkTaskStatusChangeDetailed;

export type WorkOrgsTasksTaskDestroyData = any;

export interface WorkSersEmployeesListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type WorkSersEmployeesListData = PaginatedWorkEmployeeList;

export type WorkSersEmployeesRetrieveData = WorkEmployee;

export interface WorkSersOrgsListParams {
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
  /** @pattern ^\d+$ */
  orgId: string;
}

export type WorkSersOrgsListData = PaginatedWorkOrganizationList;

export type WorkSersOrgsRetrieveData = WorkOrganization;

export interface WorkSersTaskListParams {
  /** Number of results to return per page. */
  limit?: number;
  number?: number;
  /**
   * Ordering
   *
   * * `created_at` - Created at
   * * `-created_at` - Created at (descending)
   * * `updated_at` - Updated at
   * * `-updated_at` - Updated at (descending)
   * * `status_date` - Status date
   * * `-status_date` - Status date (descending)
   */
  o?: ("-created_at" | "-status_date" | "-updated_at" | "created_at" | "status_date" | "updated_at")[];
  /** The initial index from which to return the results. */
  offset?: number;
  title?: string;
  /** @pattern ^\d+$ */
  orgId: string;
}

export type WorkSersTaskListData = PaginatedSerWorkTaskList;

export type WorkSersTaskRetrieveData = WorkTaskDetailed;

export type WorkSersTaskVerboseRetrieveData = SerWorkTaskVerbose;

export interface WorkSersTasksTaskListParams {
  /** Number of results to return per page. */
  limit?: number;
  /**
   * Ordering
   *
   * * `created_at` - Created at
   * * `-created_at` - Created at (descending)
   * * `updated_at` - Updated at
   * * `-updated_at` - Updated at (descending)
   * * `verdict_date` - Verdict date
   * * `-verdict_date` - Verdict date (descending)
   */
  o?: ("-created_at" | "-updated_at" | "-verdict_date" | "created_at" | "updated_at" | "verdict_date")[];
  /** The initial index from which to return the results. */
  offset?: number;
  text?: string;
  /** @pattern ^\d+$ */
  orgId: string;
  /** @pattern ^\d+$ */
  taskId: string;
}

export type WorkSersTasksTaskListData = PaginatedWorkTaskStatusChangeDetailedList;

export type WorkSersTasksTaskCreateData = WorkTaskStatusChangeDetailed;

export type WorkSersTasksTaskRetrieveData = WorkTaskStatusChangeDetailed;

export type WorkSersTasksTaskPartialUpdateData = WorkTaskStatusChangeDetailed;

export type WorkSersTasksTaskDestroyData = any;

export interface WorkSersVehiclesListParams {
  gos_number?: string;
  /** Number of results to return per page. */
  limit?: number;
  name?: string;
  /**
   * Ordering
   *
   * * `created_at` - Created at
   * * `-created_at` - Created at (descending)
   * * `updated_at` - Updated at
   * * `-updated_at` - Updated at (descending)
   * * `order` - Order
   * * `-order` - Order (descending)
   */
  o?: ("-created_at" | "-order" | "-updated_at" | "created_at" | "order" | "updated_at")[];
  /** The initial index from which to return the results. */
  offset?: number;
  sn?: string;
  /** @pattern ^\d+$ */
  orgId: string;
}

export type WorkSersVehiclesListData = PaginatedWorkVehicleList;

export type WorkSersVehiclesRetrieveData = WorkVehicle;

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
      this.request<AccountActionsActivationCreateData, any>({
        path: `/api/v1/account/actions/activation/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<AccountActionsRegistrationCreateData, any>({
        path: `/api/v1/account/actions/registration/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<AccountActionsResendActivationCreateData, any>({
        path: `/api/v1/account/actions/resend-activation/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<AccountActionsResetPasswordCreateData, any>({
        path: `/api/v1/account/actions/reset-password/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<AccountActionsResetPasswordConfirmCreateData, any>({
        path: `/api/v1/account/actions/reset-password-confirm/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
    accountDeviceList: (query: AccountDeviceListParams, params: RequestParams = {}) =>
      this.request<AccountDeviceListData, any>({
        path: `/api/v1/account/device/`,
        method: "GET",
        query: query,
        secure: true,
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
      this.request<AccountDeviceCreateData, any>({
        path: `/api/v1/account/device/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<AccountDeviceRetrieveData, any>({
        path: `/api/v1/account/device/${id}/`,
        method: "GET",
        secure: true,
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
      this.request<AccountDeviceDestroyData, any>({
        path: `/api/v1/account/device/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Takes a token and blacklists it. Must be used with the `rest_framework_simplejwt.token_blacklist` app installed.
     *
     * @tags account
     * @name AccountJwtBlacklistCreate
     * @request POST:/api/v1/account/jwt/blacklist/
     */
    accountJwtBlacklistCreate: (data: TokenBlacklist, params: RequestParams = {}) =>
      this.request<AccountJwtBlacklistCreateData, any>({
        path: `/api/v1/account/jwt/blacklist/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Takes a token and blacklists it. Must be used with the `rest_framework_simplejwt.token_blacklist` app installed.
     *
     * @tags account
     * @name AccountJwtBlacklistCookieCreate
     * @request POST:/api/v1/account/jwt/blacklist-cookie/
     */
    accountJwtBlacklistCookieCreate: (params: RequestParams = {}) =>
      this.request<AccountJwtBlacklistCookieCreateData, any>({
        path: `/api/v1/account/jwt/blacklist-cookie/`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
     *
     * @tags account
     * @name AccountJwtCreateCreate
     * @request POST:/api/v1/account/jwt/create/
     */
    accountJwtCreateCreate: (data: TokenObtainPairSerializerV2, params: RequestParams = {}) =>
      this.request<AccountJwtCreateCreateData, any>({
        path: `/api/v1/account/jwt/create/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
     *
     * @tags account
     * @name AccountJwtCreateCookieCreate
     * @request POST:/api/v1/account/jwt/create-cookie/
     */
    accountJwtCreateCookieCreate: (data: TokenObtainPairSerializerV2, params: RequestParams = {}) =>
      this.request<AccountJwtCreateCookieCreateData, any>({
        path: `/api/v1/account/jwt/create-cookie/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
      this.request<AccountJwtRefreshCreateData, any>({
        path: `/api/v1/account/jwt/refresh/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags account
     * @name AccountJwtRefreshCookieCreate
     * @request POST:/api/v1/account/jwt/refresh-cookie/
     */
    accountJwtRefreshCookieCreate: (data: CookieTokenRefresh, params: RequestParams = {}) =>
      this.request<AccountJwtRefreshCookieCreateData, any>({
        path: `/api/v1/account/jwt/refresh-cookie/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
      this.request<AccountJwtVerifyCreateData, any>({
        path: `/api/v1/account/jwt/verify/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
      this.request<AccountMeRetrieveData, any>({
        path: `/api/v1/account/me/`,
        method: "GET",
        secure: true,
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
      this.request<AccountMePartialUpdateData, any>({
        path: `/api/v1/account/me/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountMeAccountRegistrationRetryCreate
     * @request POST:/api/v1/account/me/account-registration-retry/
     * @secure
     */
    accountMeAccountRegistrationRetryCreate: (data: AccountRegistrationRetry, params: RequestParams = {}) =>
      this.request<AccountMeAccountRegistrationRetryCreateData, any>({
        path: `/api/v1/account/me/account-registration-retry/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<AccountMeDeleteAccountCreateData, any>({
        path: `/api/v1/account/me/delete-account/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<AccountMeDeleteAccountConfirmCreateData, any>({
        path: `/api/v1/account/me/delete-account-confirm/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
    accountNotificationList: (query: AccountNotificationListParams, params: RequestParams = {}) =>
      this.request<AccountNotificationListData, any>({
        path: `/api/v1/account/notification/`,
        method: "GET",
        query: query,
        secure: true,
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
      this.request<AccountNotificationRetrieveData, any>({
        path: `/api/v1/account/notification/${id}/`,
        method: "GET",
        secure: true,
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
      this.request<OrgMyRetrieveData, any>({
        path: `/api/v1/org/my/`,
        method: "GET",
        secure: true,
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
      this.request<OrgMyEmploymentsRetrieveData, any>({
        path: `/api/v1/org/my-employments/`,
        method: "GET",
        secure: true,
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
      this.request<OrgMyInvitesRetrieveData, any>({
        path: `/api/v1/org/my-invites/`,
        method: "GET",
        secure: true,
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
    orgOrgsList: (query: OrgOrgsListParams, params: RequestParams = {}) =>
      this.request<OrgOrgsListData, any>({
        path: `/api/v1/org/orgs/`,
        method: "GET",
        query: query,
        secure: true,
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
    orgOrgsInvitesList: (query: OrgOrgsInvitesListParams, params: RequestParams = {}) =>
      this.request<OrgOrgsInvitesListData, any>({
        path: `/api/v1/org/orgs-invites/`,
        method: "GET",
        query: query,
        secure: true,
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
      this.request<OrgOrgsInvitesCreateData, any>({
        path: `/api/v1/org/orgs-invites/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<OrgOrgsInvitesRetrieveData, any>({
        path: `/api/v1/org/orgs-invites/${id}/`,
        method: "GET",
        secure: true,
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
      this.request<OrgOrgsInvitesDestroyData, any>({
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
      this.request<OrgOrgsInvitesInnCreateData, any>({
        path: `/api/v1/org/orgs-invites/inn/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsContactPartialUpdate
     * @request PATCH:/api/v1/org/orgs/{org_id}/contact/
     * @secure
     */
    orgOrgsContactPartialUpdate: (orgId: string, data: PatchedProfile, params: RequestParams = {}) =>
      this.request<OrgOrgsContactPartialUpdateData, any>({
        path: `/api/v1/org/orgs/${orgId}/contact/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
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
    orgOrgsEmployeesList: ({ orgId, ...query }: OrgOrgsEmployeesListParams, params: RequestParams = {}) =>
      this.request<OrgOrgsEmployeesListData, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/`,
        method: "GET",
        query: query,
        secure: true,
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
      this.request<OrgOrgsEmployeesCreateData, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<OrgOrgsEmployeesRetrieveData, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/${id}/`,
        method: "GET",
        secure: true,
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
      this.request<OrgOrgsEmployeesPartialUpdateData, any>({
        path: `/api/v1/org/orgs/${orgId}/employees/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<OrgOrgsEmployeesDestroyData, any>({
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
      this.request<OrgOrgsMyProfileRetrieveData, any>({
        path: `/api/v1/org/orgs/${orgId}/my-profile/`,
        method: "GET",
        secure: true,
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
      this.request<OrgOrgsMyProfilePartialUpdateData, any>({
        path: `/api/v1/org/orgs/${orgId}/my-profile/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
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
    orgOrgsPointsList: ({ orgId, ...query }: OrgOrgsPointsListParams, params: RequestParams = {}) =>
      this.request<OrgOrgsPointsListData, any>({
        path: `/api/v1/org/orgs/${orgId}/points/`,
        method: "GET",
        query: query,
        secure: true,
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
      this.request<OrgOrgsPointsCreateData, any>({
        path: `/api/v1/org/orgs/${orgId}/points/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<OrgOrgsPointsRetrieveData, any>({
        path: `/api/v1/org/orgs/${orgId}/points/${id}/`,
        method: "GET",
        secure: true,
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
      this.request<OrgOrgsPointsPartialUpdateData, any>({
        path: `/api/v1/org/orgs/${orgId}/points/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<OrgOrgsPointsDestroyData, any>({
        path: `/api/v1/org/orgs/${orgId}/points/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsRequisitesPartialUpdate
     * @request PATCH:/api/v1/org/orgs/{org_id}/requisites/
     * @secure
     */
    orgOrgsRequisitesPartialUpdate: (orgId: string, data: PatchedOrganizationRequisites, params: RequestParams = {}) =>
      this.request<OrgOrgsRequisitesPartialUpdateData, any>({
        path: `/api/v1/org/orgs/${orgId}/requisites/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsServiceCenterPartialUpdate
     * @request PATCH:/api/v1/org/orgs/{org_id}/service-center/
     * @secure
     */
    orgOrgsServiceCenterPartialUpdate: (orgId: string, data: PatchedServiceCenter, params: RequestParams = {}) =>
      this.request<OrgOrgsServiceCenterPartialUpdateData, any>({
        path: `/api/v1/org/orgs/${orgId}/service-center/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags org
     * @name OrgOrgsSettingsPartialUpdate
     * @request PATCH:/api/v1/org/orgs/{org_id}/settings/
     * @secure
     */
    orgOrgsSettingsPartialUpdate: (orgId: string, data: PatchedOrganizationSettings, params: RequestParams = {}) =>
      this.request<OrgOrgsSettingsPartialUpdateData, any>({
        path: `/api/v1/org/orgs/${orgId}/settings/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
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
    orgOrgsUserInvitesList: ({ orgId, ...query }: OrgOrgsUserInvitesListParams, params: RequestParams = {}) =>
      this.request<OrgOrgsUserInvitesListData, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/`,
        method: "GET",
        query: query,
        secure: true,
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
      this.request<OrgOrgsUserInvitesCreateData, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<OrgOrgsUserInvitesRetrieveData, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/${id}/`,
        method: "GET",
        secure: true,
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
      this.request<OrgOrgsUserInvitesDestroyData, any>({
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
      this.request<OrgOrgsUserInvitesAcceptCreateData, any>({
        path: `/api/v1/org/orgs/${orgId}/user-invites/${id}/accept/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<OrgOrgsRetrieveData, any>({
        path: `/api/v1/org/orgs/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsBrandsList
     * @request GET:/api/v1/vehicle/orgs/{org_id}/brands/
     * @secure
     */
    vehicleOrgsBrandsList: ({ orgId, ...query }: VehicleOrgsBrandsListParams, params: RequestParams = {}) =>
      this.request<VehicleOrgsBrandsListData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/brands/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsBrandsCreate
     * @request POST:/api/v1/vehicle/orgs/{org_id}/brands/
     * @secure
     */
    vehicleOrgsBrandsCreate: (orgId: string, data: VehicleBrand, params: RequestParams = {}) =>
      this.request<VehicleOrgsBrandsCreateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/brands/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsBrandsRetrieve
     * @request GET:/api/v1/vehicle/orgs/{org_id}/brands/{id}/
     * @secure
     */
    vehicleOrgsBrandsRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsBrandsRetrieveData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/brands/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsBrandsPartialUpdate
     * @request PATCH:/api/v1/vehicle/orgs/{org_id}/brands/{id}/
     * @secure
     */
    vehicleOrgsBrandsPartialUpdate: (
      id: number,
      orgId: string,
      data: PatchedVehicleBrand,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsBrandsPartialUpdateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/brands/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsBrandsDestroy
     * @request DELETE:/api/v1/vehicle/orgs/{org_id}/brands/{id}/
     * @secure
     */
    vehicleOrgsBrandsDestroy: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsBrandsDestroyData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/brands/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsEquipmentList
     * @request GET:/api/v1/vehicle/orgs/{org_id}/equipment/
     * @secure
     */
    vehicleOrgsEquipmentList: ({ orgId, ...query }: VehicleOrgsEquipmentListParams, params: RequestParams = {}) =>
      this.request<VehicleOrgsEquipmentListData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/equipment/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsModelsList
     * @request GET:/api/v1/vehicle/orgs/{org_id}/models/
     * @secure
     */
    vehicleOrgsModelsList: ({ orgId, ...query }: VehicleOrgsModelsListParams, params: RequestParams = {}) =>
      this.request<VehicleOrgsModelsListData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/models/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsModelsCreate
     * @request POST:/api/v1/vehicle/orgs/{org_id}/models/
     * @secure
     */
    vehicleOrgsModelsCreate: (orgId: string, data: VehicleModel, params: RequestParams = {}) =>
      this.request<VehicleOrgsModelsCreateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/models/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsModelsRetrieve
     * @request GET:/api/v1/vehicle/orgs/{org_id}/models/{id}/
     * @secure
     */
    vehicleOrgsModelsRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsModelsRetrieveData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/models/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsModelsPartialUpdate
     * @request PATCH:/api/v1/vehicle/orgs/{org_id}/models/{id}/
     * @secure
     */
    vehicleOrgsModelsPartialUpdate: (
      id: number,
      orgId: string,
      data: PatchedVehicleModelDetailed,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsModelsPartialUpdateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/models/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsModelsDestroy
     * @request DELETE:/api/v1/vehicle/orgs/{org_id}/models/{id}/
     * @secure
     */
    vehicleOrgsModelsDestroy: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsModelsDestroyData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/models/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesList
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/
     * @secure
     */
    vehicleOrgsVehiclesList: ({ orgId, ...query }: VehicleOrgsVehiclesListParams, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesListData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesCreate
     * @request POST:/api/v1/vehicle/orgs/{org_id}/vehicles/
     * @secure
     */
    vehicleOrgsVehiclesCreate: (orgId: string, data: VehicleEdit, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesCreateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesRetrieve
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{id}/
     * @secure
     */
    vehicleOrgsVehiclesRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesRetrieveData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesPartialUpdate
     * @request PATCH:/api/v1/vehicle/orgs/{org_id}/vehicles/{id}/
     * @secure
     */
    vehicleOrgsVehiclesPartialUpdate: (
      id: number,
      orgId: string,
      data: PatchedVehicleEdit,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsVehiclesPartialUpdateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesDestroy
     * @request DELETE:/api/v1/vehicle/orgs/{org_id}/vehicles/{id}/
     * @secure
     */
    vehicleOrgsVehiclesDestroy: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesDestroyData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesDocsList
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/docs/
     * @secure
     */
    vehicleOrgsVehiclesDocsList: (
      { orgId, vehicleId, ...query }: VehicleOrgsVehiclesDocsListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsVehiclesDocsListData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/docs/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesDocsCreate
     * @request POST:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/docs/
     * @secure
     */
    vehicleOrgsVehiclesDocsCreate: (
      orgId: string,
      vehicleId: string,
      data: VehicleDocumentationDetailed,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsVehiclesDocsCreateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/docs/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesDocsRetrieve
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/docs/{id}/
     * @secure
     */
    vehicleOrgsVehiclesDocsRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesDocsRetrieveData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/docs/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesDocsDestroy
     * @request DELETE:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/docs/{id}/
     * @secure
     */
    vehicleOrgsVehiclesDocsDestroy: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesDocsDestroyData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/docs/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesPhotosList
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/photos/
     * @secure
     */
    vehicleOrgsVehiclesPhotosList: (
      { orgId, vehicleId, ...query }: VehicleOrgsVehiclesPhotosListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsVehiclesPhotosListData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/photos/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesPhotosCreate
     * @request POST:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/photos/
     * @secure
     */
    vehicleOrgsVehiclesPhotosCreate: (
      orgId: string,
      vehicleId: string,
      data: VehiclePhotoDetailed,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsVehiclesPhotosCreateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/photos/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesPhotosRetrieve
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/photos/{id}/
     * @secure
     */
    vehicleOrgsVehiclesPhotosRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesPhotosRetrieveData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/photos/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesPhotosPartialUpdate
     * @request PATCH:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/photos/{id}/
     * @secure
     */
    vehicleOrgsVehiclesPhotosPartialUpdate: (
      id: number,
      orgId: string,
      vehicleId: string,
      data: PatchedVehiclePhotoUpdate,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsVehiclesPhotosPartialUpdateData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/photos/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesPhotosDestroy
     * @request DELETE:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/photos/{id}/
     * @secure
     */
    vehicleOrgsVehiclesPhotosDestroy: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesPhotosDestroyData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/photos/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesRecsList
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/recs/
     * @secure
     */
    vehicleOrgsVehiclesRecsList: (
      { orgId, vehicleId, ...query }: VehicleOrgsVehiclesRecsListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsVehiclesRecsListData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/recs/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesRecsRetrieve
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/recs/{id}/
     * @secure
     */
    vehicleOrgsVehiclesRecsRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesRecsRetrieveData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/recs/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesRuntimeList
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/runtime/
     * @secure
     */
    vehicleOrgsVehiclesRuntimeList: (
      { orgId, vehicleId, ...query }: VehicleOrgsVehiclesRuntimeListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleOrgsVehiclesRuntimeListData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/runtime/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleOrgsVehiclesRuntimeRetrieve
     * @request GET:/api/v1/vehicle/orgs/{org_id}/vehicles/{vehicle_id}/runtime/{id}/
     * @secure
     */
    vehicleOrgsVehiclesRuntimeRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleOrgsVehiclesRuntimeRetrieveData, any>({
        path: `/api/v1/vehicle/orgs/${orgId}/vehicles/${vehicleId}/runtime/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesList
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/
     * @secure
     */
    vehicleSersVehiclesList: ({ orgId, ...query }: VehicleSersVehiclesListParams, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesListData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRetrieve
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{id}/
     * @secure
     */
    vehicleSersVehiclesRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesRetrieveData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesDocsList
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/docs/
     * @secure
     */
    vehicleSersVehiclesDocsList: (
      { orgId, vehicleId, ...query }: VehicleSersVehiclesDocsListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesDocsListData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/docs/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesDocsCreate
     * @request POST:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/docs/
     * @secure
     */
    vehicleSersVehiclesDocsCreate: (
      orgId: string,
      vehicleId: string,
      data: VehicleDocumentationDetailed,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesDocsCreateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/docs/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesDocsRetrieve
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/docs/{id}/
     * @secure
     */
    vehicleSersVehiclesDocsRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesDocsRetrieveData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/docs/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesDocsDestroy
     * @request DELETE:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/docs/{id}/
     * @secure
     */
    vehicleSersVehiclesDocsDestroy: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesDocsDestroyData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/docs/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesNotesList
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/notes/
     * @secure
     */
    vehicleSersVehiclesNotesList: (
      { orgId, vehicleId, ...query }: VehicleSersVehiclesNotesListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesNotesListData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/notes/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesNotesCreate
     * @request POST:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/notes/
     * @secure
     */
    vehicleSersVehiclesNotesCreate: (orgId: string, vehicleId: string, data: VehicleNote, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesNotesCreateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/notes/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesNotesRetrieve
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/notes/{id}/
     * @secure
     */
    vehicleSersVehiclesNotesRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesNotesRetrieveData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/notes/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesNotesPartialUpdate
     * @request PATCH:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/notes/{id}/
     * @secure
     */
    vehicleSersVehiclesNotesPartialUpdate: (
      id: number,
      orgId: string,
      vehicleId: string,
      data: PatchedVehicleNote,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesNotesPartialUpdateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/notes/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesNotesDestroy
     * @request DELETE:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/notes/{id}/
     * @secure
     */
    vehicleSersVehiclesNotesDestroy: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesNotesDestroyData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/notes/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesPhotosList
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/photos/
     * @secure
     */
    vehicleSersVehiclesPhotosList: (
      { orgId, vehicleId, ...query }: VehicleSersVehiclesPhotosListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesPhotosListData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/photos/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesPhotosCreate
     * @request POST:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/photos/
     * @secure
     */
    vehicleSersVehiclesPhotosCreate: (
      orgId: string,
      vehicleId: string,
      data: VehiclePhotoDetailed,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesPhotosCreateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/photos/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesPhotosRetrieve
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/photos/{id}/
     * @secure
     */
    vehicleSersVehiclesPhotosRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesPhotosRetrieveData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/photos/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesPhotosPartialUpdate
     * @request PATCH:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/photos/{id}/
     * @secure
     */
    vehicleSersVehiclesPhotosPartialUpdate: (
      id: number,
      orgId: string,
      vehicleId: string,
      data: PatchedVehiclePhotoUpdate,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesPhotosPartialUpdateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/photos/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesPhotosDestroy
     * @request DELETE:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/photos/{id}/
     * @secure
     */
    vehicleSersVehiclesPhotosDestroy: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesPhotosDestroyData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/photos/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRecsList
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/recs/
     * @secure
     */
    vehicleSersVehiclesRecsList: (
      { orgId, vehicleId, ...query }: VehicleSersVehiclesRecsListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesRecsListData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/recs/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRecsCreate
     * @request POST:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/recs/
     * @secure
     */
    vehicleSersVehiclesRecsCreate: (
      orgId: string,
      vehicleId: string,
      data: VehicleRecommendationDetailed,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesRecsCreateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/recs/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRecsRetrieve
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/recs/{id}/
     * @secure
     */
    vehicleSersVehiclesRecsRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesRecsRetrieveData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/recs/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRecsPartialUpdate
     * @request PATCH:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/recs/{id}/
     * @secure
     */
    vehicleSersVehiclesRecsPartialUpdate: (
      id: number,
      orgId: string,
      vehicleId: string,
      data: PatchedVehicleRecommendationDetailed,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesRecsPartialUpdateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/recs/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRecsDestroy
     * @request DELETE:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/recs/{id}/
     * @secure
     */
    vehicleSersVehiclesRecsDestroy: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesRecsDestroyData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/recs/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRuntimeList
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/runtime/
     * @secure
     */
    vehicleSersVehiclesRuntimeList: (
      { orgId, vehicleId, ...query }: VehicleSersVehiclesRuntimeListParams,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesRuntimeListData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/runtime/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRuntimeCreate
     * @request POST:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/runtime/
     * @secure
     */
    vehicleSersVehiclesRuntimeCreate: (
      orgId: string,
      vehicleId: string,
      data: VehicleRuntime,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesRuntimeCreateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/runtime/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRuntimeRetrieve
     * @request GET:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/runtime/{id}/
     * @secure
     */
    vehicleSersVehiclesRuntimeRetrieve: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesRuntimeRetrieveData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/runtime/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRuntimePartialUpdate
     * @request PATCH:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/runtime/{id}/
     * @secure
     */
    vehicleSersVehiclesRuntimePartialUpdate: (
      id: number,
      orgId: string,
      vehicleId: string,
      data: PatchedVehicleRuntime,
      params: RequestParams = {},
    ) =>
      this.request<VehicleSersVehiclesRuntimePartialUpdateData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/runtime/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vehicle
     * @name VehicleSersVehiclesRuntimeDestroy
     * @request DELETE:/api/v1/vehicle/sers/{org_id}/vehicles/{vehicle_id}/runtime/{id}/
     * @secure
     */
    vehicleSersVehiclesRuntimeDestroy: (id: number, orgId: string, vehicleId: string, params: RequestParams = {}) =>
      this.request<VehicleSersVehiclesRuntimeDestroyData, any>({
        path: `/api/v1/vehicle/sers/${orgId}/vehicles/${vehicleId}/runtime/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsSersList
     * @request GET:/api/v1/work/orgs/{org_id}/sers/
     * @secure
     */
    workOrgsSersList: ({ orgId, ...query }: WorkOrgsSersListParams, params: RequestParams = {}) =>
      this.request<WorkOrgsSersListData, any>({
        path: `/api/v1/work/orgs/${orgId}/sers/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsSersRetrieve
     * @request GET:/api/v1/work/orgs/{org_id}/sers/{id}/
     * @secure
     */
    workOrgsSersRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<WorkOrgsSersRetrieveData, any>({
        path: `/api/v1/work/orgs/${orgId}/sers/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsSersSearchCreate
     * @request POST:/api/v1/work/orgs/{org_id}/sers/search/
     * @secure
     */
    workOrgsSersSearchCreate: (orgId: string, data: WorkServiceCenterSearch, params: RequestParams = {}) =>
      this.request<WorkOrgsSersSearchCreateData, any>({
        path: `/api/v1/work/orgs/${orgId}/sers/search/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTaskList
     * @request GET:/api/v1/work/orgs/{org_id}/task/
     * @secure
     */
    workOrgsTaskList: ({ orgId, ...query }: WorkOrgsTaskListParams, params: RequestParams = {}) =>
      this.request<WorkOrgsTaskListData, any>({
        path: `/api/v1/work/orgs/${orgId}/task/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTaskCreate
     * @request POST:/api/v1/work/orgs/{org_id}/task/
     * @secure
     */
    workOrgsTaskCreate: (orgId: string, data: OrgWorkTask, params: RequestParams = {}) =>
      this.request<WorkOrgsTaskCreateData, any>({
        path: `/api/v1/work/orgs/${orgId}/task/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTaskRetrieve
     * @request GET:/api/v1/work/orgs/{org_id}/task/{id}/
     * @secure
     */
    workOrgsTaskRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<WorkOrgsTaskRetrieveData, any>({
        path: `/api/v1/work/orgs/${orgId}/task/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTaskPartialUpdate
     * @request PATCH:/api/v1/work/orgs/{org_id}/task/{id}/
     * @secure
     */
    workOrgsTaskPartialUpdate: (id: number, orgId: string, data: PatchedOrgWorkTask, params: RequestParams = {}) =>
      this.request<WorkOrgsTaskPartialUpdateData, any>({
        path: `/api/v1/work/orgs/${orgId}/task/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTaskDestroy
     * @request DELETE:/api/v1/work/orgs/{org_id}/task/{id}/
     * @secure
     */
    workOrgsTaskDestroy: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<WorkOrgsTaskDestroyData, any>({
        path: `/api/v1/work/orgs/${orgId}/task/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTasksTaskList
     * @request GET:/api/v1/work/orgs/{org_id}/tasks/{task_id}/task/
     * @secure
     */
    workOrgsTasksTaskList: ({ orgId, taskId, ...query }: WorkOrgsTasksTaskListParams, params: RequestParams = {}) =>
      this.request<WorkOrgsTasksTaskListData, any>({
        path: `/api/v1/work/orgs/${orgId}/tasks/${taskId}/task/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTasksTaskCreate
     * @request POST:/api/v1/work/orgs/{org_id}/tasks/{task_id}/task/
     * @secure
     */
    workOrgsTasksTaskCreate: (
      orgId: string,
      taskId: string,
      data: WorkTaskStatusChangeDetailed,
      params: RequestParams = {},
    ) =>
      this.request<WorkOrgsTasksTaskCreateData, any>({
        path: `/api/v1/work/orgs/${orgId}/tasks/${taskId}/task/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTasksTaskRetrieve
     * @request GET:/api/v1/work/orgs/{org_id}/tasks/{task_id}/task/{uuid}/
     * @secure
     */
    workOrgsTasksTaskRetrieve: (orgId: string, taskId: string, uuid: string, params: RequestParams = {}) =>
      this.request<WorkOrgsTasksTaskRetrieveData, any>({
        path: `/api/v1/work/orgs/${orgId}/tasks/${taskId}/task/${uuid}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTasksTaskPartialUpdate
     * @request PATCH:/api/v1/work/orgs/{org_id}/tasks/{task_id}/task/{uuid}/
     * @secure
     */
    workOrgsTasksTaskPartialUpdate: (
      orgId: string,
      taskId: string,
      uuid: string,
      data: PatchedWorkTaskStatusChangeDetailed,
      params: RequestParams = {},
    ) =>
      this.request<WorkOrgsTasksTaskPartialUpdateData, any>({
        path: `/api/v1/work/orgs/${orgId}/tasks/${taskId}/task/${uuid}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkOrgsTasksTaskDestroy
     * @request DELETE:/api/v1/work/orgs/{org_id}/tasks/{task_id}/task/{uuid}/
     * @secure
     */
    workOrgsTasksTaskDestroy: (orgId: string, taskId: string, uuid: string, params: RequestParams = {}) =>
      this.request<WorkOrgsTasksTaskDestroyData, any>({
        path: `/api/v1/work/orgs/${orgId}/tasks/${taskId}/task/${uuid}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersEmployeesList
     * @request GET:/api/v1/work/sers/{org_id}/employees/
     * @secure
     */
    workSersEmployeesList: ({ orgId, ...query }: WorkSersEmployeesListParams, params: RequestParams = {}) =>
      this.request<WorkSersEmployeesListData, any>({
        path: `/api/v1/work/sers/${orgId}/employees/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersEmployeesRetrieve
     * @request GET:/api/v1/work/sers/{org_id}/employees/{id}/
     * @secure
     */
    workSersEmployeesRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<WorkSersEmployeesRetrieveData, any>({
        path: `/api/v1/work/sers/${orgId}/employees/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersOrgsList
     * @request GET:/api/v1/work/sers/{org_id}/orgs/
     * @secure
     */
    workSersOrgsList: ({ orgId, ...query }: WorkSersOrgsListParams, params: RequestParams = {}) =>
      this.request<WorkSersOrgsListData, any>({
        path: `/api/v1/work/sers/${orgId}/orgs/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersOrgsRetrieve
     * @request GET:/api/v1/work/sers/{org_id}/orgs/{id}/
     * @secure
     */
    workSersOrgsRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<WorkSersOrgsRetrieveData, any>({
        path: `/api/v1/work/sers/${orgId}/orgs/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersTaskList
     * @request GET:/api/v1/work/sers/{org_id}/task/
     * @secure
     */
    workSersTaskList: ({ orgId, ...query }: WorkSersTaskListParams, params: RequestParams = {}) =>
      this.request<WorkSersTaskListData, any>({
        path: `/api/v1/work/sers/${orgId}/task/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersTaskRetrieve
     * @request GET:/api/v1/work/sers/{org_id}/task/{id}/
     * @secure
     */
    workSersTaskRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<WorkSersTaskRetrieveData, any>({
        path: `/api/v1/work/sers/${orgId}/task/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersTaskVerboseRetrieve
     * @request GET:/api/v1/work/sers/{org_id}/task/verbose/
     * @secure
     */
    workSersTaskVerboseRetrieve: (orgId: string, params: RequestParams = {}) =>
      this.request<WorkSersTaskVerboseRetrieveData, any>({
        path: `/api/v1/work/sers/${orgId}/task/verbose/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersTasksTaskList
     * @request GET:/api/v1/work/sers/{org_id}/tasks/{task_id}/task/
     * @secure
     */
    workSersTasksTaskList: ({ orgId, taskId, ...query }: WorkSersTasksTaskListParams, params: RequestParams = {}) =>
      this.request<WorkSersTasksTaskListData, any>({
        path: `/api/v1/work/sers/${orgId}/tasks/${taskId}/task/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersTasksTaskCreate
     * @request POST:/api/v1/work/sers/{org_id}/tasks/{task_id}/task/
     * @secure
     */
    workSersTasksTaskCreate: (
      orgId: string,
      taskId: string,
      data: WorkTaskStatusChangeDetailed,
      params: RequestParams = {},
    ) =>
      this.request<WorkSersTasksTaskCreateData, any>({
        path: `/api/v1/work/sers/${orgId}/tasks/${taskId}/task/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersTasksTaskRetrieve
     * @request GET:/api/v1/work/sers/{org_id}/tasks/{task_id}/task/{uuid}/
     * @secure
     */
    workSersTasksTaskRetrieve: (orgId: string, taskId: string, uuid: string, params: RequestParams = {}) =>
      this.request<WorkSersTasksTaskRetrieveData, any>({
        path: `/api/v1/work/sers/${orgId}/tasks/${taskId}/task/${uuid}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersTasksTaskPartialUpdate
     * @request PATCH:/api/v1/work/sers/{org_id}/tasks/{task_id}/task/{uuid}/
     * @secure
     */
    workSersTasksTaskPartialUpdate: (
      orgId: string,
      taskId: string,
      uuid: string,
      data: PatchedWorkTaskStatusChangeDetailed,
      params: RequestParams = {},
    ) =>
      this.request<WorkSersTasksTaskPartialUpdateData, any>({
        path: `/api/v1/work/sers/${orgId}/tasks/${taskId}/task/${uuid}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersTasksTaskDestroy
     * @request DELETE:/api/v1/work/sers/{org_id}/tasks/{task_id}/task/{uuid}/
     * @secure
     */
    workSersTasksTaskDestroy: (orgId: string, taskId: string, uuid: string, params: RequestParams = {}) =>
      this.request<WorkSersTasksTaskDestroyData, any>({
        path: `/api/v1/work/sers/${orgId}/tasks/${taskId}/task/${uuid}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersVehiclesList
     * @request GET:/api/v1/work/sers/{org_id}/vehicles/
     * @secure
     */
    workSersVehiclesList: ({ orgId, ...query }: WorkSersVehiclesListParams, params: RequestParams = {}) =>
      this.request<WorkSersVehiclesListData, any>({
        path: `/api/v1/work/sers/${orgId}/vehicles/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name WorkSersVehiclesRetrieve
     * @request GET:/api/v1/work/sers/{org_id}/vehicles/{id}/
     * @secure
     */
    workSersVehiclesRetrieve: (id: number, orgId: string, params: RequestParams = {}) =>
      this.request<WorkSersVehiclesRetrieveData, any>({
        path: `/api/v1/work/sers/${orgId}/vehicles/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
