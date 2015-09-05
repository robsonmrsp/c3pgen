<div class="modal fade" id="myModal${firstUpper(entity.name)}" tabindex="-1" role="dialog" aria-labelledby="modal${firstUpper(entity.name)}s" aria-hidden="true" style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">${firstLower(entity.displayName)}</h4>
			</div>
			<div class="modal-body">
				<div class="container-fluid">
					<div id="messages"></div>
					<div class="row">
						<div id="sample-table-2_wrapper" class="dataTables_wrapper form-inline ">
							<div id="grid-${firstLower(entity.name)}s-modal" class="table-responsive"></div>
							<div class="">
								<div id="paginator-${firstLower(entity.name)}s-modal" class="pull-right"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal">Pronto</button>
			</div>
		</div>
	</div>
</div>