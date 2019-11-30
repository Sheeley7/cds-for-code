import { DynamicsWebApiClient } from "../http/DynamicsWebApi";
import { DynamicsWebApi } from '../http/Types';
import { TS } from 'typescript-linq/TS';
import ApiHelper from "./ApiHelper";

export default class MetadataRepository
{
    private config:DynamicsWebApi.Config;

    public constructor (config:DynamicsWebApi.Config)
    {
        this.config = config;
        this.webapi = new DynamicsWebApiClient(this.config);
    }

    private webapi: DynamicsWebApiClient;

    public retrieveEntities(solutionId?:string) : Promise<any[]>
    {
        let entitiesQuery:DynamicsWebApi.RetrieveMultipleRequest = {
            filter: "IsIntersect eq false"
        };

        return this.webapi.retrieveEntitiesRequest(entitiesQuery)
            .then(entitiesResponse => ApiHelper.filterSolutionComponents(this.webapi, entitiesResponse, solutionId, DynamicsWebApi.SolutionComponent.Entity, e => e["MetadataId"]))
            .then(response => response ? response.orderBy(e => e["LogicalName"]).toArray() : []);
    }

    public retrieveAttributes(entityKey:string) : Promise<any[]>
    {
        return this.webapi.retrieveAttributes(entityKey, undefined, undefined, 'AttributeOf eq null')
            .then(response => new TS.Linq.Enumerator(response.value).orderBy(a => a["LogicalName"]).toArray());
    }

    public retrieveOptionSets(solutionId?:string): Promise<any[]>
    {
        return this.webapi.retrieveGlobalOptionSets()
            .then(optionSetResponse => ApiHelper.filterSolutionComponents(this.webapi, optionSetResponse, solutionId, DynamicsWebApi.SolutionComponent.OptionSet, o => o["MetadataId"]))
            .then(response => response.orderBy(o => o["Name"]).toArray());
    }

    public retrieveForms(entityLogicalName:string, solutionId?:string) : Promise<any[]>
    {
        let request:DynamicsWebApi.RetrieveMultipleRequest = {
            collection: "systemforms",
            filter: `objecttypecode eq '${entityLogicalName}' and type ne 10 and formactivationstate eq 1`,  
            orderBy: ["name"]
        };

        return this.webapi.retrieveRequest(request)
            .then(systemFormResponse => ApiHelper.filterSolutionComponents(this.webapi, systemFormResponse, solutionId, DynamicsWebApi.SolutionComponent.Form, f => f["formid"]))
            .then(response => response.toArray());
    }

    public retrieveDashboards(entityLogicalName:string, solutionId?:string) : Promise<any[]>
    {
        let request:DynamicsWebApi.RetrieveMultipleRequest = {
            collection: "systemforms",
            filter: `objecttypecode eq '${entityLogicalName}' and type eq 10 and formactivationstate eq 1`,  
            orderBy: ["name"]
        };

        return this.webapi.retrieveRequest(request)
            .then(systemFormResponse => ApiHelper.filterSolutionComponents(this.webapi, systemFormResponse, solutionId, DynamicsWebApi.SolutionComponent.SystemForm, f => f["formid"]))
            .then(response => response.toArray());
    }

    public retrieveViews(entityLogicalName:string, solutionId?:string) : Promise<any[]>
    {
        let request:DynamicsWebApi.RetrieveMultipleRequest = {
            collection: "savedqueries",
            filter: `returnedtypecode eq '${entityLogicalName}' and statecode eq 0`,
            orderBy: ["name"]
        };

        return this.webapi.retrieveRequest(request)
            .then(savedQueryResponse => ApiHelper.filterSolutionComponents(this.webapi, savedQueryResponse, solutionId, DynamicsWebApi.SolutionComponent.SavedQuery, q => q["savedqueryid"]))
            .then(response => response.toArray());
    }

    public retrieveCharts(entityLogicalName:string, solutionId?:string) : Promise<any[]>
    {
        let request:DynamicsWebApi.RetrieveMultipleRequest = {
            collection: "savedqueryvisualizations",
            filter: `primaryentitytypecode eq '${entityLogicalName}'`,
            orderBy: ["name"]
        };

        return this.webapi.retrieveRequest(request)
            .then(savedQueryResponse => ApiHelper.filterSolutionComponents(this.webapi, savedQueryResponse, solutionId, DynamicsWebApi.SolutionComponent.SavedQueryVisualization, q => q["savedqueryvisualizationid"]))
            .then(response => response.toArray());
    }

    public retrieveKeys(entityKey:string) : Promise<any[]>
    {
        return this.webapi.retrieveEntity(entityKey, ["MetadataId"], [ { property: "Keys" } ])
            .then(response => response.Keys);
    }

    public retrieveRelationships(entityKey:string) : Promise<{ oneToMany:any[], manyToOne:any[], manyToMany:any[] }>
    {
        return this.webapi.retrieveEntity(entityKey, ["MetadataId"], [ { property: "OneToManyRelationships" }, { property: "ManyToOneRelationships" }, { property: "ManyToManyRelationships" } ])
            .then(response => response ? { oneToMany: response.OneToManyRelationships, manyToOne: response.ManyToOneRelationships, manyToMany: response.ManyToManyRelationships } : null);
    }
}