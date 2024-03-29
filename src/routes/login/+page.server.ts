import { checkUserCredentials, createUser } from '$lib/server/db';
import { createSession } from '$lib/server/sessionStore';
import { fail, redirect, type Actions, type Cookies } from '@sveltejs/kit';


function performLogin(cookies: Cookies, username: string) {
    const maxAge = 60*60*24*30 //30 days
    const sid = createSession(username, maxAge)
    cookies.set('sid', sid, {maxAge})
}

export const actions: Actions = {
    register: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        if(username && password) {
            createUser(username, password)
            performLogin(cookies, username)
            throw redirect(303, '/')
        } else{
            return fail(400, {errorMessage: 'Missing username or Password'})
        }
    },

    login: async({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        if(username && password) {
          const res = await  checkUserCredentials(username, password)
          if(!res){
             return fail(400, {errorMessage: 'Invalid Username or Password'})
          }

          performLogin(cookies, username)
          throw redirect(303, '/')
        } else {
            return fail(400, {errorMessage: 'Missing username or Password'})
        }
    }
}