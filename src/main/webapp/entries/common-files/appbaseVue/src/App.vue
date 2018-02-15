<template>
<div id="container"
	class="effect aside-float aside-bright navbar-fixed mainnav-fixed aside-fixed print-content mainnav-lg">
	<app-header> </app-header>
	<div class="boxed">
		<div id="content-container">
			<div class="main-content">
				<router-view></router-view>
			</div>
		</div>
		<app-sidebar> </app-sidebar>
	</div>
</div>
</template>

<script>
import Vue from "vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Header from "@/components/layout/Header.vue";

Vue.component("app-header", Header);
Vue.component("app-sidebar", Sidebar);

export default {
  name: "App"  
};
</script>

<style>
@import "/assets/css/app.css";
</style>
