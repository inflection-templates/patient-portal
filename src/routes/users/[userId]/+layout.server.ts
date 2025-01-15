import { SessionManager } from "$routes/api/sessions/session.manager";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { getPatientById } from "$routes/api/services/user";
import type { SessionUser } from "$lib/types/session.types";

export const load: LayoutServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        if (!sessionId) {
            throw redirect(307, '/');
        }

        const session = await SessionManager.getSession(sessionId);
        if (!session) {
            throw redirect(307, '/');
        }

        const sessionUser: SessionUser = {
            sessionId: session.sessionId,
            tenantId: session.tenantId,
            tenantCode: session.tenantCode,
            tenantName: session.tenantName,
            userId: session.userId,
            email: session.email,
            username: session.username,
            fullName: session.fullName,
            firstName: session.firstName,
            roleId: session.roleId,
            roleName: session.roleName,
            profileImageUrl: session.profileImageUrl
        };

        const response = await getPatientById(sessionId, session.userId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }

        return {
            sessionUser,
            user: response.Data.Patient.User
        };
    } catch (e) {
        if (e instanceof Error) {
            console.error('Layout load error:', e.message);
        }
        throw e;
    }
};