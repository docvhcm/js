jQuery.get('/data/locations.json', function(data){
	var $select = $('#<?=$namespace?>locations');
	var locations = [];
	$.each(data, function(i, province){
		$.each(province.districts, function(k, district){
			locations.push({
				id: province.id + '.' + district.id,
				text: '<?=Html::beginTag('div', ['class' => 'strong'])?>' + district.text + '<?=Html::beginTag('p', ['class' => 'small'])?>' + province.text + '<?=Html::endTag('div')?>'
			});
		});
	});
	$select.select2({
		placeholder: '<?=Yii::t('yii', 'district')?>',
		data: locations,
		templateResult: function(item) {
			if(!item.id) {
				return item.text;
			}
			return $(item.text);
		},
		templateSelection: function(item) {
			var $item = $(item.text);
			$p = $item.find('p');
			var text = $p.text();
			$p.replaceWith(' - ' + text);
			return $item;
		}
	});
});