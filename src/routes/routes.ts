/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SensorRouter } from './SensorRouter';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "SensorReadout": {
        "dataType": "refObject",
        "properties": {
            "sensor_id": {"dataType":"string","required":true},
            "temperatura": {"dataType":"double","required":true},
            "umidade": {"dataType":"double","required":true},
            "status_chuva": {"dataType":"string","required":true},
            "timestamp": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Device": {
        "dataType": "refObject",
        "properties": {
            "sensor_id": {"dataType":"string","required":true},
            "nome": {"dataType":"string","required":true},
            "lat": {"dataType":"double","required":true},
            "lng": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsSensorRouter_getHistorico: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/rainsafe/historico',
            ...(fetchMiddlewares<RequestHandler>(SensorRouter)),
            ...(fetchMiddlewares<RequestHandler>(SensorRouter.prototype.getHistorico)),

            async function SensorRouter_getHistorico(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSensorRouter_getHistorico, request, response });

                const controller = new SensorRouter();

              await templateService.apiHandler({
                methodName: 'getHistorico',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSensorRouter_getLatest: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/rainsafe/sensor/:id',
            ...(fetchMiddlewares<RequestHandler>(SensorRouter)),
            ...(fetchMiddlewares<RequestHandler>(SensorRouter.prototype.getLatest)),

            async function SensorRouter_getLatest(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSensorRouter_getLatest, request, response });

                const controller = new SensorRouter();

              await templateService.apiHandler({
                methodName: 'getLatest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSensorRouter_addDevice: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Device"},
        };
        app.post('/rainsafe/dispositivos',
            ...(fetchMiddlewares<RequestHandler>(SensorRouter)),
            ...(fetchMiddlewares<RequestHandler>(SensorRouter.prototype.addDevice)),

            async function SensorRouter_addDevice(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSensorRouter_addDevice, request, response });

                const controller = new SensorRouter();

              await templateService.apiHandler({
                methodName: 'addDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSensorRouter_listDevices: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/rainsafe/dispositivos',
            ...(fetchMiddlewares<RequestHandler>(SensorRouter)),
            ...(fetchMiddlewares<RequestHandler>(SensorRouter.prototype.listDevices)),

            async function SensorRouter_listDevices(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSensorRouter_listDevices, request, response });

                const controller = new SensorRouter();

              await templateService.apiHandler({
                methodName: 'listDevices',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
