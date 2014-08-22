/*
// Column layout module
// Requires jQuery 1.3.2
// http://code.google.com/js-columns/

js-columns is free software under the MIT License.

Copyright (c) 2010 Kenneth Kufluk

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// jQuery Plugin starts here
(function($) {
	jQuery.fn.columns = function(options) {
	    // Define default settings.
	    var options = $.extend({
	        paging:false,			/* paging makes sense for columns, to avoid the scroll-back-to-top effect */
	        minWidth:'40em',		/* we want columns to appear and disappear as required, not be a fixed num */
	        maxCols:10				/* to a limit */
	        /* planned interactions:  up/down is paging, click last column to page down, first column up */
	        /* option: page left/right instead of up/down? */
	    },options);

	    // Delayed Redraw to prevent too many events at once
	    var redrawWhenReady = function() {
	    	clearTimeout(this.redrawTimer);
	    	var el=this;
	    	this.redrawTimer = setTimeout(function() {
	    		el.redraw(true);
	    	}, 100);
	    }

	    // Adds the column divs to the container
	  	var addColumns = function($el, columnCount) {
	  		//add/remove divs as required
	    	var $colEls = $('.col',$el);
	    	if ($colEls.length==0) {
	    		$el.wrapInner('<div class="col"></div>');
	    		$colEls = $('.col', $el);
	    		//move the images out
	    		$('img',$el).insertBefore($colEls);
				$('img',$el).wrap('<div class="img"></div>');
	    	}
			$elCol = $($('.col',$el)[0]);
	    	if ($colEls.length>columnCount) {
				for (var i=$colEls.length;i>columnCount;i--) {
					$elCol.remove();
					$elCol = $($('.col',$el)[0]);
				}
	    	}
	    	if ($colEls.length<columnCount) {
				for (var i=$colEls.length;i<columnCount;i++) {
					$elCol.clone(true).insertAfter($elCol);
				}
	    	}
	  	}

	  	// returns a height, rounded to an integer multiple of the line height
	  	var heightAsRows = function(height, lineheight, roundup) {
	  		var roundFunc = (roundup)?Math.ceil:Math.floor;
	  		return roundFunc(height/lineheight) * lineheight;
	  	}

        // work out how many columns to span
		var getImgColspan = function(colCount) {
		    var colspan = colCount - 1;
			if (colspan<1) colspan=1;
			if (colspan>2) colspan=2;
			return colspan;
		}


	    // store values
	    var pages = [];
	    var offsetTopCache = [];
	    var currentPage = 0;

	    // layout module
	    // called by redraw or draw
	    var redraw = function(animate) {
	    	$el = $(this);

	    	//count the number of columns on a page
			var columnCount = Math.ceil(($el.width()/options.minWidthPX));
			columnCount = Math.min(columnCount, options.maxCols);

			//set properties of the column container
    		var lineHeight = parseFloat($('p',this).css('line-height'));
   	    	$el.css('position','relative');
	    	$el.css('overflow','hidden');
            if (columnCount<=1) {
       	    	$el.css('position','static');
       	    	$el.css('overflow','visible');
       	    	('.col',$el).css('position','static');
            }
			// the height of the container is the window height, minus our top offset, minus some footer
    		var availableHeight = Math.floor($(window).height() - $el.offset().top - 35);  //TODO - how to work out where to place the footer?  Maybe look at offsettop of the next element?
			// and then rounded to an integer multiple of the line height.
    		var pageHeight = heightAsRows(availableHeight, lineHeight, false);
    		$el.css('height', pageHeight+'px');

			//create a page if needed
			if (pages.length==0) {
				$el.wrapInner('<div class="col-page"></div>');
				var $page = $('.col-page',$el);
				pages[currentPage] = $page;
				offsetTopCache[currentPage] = 0;
			}

			//add columns
	    	addColumns(pages[currentPage], columnCount);

	    	// Set the percentage width of each column (they MUST be identical)
	    	var pcColWidth = 100/columnCount;
	    	$('.col',$el).css('width', (pcColWidth-2)+'%');

			// Make interstitial heights a round number of multiples of the line-height
			/*
			$('.interstitial', this).each(function(colindex){
				var interstitialHeight = heightAsRows($(this).height(), lineHeight, true);
				interstitialHeight-=2; // border;
				$(this).height(interstitialHeight+'px');
			});
			*/

			// Position the large image(s)
			$('.img',$el).each(function() {
                if (columnCount>1) {
    				$(this).css({
    				    position:'absolute',
    				    zIndex:1000,
    				    right:0
    				});
				} else {
    				$(this).css('position','static');
				}
				$(this).css('background','white');
				var colspan = getImgColspan(columnCount);
				$('img', this).width('100%');
				$(this).width((pcColWidth*colspan+1)+'%');
			});

			var offsetTop = 0;
	    	//scroll each column accordingly
	    	var scrollCols = function(animate) {
	    		// uses lineHeight, columnCount, offsetTopCache, pages, currentPage, offsetTop
		    	offsetTop = offsetTopCache[currentPage];
//		    	console.log('offsettop',offsetTop);
		    	var offsetLeft = 0;
		    	$('.col', pages[currentPage]).each(function(index){

					if (currentPage==0) {
						//offset the top of each column based on images at the top
						var equivalentLines = heightAsRows($('.img img',$el).height(), lineHeight, true);
						var colspan = getImgColspan(columnCount);
						if (columnCount-index<=colspan) offsetTop -= equivalentLines;
						$('.img',$el).css('height',equivalentLines+'px');
					}

		    		$(this).css('left', offsetLeft+'%');
		    		$(this).stop();

		    		if (animate) $(this).animate({top: '-'+offsetTop+'px'},500);
		    		else  $(this).css('top','-'+offsetTop+'px');
		    		offsetLeft += pcColWidth;
		    		offsetTop += pageHeight;
		    	});
	    	}
	    	scrollCols(animate);

    		// do paging
 		    var paging = function() {
				// remove existing actions
				$('.col-up, .col-down', $el).unbind('mouseenter').unbind('click').removeClass('col-up').removeClass('col-down');

		   		var pageTotalHeight = $('.col',$el).height();
		   		var imgColspan = getImgColspan(columnCount);
		   		var imgHeight = heightAsRows($('.img img',$el).height(), lineHeight, true);
		   		var imageContributionToOffsetTop = imgColspan * imgHeight;
		   		pageTotalHeight += imageContributionToOffsetTop;
				if (pageTotalHeight>offsetTop && columnCount>1) {
					// on last column click
					// scroll the columns up
					var lastColNo = columnCount - 1;
    			    //deal with the case where the image fills up the column completely
					if (currentPage==0 && imgHeight>=pageHeight) lastColNo = lastColNo - imgColspan;
					$('.col:eq('+lastColNo+')', pages[currentPage]).addClass('col-down');
				}

				if (currentPage>0) {
					// on first column click, scroll them down
					$('.col:first', pages[currentPage]).addClass('col-up');
				}

				//bind events if applicable
				// actual paging operations
				$('.col-down', $el).click(function() {
					// add page
					pages[currentPage].clone(true).insertAfter(pages[currentPage]);
					//hide old page
					pages[currentPage].animate( { left:'-'+$(window).width() }, 500, "linear", function() {
						$(this).css({left:'-5000px'});
					});
					currentPage++;
					var $page = $('.col-page:eq('+(currentPage)+')',$el);
					pages[currentPage] = $page;
					$('.img', pages[currentPage]).remove();
					// show new
					pages[currentPage].css('left',$(window).width());
					pages[currentPage].animate( { left:0 }, 500, "linear" );
					// add to cache
					offsetTopCache[currentPage] = offsetTop;

					$el[0].redraw(false);
				});
				$('.col-up', $el).click(function() {
					//hide old page
					pages[currentPage].animate( { left:$(window).width() }, 500, "linear", function() {
						$(this).remove();
					});
					currentPage--;
					// show new
					pages[currentPage].show();
					pages[currentPage].css({left:'-'+$(window).width()+'px'});
					pages[currentPage].animate( { left:0 }, 500, "linear" );

					$el[0].redraw(false);
				});
//				console.log('currentPage',currentPage);
				//TODO: ADD EXTRA CONDITION - when only one column, no paging. Use scrolling.

				$('.pageno').html((currentPage+1) + ' / ' + Math.ceil(pageTotalHeight/(pageHeight * columnCount)));
		    }

			paging();

	    }

	    return this.each(function() {

			// Convert min/max widths to pixels by creating a temporary div.
			var $tempEl=$('<div></div>');
			$('body').append($tempEl);
			$tempEl.width(options.minWidth);
			options.minWidthPX=$tempEl.width();
			$tempEl.remove();

			// on container resize
			var el = this;
	    	$(window).resize(function() {
	    		el.redrawWhenReady();
	    	});
	    	$('img', this).load(function() {
	    		el.redrawWhenReady();
	    	});
	    	this.redraw = redraw;
	    	this.redrawWhenReady = redrawWhenReady;
			// draw
	    	this.redraw(false);

	    });
	}
})(jQuery);
