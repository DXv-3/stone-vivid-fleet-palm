import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-PXUW90dM.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getForgeAvailability_createServerFn_handler = createServerRpc({
	id: "3540dd61699e69834ac01a1868d2daf3d9cd715cb4d36efe6c6f93e04e23f577",
	name: "getForgeAvailability",
	filename: "src/lib/forge/status.ts"
}, (opts) => getForgeAvailability.__executeServer(opts));
var getForgeAvailability = createServerFn({ method: "GET" }).handler(getForgeAvailability_createServerFn_handler, async () => {
	return { available: Boolean(process.env.XAI_API_KEY) };
});
//#endregion
export { getForgeAvailability_createServerFn_handler };
