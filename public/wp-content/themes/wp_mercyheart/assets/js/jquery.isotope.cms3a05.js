(function($){
    $(document).ready(function(){
       $('.cms-isotope-masonry-post').each(function(){
       		$this = $(this);
          $filter = $this.parent().find('.cms-grid-filter');
       		$this.imagesLoaded(function(){
       			$this.isotope({
		           itemSelector:'.cms-grid-item'
		       });
       		});
          $filter.find('a').click(function(e){
              e.preventDefault();
              $filter.find("a").removeClass('active');
              $(this).addClass('active');
              var data_filter = $(this).data('filter');
              $this.isotope({
                  filter: data_filter
              });
          });
       });  
    });
})(jQuery);