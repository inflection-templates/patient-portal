export interface SessionUser {
    sessionId: string;
    tenantId: string;
    tenantCode: string;
    tenantName: string;
    userId: string;
    email: string;
    username: string;
    fullName: string;
    firstName: string;
    roleId: string;
    roleName: string;
    profileImageUrl: string;
}

export interface Person {
    DisplayName: string;
    Email: string;
    ProfileImageURL: string;
}

export interface User {
    Person: Person;
}

export interface LayoutData {
    sessionUser: SessionUser;
    user: User;
}