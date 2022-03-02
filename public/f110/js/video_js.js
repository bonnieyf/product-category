const player = new Plyr('#player');
var instance = OverlayScrollbars(document.querySelector('#side-menu-box'), {className : "os-theme-dark" });

$(function(){
    $('.menu-button').click(function(e){
        console.log('click')
        e.preventDefault();
        let menu = $('.main-box');
        let contentBox = menu.find('.container-inner');
        if(contentBox.hasClass('move')){
            contentBox.removeClass('move');
            menu.removeClass('showmenu');
        }else{
            contentBox.addClass('move');
            menu.addClass('showmenu');
        }

    });

    $('.sub-menu__nav li,.slide-menu-link').click(function(e){
        e.preventDefault();
        let url =  $(this).attr('data-url');
        console.log('click url:'+url);
        $('.sub-menu__nav li.active').removeClass('active');
        $(this).addClass('active');
        player.source = {
            type:'video',
            sources:[{
                src: url,
                type: 'video/mp4',
            }]
        }

    });

    $('.sub-scroll').overlayScrollbars({ 
        className: 'os-theme-dark'
    });
});
