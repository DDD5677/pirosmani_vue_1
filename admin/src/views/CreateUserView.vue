<template>
	<section class="create__users">
		<div class="container">
			<h2 class="title">Please fill in the User information</h2>
			<div class="blocks">
				<form @submit.prevent="submitHandler" enctype="multipart/form-data">
					<label class="custom-file-upload">
						<span class="upload__title">Choose Image<i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
						<input class="input_file" type="file" @change.stop="changeAvatar" />

						<span class="image_name" ref="imageName"></span>
					</label>
					<label @click="isAdminHandler" for="">
						<input type="checkbox" id="">
						<span class="shortline" :class="{ 'checked': admin }">
							<span class="circle"></span>
						</span>

						Admin
					</label>
					<form-input class="inputs" :label="'Name'" :type="'text'" :placeholder="'Name'" :errors="errors"
						:error="errors ? errors.name : ''" v-model="name" />
					<form-input class="inputs" :label="'Surname'" :type="'text'" :placeholder="'Surname'" :errors="errors"
						v-model="surname" />
					<form-input class="inputs" :label="'Email'" :type="'email'" :placeholder="'Email'" :errors="errors"
						:error="errors ? errors.email : ''" v-model="email" />
					<form-input class="inputs" :label="'Password'" :type="'password'" :placeholder="'Password'" :errors="errors"
						:error="errors ? errors.password : ''" v-model="password" />
					<form-input class="inputs" :label="'Phone'" :type="'tel'" :placeholder="'Phone'" :errors="errors"
						:error="errors ? errors.phone : ''" v-model="phone" />
					<form-input class="inputs" :label="'Extra phone'" :type="'tel'" :placeholder="'Extra phone'"
						:errors="errors" v-model="extraPhone" />
					<green-btn :isLoading="loading" class="green__btn">Create</green-btn>
				</form>

			</div>

		</div>
	</section>
</template>

<script>
import { changeImage, compressedImage } from '@/helpers/uploadImage';
import { mapMutations, mapState } from 'vuex';

export default {
	name: 'create-user',
	data() {
		return {
			name: '',
			surname: '',
			email: '',
			admin: false,
			phone: '',
			extraPhone: '',
			password: '',
			confirmPassword: '',
			avatar: null,
			loading: false,
		}
	},
	computed: {
		...mapState({
			errors: state => state.user.errors
		})
	},
	methods: {
		...mapMutations({
			toggleSignIn: 'navbar/toggleSignIn'
		}),
		changeAvatar(event) {
			let inputImage = changeImage(event)
			if (!inputImage) return
			this.$refs.imageName.innerText = inputImage.name;
			this.avatar = inputImage;
		},
		isAdminHandler() {
			this.admin = !this.admin
		},
		async submitHandler() {
			this.loading = true;
			let avatar = this.avatar;
			if (avatar) {
				avatar = await compressedImage(avatar)
			}
			const data = {
				name: this.name,
				surname: this.surname,
				email: this.email,
				isAdmin: this.admin,
				phone: this.phone,
				extraPhone: this.extraPhone,
				password: this.password,
				avatar: avatar,
			}
			this.$store.dispatch('user/postUsers', data).then(() => {
				this.name = '';
				this.surname = '';
				this.email = ''
				this.admin = false
				this.phone = ''
				this.extraPhone = null
				this.password = ''
				this.avatar = null
				this.$refs.imageName.innerText = '';
				this.loading = false;
			}).catch((err) => {
				this.loading = false;

			})
		}
	}

}
</script>

<style lang="scss" scoped>
.create__users {
	.title {
		font-size: 24px;
		font-weight: 500;
		margin-bottom: 20px;
	}

	.blocks {
		border: 1px solid #C6C6C6;
		padding: 20px 15px;
		border-radius: 15px;

		form {
			display: flex;
			gap: 20px;
			flex-wrap: wrap;
			width: 100%;
		}

		.image_name {
			font-size: 11px;
			color: $main-color;
		}

		.custom-file-upload {
			border-radius: 5px;
			border: 1px solid $main-color;
			color: $main-color;
			display: inline-flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 5px;
			font-size: 14px;
			font-weight: 500;
			padding: 10px;
			cursor: pointer;

			.upload__title {
				display: inline-block;
				line-height: 1;
				font-weight: 500;

				i {
					margin-left: 5px;
				}

			}

			input[type="file"] {
				display: none;
			}
		}

		.inputs {
			flex: 1 0 48%;
		}

		.green__btn {
			margin-left: auto;
			width: 150px;
			font-size: 16px;
			letter-spacing: 1.5px;
		}

		label {
			flex: 1 0 48%;
			cursor: pointer;
			letter-spacing: 0.8px;
			padding: 10px;
			display: inline-block;
		}

		input {
			height: 0;
			width: 0;
			opacity: 0;
		}

		.shortline {
			cursor: pointer;
			background-color: #9d9d9d;
			display: inline-block;
			width: 30px;
			height: 10px;
			border-radius: 5px;
			position: relative;
			transition: all 0.2s ease-in-out;

			&.checked {
				background-color: $light1-color;

				.circle {
					background-color: $main-color;
					left: calc(100% - 15px);
					box-shadow: none;
				}
			}

			.circle {
				position: absolute;
				left: 0;
				top: -3px;
				display: inline-block;
				width: 15px;
				height: 15px;
				background-color: #fff;
				border-radius: 50%;
				transition: all 0.2s ease-in-out;
				-webkit-box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
				-moz-box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
				box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
			}
		}

	}
}

@media(max-width: 480px) {

	.create__users {
		.title {
			font-size: 20px;
			margin-bottom: 10px;
		}

		.container {
			background-color: transparent;
			margin-right: 15px;
			padding: 0;
			box-shadow: none;
		}
	}
}
</style>