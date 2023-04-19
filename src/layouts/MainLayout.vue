<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					v-if="$q.screen.xs"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title>
					<router-link to="/">CEP Fácil</router-link>
				</q-toolbar-title>

				<q-item tag="div" class="row" v-if="!$q.screen.xs">
					<EssentialLink
						v-for="link in linksList"
						:key="link.title"
						v-bind="link"
					/>
				</q-item>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-if="$q.screen.xs"
			v-model="leftDrawerOpen"
			show-if-above
			bordered
		>
			<q-list>
				<q-item-label header>Navegação</q-item-label>

				<EssentialLink
					v-for="link in linksList"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const leftDrawerOpen = ref(false);

const linksList = [
	{
		title: "Inicio",
		link: "/",
	},
	{
		title: "Consultar CEP",
		link: "/consultar-cep",
	},
];

const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped lang="scss">
.q-toolbar,
.q-page-container {
	max-width: 1224px;
	margin: auto;
}

.q-page-container {
	padding: 30px;
}
.q-toolbar {
	&__title {
		a {
			text-decoration: none;
			color: #fff;
			background-color: $primary;
		}
	}
}
</style>
