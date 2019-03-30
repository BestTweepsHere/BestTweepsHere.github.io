$(document).ready(function() {

    //console.log(data);
       
    var profile_details = ""; 
   

    $.each(data, function(key, profile_value) {
        
       var handle_name  = profile_value['handle_name'];
       var display_name = profile_value['display_name'];
       var bio          = profile_value['bio'];
       //var location     = profile_value['location'];
       var profile_pic  = profile_value['profile_pic'];
       var category     = profile_value['category'];
       var website      = profile_value['website'];


       var category_details = category.split(",");

       //onerror="this.onerror=null;this.src=\'./image/bestoftt.png\'"

        profile_details +=  '<div data-w-id="38b9e8b8-0a9b-2cc4-92ad-1f22767dd9db" class="collection-item mix w-dyn-item">';
		profile_details +=	'<a href="'+handle_name+'" target="_blank" aria-hidden="true" class="image-link-block w-inline-block">';
        profile_details +=	'<div class="image-div">';
        profile_details +=  '<img src="'+profile_pic+'"  sizes="(max-width: 479px) 97vw, (max-width: 767px) 48vw, (max-width: 991px) 571.953125px, 28vw" srcset="'+profile_pic+' 500w, '+profile_pic+' 720w" class="image">';
		//profile_details +=	'<img alt=" " src="'+profile_pic+'" sizes="(max-width: 479px) 97vw, (max-width: 767px) 48vw, (max-width: 991px) 571.953125px, 28vw" srcset="'+profile_pic+' 500w, '+profile_pic+' 720w" class="image"/>';
		profile_details	+=  '</div>';
		profile_details	+=	'</a>';
		profile_details	+=	'<a href="'+handle_name+'" class="name-link">'+display_name+'</a>';
		profile_details	+=	'<div class="bio-text-block w-richtext">';
        profile_details	+=	'<p>'+bio+'</p>';
        profile_details	+=	'</div>';
        profile_details	+=	'<div class="occupations-div">';

        var flag = 0 ;

        $.each(category_details, function(key, category_value) {

            flag++;

            profile_details	+=	'<div class="category-trigger">'+category_value+'</div>';
        });

        if(flag != 5 && flag <= 5){

            for(var count =flag ; count <= flag; count++ ){

                profile_details	+= '<div class="category-trigger w-dyn-bind-empty"></div>';
            }
        }

        profile_details	+=	'</div>';
        profile_details	+=	'<div class="buttons-div">';

        // if(website != "-"){
        //     profile_details	+=	'<a href="'+website+'" target="_blank" class="button-bottom no-right-border w-button">Site</a>';
        // }

        profile_details	+=	'<a href="'+handle_name+'" target="_blank" class="button-bottom right-button w-button">Twitter</a>';
        profile_details	+=	'</div>';
		profile_details	+=	'</div>';

      });

      //console.log(profile_details);

      $("#target-container").html(profile_details);
     
      var slug = function(str) {
        var $slug = '';
        var trimmed = $.trim(str);
        $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
        replace(/-+/g, '-').
        replace(/^-|-$/g, '');
        return $slug.toLowerCase();
        }
    

      // Code#002: Add Classes to Collection List Items
  	$('.filter-list .w-dyn-item').each(function () {

        // The five Category Text Blocks
        var category1 = slug($(this).find('.category-inlay:nth-child(1)').text());
        var category2 = slug($(this).find('.category-inlay:nth-child(2)').text());
        var category3 = slug($(this).find('.category-inlay:nth-child(3)').text());	
        var category4 = slug($(this).find('.category-inlay:nth-child(4)').text());
        var category5 = slug($(this).find('.category-inlay:nth-child(5)').text());


        $(this).addClass(category1);
        $(this).addClass(category2);
        $(this).addClass(category3);
        $(this).addClass(category4);
        $(this).addClass(category5);
    });


    $('.filter-item').click(function(){
      
        var navigationCategory = slug($(this).text());
         $('#filter-list .w-dyn-item').delay(500).css('display', 'none');
       $('.' + navigationCategory).delay(500).css('display', 'block');
     
         $('.filter-item').removeClass('filter-active');
         $(this).addClass('filter-active');
   });
 
 
    // Code#004: Show All
    $('.filter-item:first-child').click(function(){
    
        $('#filter-list .w-dyn-item').delay(500).css('display', 'block');

    });
 
    // Code#005: Set Active for Category "All"
    $('.filter-item:first-child').addClass('filter-active');

 

    // Reusable function to convert any string/text to css-friendly format
    var conv = function (str) {
        if (!str) {
            str = 'empty';
            }
        return str.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
                .replace(/ /g, "-")
                .toLowerCase()
                .trim();
    }; 

    // Creating dynamic elements classes from its categories:
    var catArray = document.querySelectorAll('.w-dyn-item .category-trigger');
    catArray.forEach( function(elem) {
        var text = elem.innerText || elem.innerContent;
        var className = conv(text);
        if (!isNaN(parseInt(className.charAt(0), 10))) {
            className = ("_" + className);
            }
        elem.parentElement.parentElement.classList.add(className);
    });
    
    // Move all items to one container
    var moveItems = document.querySelectorAll('.move-up');
    moveItems.forEach( function(move) {
        document.getElementById('target-container').appendChild(move);
    });
    
    var containerEl = document.querySelector('.filter-list');
    var checkboxGroup = document.querySelector('.left-nav-div');
    var checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach( function(elem) {
        var dataValue = conv(elem.getAttribute("data-value"));
        if (!isNaN(parseInt(dataValue.charAt(0), 10))) {
                dataValue = ("_" + dataValue);
                }
        elem.setAttribute('value', '.' + dataValue);
    });
    var allCheckbox = document.querySelector('.clear');
    allCheckbox.setAttribute('value', 'all');
    var mixer = mixitup(containerEl, {
        load: {
            sort: 'random'
        }
    });
  
 
    checkboxGroup.addEventListener('change', function(e) {

        var selectors = [];
        var checkbox;
        var i;
        if (e.target === allCheckbox && e.target.checked) {
        for (i = 0; i < checkboxes.length; i++) {
            checkbox = checkboxes[i];
            if (checkbox !== allCheckbox) checkbox.checked = false;
        }
        } else {
            allCheckbox.checked = false;
        }
        for (i = 0; i < checkboxes.length; i++) {
        checkbox = checkboxes[i];
        
            if (checkbox.checked) selectors.push(checkbox.value);
        }
        
        var selectorString = selectors.length > 0 ?
        selectors.join(',') :  'all';
        mixer.filter(selectorString);

    });

  
    /*$('img').error(function(){

        console.log("enter");

        $(this).attr('src', './image/bestoftt.png');
    });*/

});


$(".change_language").click(function(){ 

    window.location = "english.html";

});
