<template>
	<q-item clickable tag="a" :target="target" :to="link">
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" />
		</q-item-section>

		<q-item-section v-if="title">
			<q-item-label>{{ title }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		required: true,
	},

	link: {
		type: String,
		default: "",
	},

	icon: {
		type: String,
		default: "",
	},

	target: {
		type: String,
		default: "",
	},
});
</script>
