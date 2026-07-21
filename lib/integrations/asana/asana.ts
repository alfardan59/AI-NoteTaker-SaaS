export class AsanaAPI{
    private baseUrl = 'https://app.asana.com/api/1.0'

    async getWorkspaces(token:string){
        const response=await fetch(
            `${this.baseUrl}/workspaces`,
            {
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            }
        )

        if(!response.ok){
            throw new Error('Failed to Fetch worksppace')
        }

        return response.json()
    }

    async getProjects(token:string, workspaceId:string){
        const response = await fetch(
            `${this.baseUrl}/projects?workspaces=${workspaceId}`,
            {
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            }
        )
        if(!response.ok){
            throw new Error('Failed to Fetch Projects')
        }

        return response.json()
    }
}