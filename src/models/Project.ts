import Model from './Model'

export class Project extends Model {

    public name!: string
    public description?: string
    public created_at!: Date
    public updated_at!: Date
    public deleted_at?: Date
}

export type ProjectParams = Omit<Project, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'parseJson'>

export class ProjectApiKey {

    id!: number
    project_id!: number
    value!: string
    name!: string
    description?: string
    created_at!: Date
    updated_at!: Date
    deleted_at?: Date

    constructor(json: any) {
        Object.assign(this, json)
    }

}
