<template>
	<section id="search--container">
		<q-btn
			flat
			color="primary"
			icon="chevron_left"
			label="Voltar"
			class="q-mt-md"
			@click.prevent="$router.go(-1)"
		/>
		<h4 class="text-h4 q-mb-lg">Consultar CEP</h4>
		<div>
			<q-form @submit="onSubmit" class="q-gutter-md">
				<q-input
					v-model="cep"
					filled
					type="search"
					label="CEP"
					mask="#####-###"
					hint="Apenas números"
					lazy-rules
					:rules="[
						(val) =>
							(val !== null && val !== '') ||
							'Por favor, informe um CEP para realizar a busca.',
					]"
				>
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input>
			</q-form>
		</div>
	</section>
	<section id="address--container">
		<h4 class="text-h4 q-mb-md">Endereço</h4>

		<q-input filled disable readonly v-model="street" label="Rua" />
		<q-input filled disable readonly v-model="neighborhood" label="Bairro" />
		<q-input filled disable readonly v-model="city" label="Cidade" />
		<q-input filled disable readonly v-model="state" label="Estado" />
		<q-input filled disable readonly v-model="ibge" label="IBGE" />
		<q-btn
			color="primary"
			label="Copiar"
			class="q-mt-md"
			@click.prevent="copyAddress"
		/>
	</section>
</template>

<script setup>
import useQuasar from "quasar/src/composables/use-quasar.js";
import { ref } from "vue";
import { api } from "boot/axios";
import { copyToClipboard } from "quasar";

const $q = useQuasar();
const cep = ref(null);
const response = ref(null);
const street = ref(null);
const neighborhood = ref(null);
const city = ref(null);
const state = ref(null);
const ibge = ref(null);

const getAddress = async () => {
	try {
		let formattedCep = cep.value.replace("-", "");
		response.value = await api.get(`${formattedCep}/json`);

		street.value = response.value.data.logradouro;
		neighborhood.value = response.value.data.bairro;
		city.value = response.value.data.localidade;
		state.value = response.value.data.uf;
		ibge.value = response.value.data.ibge;

		if (response.value.data.erro) {
			$q.notify({
				color: "red-5",
				textColor: "white",
				icon: "warning",
				message: "O CEP informado não foi encontrado.",
			});
		}
	} catch (error) {
		console.error(error);
	}
};

const copyAddress = () => {
	let address = "";

	address = `
  Rua: ${street.value || ""}
  Bairro: ${neighborhood.value || ""}
  Cidade: ${city.value || ""}
  Estado: ${state.value || ""}
  IBGE: ${ibge.value || ""}
  CEP: ${cep.value || ""}
	`;

	//Remove espaços criados com a identação da variável
	address = address.replace(/ /g, "");

	copyToClipboard(address)
		.then(() => {
			$q.notify({
				color: "green-5",
				textColor: "success",
				icon: "check",
				message: "O endereço foi copiado com sucesso!",
			});
		})
		.catch(() => {
			$q.notify({
				color: "red-5",
				textColor: "white",
				icon: "warning",
				message: "Houve um erro copiando o endereço.",
			});
		});
};

const isCepValid = () => {
	if (!cep.value || cep.value.length != 9) {
		$q.notify({
			color: "red-5",
			textColor: "white",
			icon: "warning",
			message: "CEP inválido ou incompleto.",
		});

		return false;
	}

	return true;
};

const onSubmit = async () => {
	if (isCepValid()) await getAddress();
};
</script>
