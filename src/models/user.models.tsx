export interface User {
    id: number;
    short_email: string,
    large_email: string,
    status: boolean
}

export interface Role {
    id: number;
    name: string;
    description: string;
    status: boolean;
    reference: number | null;
    permissions: Role[]
}

export interface Permission {
    id: number;
    name: string;
    description: string;
    status: boolean;
}

export interface Tenant {
    id: number;
    name: string;
    type: 'celulosa' | 'biopackaging',
    status: boolean;
    applications: Application[]
}

export interface Application {
    id: number;
    name: string;
    description: string;
    url: string;
}


export interface Setup {
    roles: Role[],
    tenants: Tenant[]
}

export interface CreatePolicyToUser {
    role_id: number;
    user_id: number;
    tenant_id: number;
    applications_id: number[];
    permissions_id: number[]
}

export interface EditPolicyToUser {
    id: number;
    role_id: number;
    user_id: number;
    tenant_id: number;
    applications_id: number;
    permissions_id: number[]
}

export interface UserPolicyDetail {
    id: number;
    role: Role;
    tenant: Tenant;
    user_id: number;
    application_id: number;
    application: Application;
    role_id:number;
}