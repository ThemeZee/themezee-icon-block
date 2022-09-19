wp.domReady( function() {
	wp.blocks.registerBlockVariation(
	  'core/columns', {
		name: 'product-features',
		title: 'Produktfeatures',
		icon: 'cart',
		innerBlocks: [
		  ['core/column', {}, [
			['core/image'],
			['core/heading', { level: 3, placeholder: 'Feature Überschrift'} ],
			['core/paragraph', { placeholder: 'Feature Beschreibung'} ],
		  ]],
		  ['core/column', {}, [
			['core/image'],
			['core/heading', { level: 3, placeholder: 'Feature Überschrift'} ],
			['core/paragraph', { placeholder: 'Feature Beschreibung'} ],
		  ]],
		  ['core/column', {}, [
			['core/image'],
			['core/heading', { level: 3, placeholder: 'Feature Überschrift'} ],
			['core/paragraph', { placeholder: 'Feature Beschreibung'} ],
		  ]],
		],
	  }
	);
});
