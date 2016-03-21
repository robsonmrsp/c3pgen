<div class="panel panel-default plain toggle ">
	<div class="panel-heading">
		<span class="panel-title">
			<span class="pull-left"> ${firstUpper(entity.displayName)}s &nbsp;&nbsp;&nbsp;</span>
		</span>
		<span>
			<a href="#myModal${firstUpper(entity.name)}" class="btn btn-info btn-xs" data-toggle="modal">
				<i class="fa  fa-plus-square">&nbsp;&nbsp;Add/Remove ${firstUpper(entity.displayName)}</i>
			</a>
		</span>
		<div class="panel-controls panel-controls-hide" style="display: none;">
			<a href="javascript:void(-1)" class="toggle panel-minimize">
				<i class="im-minus"></i>
			</a>
		</div>
	</div>
	<div class="panel-body" style="border: none">
		<div id="gridMultiselect${firstUpper(entity.name)}s" class="table-responsive"></div>
	</div>
</div>
<div id='modalMultiSelect${firstUpper(entity.name)}s'></div>