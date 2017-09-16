jQuery(function(){
    jQuery("div#topic-adder, div#magazine-department-adder").remove(); //Removed add topic section, add department section
    
    //Only one topic can be selected at a time.
    jQuery(document).on('click', 'div#taxonomy-topic input:checkbox', function(){
        jQuery("div#taxonomy-topic input:checkbox").attr('checked', false);
        jQuery(this).attr('checked', true);
    })
    
    //only one category in Trike Daily will be selected
    jQuery(document).on('click', 'div#taxonomy-category input:checkbox', function(){
        jQuery("div#taxonomy-category input:checkbox").attr('checked', false);
        jQuery(this).attr('checked', true);
    });
    
    jQuery(document).on('click', 'div#taxonomy-magazine-department .children input:checkbox',function(){
        //parent child relation managed in magazine department taxonomies
        jQuery("div#taxonomy-magazine-department input:checkbox").attr('checked', false);
        jQuery(this).attr('checked', true);
        var parent_child = jQuery.parseJSON(jQuery("#uniparent").val());
        value = jQuery(this).val();
        var parentId = parent_child[value];
        setTimeout(function(){
            jQuery("label.selectit #in-magazine-department-"+parentId).attr('checked', true);
        },100);
        
    });
    jQuery(document).on('click', 'div#taxonomy-magazine-department input:checkbox',function(){
        //just to check single parent in magazine department taxonomy
        jQuery("div#taxonomy-magazine-department input:checkbox").attr('checked', false);
        jQuery(this).attr('checked', true);
    });
    
    });