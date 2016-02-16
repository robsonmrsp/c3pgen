define([ 'backgrid', 'backbonePaginator' ], function(Backgrid) {

	// Por algum motivo que eu preciso ainda descobrir ao executar o arquivo
	// referente ao backbonePaginator, o Backgrid é ajustado e recebe os novos
	// "métodos e objetos."
	// Acho que vale a pena fazer o mesmo para o jquery, ou seja, uma especie de
	// jqeury adapter;
	// Backgrid.Extension.Paginator = Paginator;

	return Backgrid;
});