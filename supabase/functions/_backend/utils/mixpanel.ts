import type { Context } from '@hono/hono'
import Mixpanel from "mixpanel"
import { supabaseAdmin } from './supabase.ts';

let Token = "e9d2d9d462a6493dfb535a71a4689f67";

var mixpanel = Mixpanel.init(Token);
export const sendMixpanelStudentEvent = async (
    context: Context,
    event_name: string,
    params: any = {},
) => {
    if (!params.device_id) return;
    const { data: deviceInfo } = await supabaseAdmin(context)
        .from('devices')
        .select('device_id, custom_id')
        .eq('device_id', params.device_id)
        .single()

    if (!deviceInfo?.custom_id) return;
    const eventBody = {
        distinct_id: deviceInfo?.custom_id,

        ...params,
        triggered_via: "capgo_backend",
    };

    if (params.version_id) {
        const { data: versionInfo } = await supabaseAdmin(context)
            .from('app_versions')
            .select('id, name')
            .eq('id', params.version_id)
            .single()

        eventBody['version_name'] = versionInfo?.name
    }

    const camelToSnakeCase = (str: any) => str.replace(/[A-Z]/g, (letter: any) => `_${letter.toLowerCase()}`);
    console.log("🚀 ~ eventBody:", camelToSnakeCase(event_name), eventBody)
    mixpanel.track(camelToSnakeCase(event_name), eventBody);
};
