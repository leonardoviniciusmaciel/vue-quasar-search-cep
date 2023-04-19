const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "home",
				alias: "/",
				component: () => import("pages/IndexPage.vue"),
			},
			{
				path: "search-cep",
				name: "consulta",
				alias: ["/consulta-cep", "consultar-cep"],
				component: () => import("pages/SearchCepPage.vue"),
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
