<template>
	<section class="categories">
		<div class="container">
			<div class="categories__inner">
				<div class="buttons">
					<button @click="categoryCreate" class="btn"><i class="fa fa-plus" aria-hidden="true"></i>Create</button>
					<button class="btn"><i class="fa fa-download" aria-hidden="true"></i>Export</button>

				</div>
				<loading v-if="categoryLoading" />
				<div v-if="!categoryLoading" class="tables">
					<div v-for="category in categories" :id="category.id" class="card">
						<div class="img-box">
							<img :src="category.image" :alt="category.name">
						</div>
						<div class="info">
							<span class="title">{{ category.name }}</span>
							<div class="btns">
								<a @click="productPage(category.id)" class="products"><i class="fa fa-table"
										aria-hidden="true"></i> Products</a>
								<a @click.prevent="categoryDetail(category.id)" class="edit"><i class="fa fa-pencil"
										aria-hidden="true"></i> Edit</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<category-detail v-if="categoryDetailShow" class="category-detail" @close="categoryDetailToggle" />
			<category-create v-if="categoryCreateShow" class="category-detail" @close="categoryCreateToggle" />
		</div>
	</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { setItem, getItem } from '@/helpers/localStorage';
export default {
	data() {
		return {
			categoryDetailShow: false,
			categoryCreateShow: false
		}
	},
	computed: {
		...mapState({
			categories: state => state.category.categories,
			categoryLoading: state => state.category.isLoading
		})
	},
	methods: {
		categoryDetailToggle(item) {
			this.categoryDetailShow = item
		},
		categoryCreateToggle(item) {
			this.categoryCreateShow = item
		},
		categoryDetail(id) {
			this.categoryDetailToggle(true)
			this.$store.dispatch('category/getCategoryById', id)
		},
		categoryCreate() {
			this.categoryCreateShow = true
		},
		productPage(id) {
			const filters = getItem('product-filters');
			filters[5].show = true;
			filters[5].source = id;
			setItem('product-filters', filters)
			this.$router.push({ path: '/products', query: { page: 1, limit: 10 } })
		}
	},
	created() {
		this.$store.dispatch('category/getCategory')
	}
}
</script>

<style lang="scss" scoped>
.categories {
	position: relative;

	.category-detail {
		background-color: #fff;
		width: 500px;
		position: fixed;
		z-index: 99;
		top: 0;
		right: 0;
		bottom: 0;
		height: 100vh;
		border-left: 1px solid #9d9d9d;
		padding: 100px 0 50px;
		overflow-y: auto;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10px;

		.btn {
			border-radius: 15px;
			padding: 10px 15px;
			color: $main-color;
			font-size: 16px;
			font-weight: 500;
			background-color: transparent;
			cursor: pointer;
			text-transform: uppercase;
			transition: all 0.5s ease-in-out;

			&:hover {
				background-color: $light-color;
			}

			i {
				margin-right: 10px;
			}
		}
	}

	.tables {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		//grid-template-columns: auto auto auto auto;

		gap: 10px;

		.card {
			border: 1px solid #9d9d9d;
			border-radius: 10px;

			.img-box {
				width: 100%;
				border: 1px solid #C6C6C6;
				height: 150px;
				border-radius: 10px;
				background-image: url(@/assets/images/card__bg.svg);
				background-position: center;
				background-repeat: no-repeat;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: all 0.3s ease-in-out;

					&:hover {
						transform: scale(1.05);
					}
				}
			}

			.info {
				padding: 10px;

				.title {
					font-size: 22px;
					text-transform: capitalize;
					text-align: center;
					display: block;
					margin: 10px 0;
				}

				.btns {
					display: flex;
					justify-content: space-between;

					a {
						padding: 10px;
						display: inline-block;
						font-size: 14px;
						text-transform: uppercase;
						border-radius: 10px;
						transition: all 0.3s ease-in-out;
						color: $main-color;
						cursor: pointer;

						&:hover {
							background-color: $light2-color;
						}

						i {
							margin-right: 5px;
						}
					}
				}
			}
		}
	}
}

@media(max-width:820px) {
	.categories {
		.category-detail {
			width: calc(100% - 60px);
			padding-top: 80px;
		}


	}
}

@media(max-width:530px) {
	.categories {
		.container {
			box-shadow: none;
			background-color: transparent;
			padding: 0;
			margin-right: 10px;
		}


	}
}

@media(max-width:380px) {
	.categories {
		.category-detail {
			width: 100%;
		}
	}
}
</style>