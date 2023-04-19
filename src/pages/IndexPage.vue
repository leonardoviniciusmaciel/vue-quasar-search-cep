<template>
	<q-page class="row items-center">
		<div class="column col-md-6">
			<h2 class="info--title text-h2 text-bold">{{ pageTitle }}</h2>
			<p class="q-mb-lg info--description text-body1">{{ pageDescription }}</p>
			<q-btn
				class="info--btn float-right"
				color="primary"
				to="/consultar-cep"
				:label="btnLabel"
			/>
		</div>

		<div class="col-md-6">
			<div class="image-container gt-sm">
				<img
					alt="Sidebar Image"
					src="~assets/explore.png"
					class="sidebar-image"
				/>
			</div>
		</div>
	</q-page>
</template>

<script setup>
const pageTitle = "Conheça o CEP Fácil";
const pageDescription =
	"O nosso site é a sua solução para encontrar CEPs de forma rápida e simples. Com apenas alguns cliques, você terá acesso às informações de CEPs de todo o Brasil, de forma precisa e confiável. Nunca mais perca tempo procurando um CEP, deixe-nos fazer isso por você!";
const btnLabel = "Conheça agora!";
</script>

<style lang="scss" scoped>
.info--btn {
	max-width: 300px;
}
.sidebar-image {
	height: auto;
	float: right;
	max-width: 400px;
}
</style>
