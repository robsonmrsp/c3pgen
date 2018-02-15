<template>
<div >
	<div class="panel">
		<div class="panel-heading">
			<h3 class="panel-title">
				<i class="fa fa-search"></i>
				Pesquisa de Filme.
			</h3>
		</div>
		<div class="panel-body">
			<div id="messages_div"></div>
			<form id="formFilmeFilter">
				<div class="widget-main ">
					<div class="row pad-hor-7">
						<div class="col-xs-6">
							<a @click="create" class="btn btn-info">
								<i class="fa fa-plus-circle"></i>
								Novo Registro
							</a>
							&nbsp;
							<a @click="reset" class="btn btn-default ">Limpar</a>
						</div>
						<div class="col-sm-6">
							<div class="input-group">
								<input  type="text" v-model="datatableConfig.filterParameters.tituloOriginal" class=" form-control" placeholder="Pesquisar Filme por Título Original">
								<span id="query" class="input-group-btn ">
									<button type="button"  @click="paginate()" class="btn btn-default" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Pesquisando...">
										<span class="fa fa-search icon-on-right  "></span>
										Pesquisar
									</button>
								</span>
							</div>
							<div>
								<a @click="showAdvanceSearch = !showAdvanceSearch" > Pesquisa avançada... </a>
							</div>
						</div>
					</div>
				<collapse v-model="showAdvanceSearch">
					<div class="panel" >
							<div class="panel-heading">
								<h5 class="panel-title">Filtros avançados</h5>
							</div>
							<div class="panel-body">
								<!-- inicio dos registros-->
								<div id="groupInputTituloOriginal" class="form-group   ">
									<label class="control-label" for="inputTituloOriginal">Título</label>
									<input type="text" v-model="datatableConfig.filterParameters.tituloOriginal" placeholder="Pesquise pelo Título" class="form-control">
								</div>
								<div>
									<button type="button" @click="paginate()"  class="btn btn-info btn-sm search-button loading-button" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Pesquisando...">
										<i class="fa fa-search"></i>
										Pesquisar
									</button>
								</div>
							</div>
						</div>
				</collapse>
				</div>
			</form>
			<div class="center">
				<div class="">
					<div class="">
						<i v-if="!datatableConfig.loading" class="fa fa-align-justify"></i>
						<i v-if="datatableConfig.loading" class="fa fa-spinner fa-spin fa-fw"></i>
						Resultado da pesquisa
					</div>
					<table class="table table-striped table-bordered table-hover  no-footer  ">
						<thead>
							<tr>
								<th class="renderable nome">
									<a >
										<i class="fa" aria-hidden="true"></i>
										Titulo Original
									</a>
								</th>
								<th class="renderable descricao">
									<a >
										<i class="fa" aria-hidden="true"></i>
										Diretor
									</a>
								</th>
								<th class="renderable action-cell">Ações</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="filme in datatableConfig.items " :key="filme.id">
								<td>{{filme.tituloOriginal}}</td>
								<td>{{filme.diretor}}</td>
								<td class="td-actions action-butons-cell">
									<a href="javascript:void(-1)" class="btn btn-xs  btn-primary " @click="editFilme(filme)" data-toggle="tooltip" data-placement="top" title="" data-original-title="Editar Filme">
										<i class="fa fa-pencil fa-lg"></i>
									</a>
									<a href="javascript:void(-1)" class="btn btn-xs btn-danger " @click="removeFilme(filme)" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remover Filme">
										<i class="fa fa-trash fa-lg"></i>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="">
					<div class="col-md-6" style="text-align: left; margin: 15px 0">
						<div class=" float-left ">
							<span v-if="datatableConfig.loading" class="loading-elements">
								<span class="">
									<i v-if="datatableConfig.loading" class="fa fa-spinner fa-spin fa-fw"></i>
									Carregando...
								</span>
							</span>
							<span v-if="!datatableConfig.loading" class="has-elements" style="display: inline;">
								Registros
								<span class="initial-page">{{datatableConfig.first}}</span>
								a
								<span class="final-page">{{datatableConfig.last}}</span>
								de
								<span class="total-records">{{datatableConfig.totalRecords}}</span>
								. Exibindo até
								<select class="combo-page-size" v-on:change="paginate()" v-model="datatableConfig.pageSize"  style="padding: 0 0 0 0; height: 20px">
									<option value="3">3</option>
									<option value="5">5</option>
									<option value="10" >10</option>
									<option value="25">25</option>
									<option value="50">50</option>
								</select>
								por página.
							</span>
						</div>
					</div>
					<div class="">
					    <pagination v-model="datatableConfig.page" v-on:change="paginate" :total-page="datatableConfig.totalPages" align="right" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</template>
<script>
import DatatableConfig from "@/components/core/DatatableConfig";
import HttpRequest from "@/components/core/HttpRequest";

export default {
  created: function() {
    this.service = new HttpRequest("/rs/crud/filmes");
  },

  mounted: function() {
    this.paginate();
  },

  data: function() {
    return {
      showAdvanceSearch: false,
      datatableConfig: new DatatableConfig()
    };
  },

  methods: {
    create: function() {
      this.$router.push({ path: "/filmes/new/" });
    },

    editFilme: function(_filme) {
      this.$router.push({ path: "/filmes/edit/" + _filme.id });
    },

    reset: function() {
      this.datatableConfig = new DatatableConfig();
    },

    removeFilme: function(_filme) {
      console.log("removeFilme" + _filme);
    },

    paginate: function(pageIndex = 1) {
      this.datatableConfig.page = pageIndex;

      this.service.getPage(
        this.datatableConfig,
        data => {
          console.log("success fetching page");
        },

        error => {
          console.error("error fetching page", error);
        }
      );
    }
  }
};
</script> 
