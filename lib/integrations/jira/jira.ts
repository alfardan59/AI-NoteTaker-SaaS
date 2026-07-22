export class JiraAPI{
    private baseUrl='https://api.atlassian.com/ex/jira'

    async getProjectById(token: string, cloudId:string, projectId:string){
        const response = await fetch(`${this.baseUrl}/${cloudId}/rest/api/3/project/${projectId}`, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept':'application/json'
            }
        })
        if(!response.ok){
            const errorText = await response.text()
            console.error('Jira project error: ', response.status,errorText)
            throw new Error(`Failed to fetch project ${response.status}`)
        }
    }

    async getAccessibleResources(token:string){
        const response = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept':'application/json'
            }
        })

        if(!response.ok){
            const errorText = await response.text()
            console.error('Jira resources error:', response.status, errorText)
            throw new Error(`Failed to fetch resources ${response.status}`)
        }

        return response.json()
    }
}