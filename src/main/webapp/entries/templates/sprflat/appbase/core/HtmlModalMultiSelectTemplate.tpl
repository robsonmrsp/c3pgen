<div aria-hidden="true" aria-labelledby="modal${firstUpper(entity.name)}s" role="dialog" tabindex="-1" id="myModal${firstUpper(entity.name)}" class="modal fade" style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
				<h4 class="modal-title">${entity.displayName}</h4>
			</div>
			<div class="modal-body">
				<div id="messages"></div>
						<div>
							<div id="sample-table-2_wrapper" class="dataTables_wrapper form-inline no-footer">

								<div id="grid-${firstLower(entity.name)}s-modal" class="table-responsive"></div>
								<div class="row">
									<div id="paginator-${firstLower(entity.name)}s-modal" class="pull-right"></div>
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
