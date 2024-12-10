import { getPatientById, updatePatientById } from "$routes/api/services/user";
import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { string } from "zod";
import { z } from 'zod';
import { zfd } from 'zod-form-data';


const itemsPerPage = 100
export const load : PageServerLoad = async (event: RequestEvent) => {
    try {
		const sessionId  = event.cookies.get('sessionId');
		const userId = event.params.userId;

		// const searchParams = {
		// 	userId: event.params.userId as string,
		// 	itemsPerPage: itemsPerPage
		// }
        const response = await getPatientById(sessionId, userId);
        const healthProfile= response.Data;
        // console.log('response', JSON.stringify(response.Data));
        return {
            healthProfile,
            sessionId
        }
}
catch (error) {
    console.error(`Error retriving Vitals: ${error}`);
}
}

const updateUserProfile = zfd.formData({
    FirstName  : z.string().optional(),
    LastName   : z.string().optional(),
    Gender     : z.string().optional(),
    BirthDate  : z.date().optional(),
    MaritalStatus : z.string().optional(),
    Email : z.string().email().optional(),
    Phone: z.string().optional(),
    Race:z.string().optional(),
    Ethnicity:z.string().optional(),
    StrokeSurvivorOrCaregiver:z.string().optional(),
    WorkedPriorToStroke : z.string().optional(),
    LivingAlone:z.string().optional(),
    AddressLine: z.string().optional(),
    city:z.string().optional(),
    District:z.string().optional(),
    State:z.string().optional(),
    Country: z.string().optional(),
    PostalCode : z.string().optional()
})

export const actions = {
    updateprofile: async ( event :RequestEvent ) => {
        const request = event.request;
        const userId = event.params.userId;
        const sessionId = event.cookies.get('sessionId');
        const data = await request.formData();
        const formData = Object.fromEntries(data);
        console.log("############################in the update profile action");
        type updateProfileSchema =z.infer<typeof updateUserProfile>;
        let result :updateProfileSchema={};

        try{
            result=updateUserProfile.parse(formData);
            console.log(result,"result in try")
        }
        catch(err : any){
            const {fieldErrors:errors} =err.flatten();
            console.log(errors);
            const {...rest} = formData;
            return {
                data:rest,
                errors
            }
        };
        const response = await updatePatientById(
            sessionId,
            userId,
            result.FirstName,
            result.LastName,
            result.Gender,
            result.BirthDate,
            result.MaritalStatus,
            result.Email,
            result.Phone,
            result.Race,
            result.Ethnicity,
            result.StrokeSurvivorOrCaregiver,
            result.LivingAlone,
            result.AddressLine,
            result.city,
            result.District,
            result.State,
            result.Country,
            result.PostalCode

        )
    }
}