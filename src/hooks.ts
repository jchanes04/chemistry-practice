import type { Request, Response } from "@sveltejs/kit";
import { getUserFromToken } from "$lib/auth";
import { init } from '$lib/mongo'
type Resolve = (request: Request<Record<string, any>>) => Response | Promise<Response>

init()

const authenticatedEndpoints = ["account", "score"]

export async function handle({ request, resolve }: { request: Request, resolve: Resolve }) {
    let endpoint = request.path.split("/")[1]
    let authToken = request.headers.cookie?.split("; ").find(x => x.split("=")[0] === "authToken")?.split("=")[1]
    if (authToken) request.headers.authorization = authToken

    if (authenticatedEndpoints.includes(endpoint)) {
        let authenticated = !!(await getUserFromToken(request.headers.authorization))
        if (!authenticated) 
            return {
                status: 302,
                headers: {
                    'Location': '/auth/google'
                }
            }
    }

    return resolve(request)
}

export async function getSession(request: Request) {
    let user = await getUserFromToken(request.headers.authorization)
    if (user) 
        return {
            loggedIn: true,
            userData: { ...user }
        }

    return {
        loggedIn: false
    }
}