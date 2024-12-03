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
    const teacherStudentParams = {
        distinct_id: deviceInfo?.custom_id,
        device_id: deviceInfo.device_id
    };

    const eventBody = {
        ...teacherStudentParams,
        ...params,
        triggered_via: "backend",
    };

    console.log("🚀 ~ eventBody:", event_name, eventBody)
    mixpanel.track(event_name, eventBody);
};
