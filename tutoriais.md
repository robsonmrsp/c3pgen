# Radio group com apenas verdadeiro ou falso

A ideia é simples, o campo está ativo, inativo ou não tem nenhum estado.  

Alterações: 

1. Alterar o HTML 
```html
		<div id="groupInputEmiteNf" class="form-group  col-sm-2	col-md-2	col-lg-2">
			<label class="control-label" for="inputPercentualIss"> Emite nota fiscal</label>
			<span class="row radio-check-group">
				<label class="col-sm-6	col-md-6	col-lg-6">
					<input type="radio" class="ace input-lg" name="inputEmiteNf" {{emiteNf===true ? 'checked' :''}} value="true">
					<span class="label-text lbl ">Sim</span>
				</label>
				<label class="col-sm-6	col-md-6	col-lg-6">
					<input type="radio" class="ace input-lg" name="inputEmiteNf" {{emiteNf===false ? 'checked' :''}} value="false">
					<span class="label-text lbl ">Não</span>
				</label>
			</span>
		</div>
```

2. Alterar o javascript
 No ui, deveremos alterar o seletor do atributo.
de: 
```javascript
	inputEmiteNf : "#inputEmiteNf',
```
para:
```javascript
	inputEmiteNf : "input:radio[name ='inputEmiteNf']",
```

e no getModel:
de: 
```javascript
	emiteNf : util.escapeById('inputEmiteNf'),
```
para:
```javascript
	emiteNf : util.escapeByName('inputEmiteNf'),
```