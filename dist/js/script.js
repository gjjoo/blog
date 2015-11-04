/**
 * @author JOO
 * 이미지 슬라이더 플러그인
 */
(function($){
  var defaults = {
    period : 400
  };

  $.fn.carousel = function(options) {
    var opt = $.extend({}, defaults, options);
    var self = this;

    self.find('li').appendTo(self.find('ul'));

    self
      .data('currentIndex', 0)
      .on('move', function(event, step){
        clearTimeout(self.data('timer'));

        // 애니메이션 도중이면 사용자 입력을 무시한다.
        if (self.find('li:first').is(':animated')) {
          return;
        }

        var currentIndex = self.data('currentIndex');
        currentIndex = currentIndex + step;

        var maxIndex = self.find('li').length - 1;

        if (step < 0 && currentIndex < 0) {
          currentIndex =  maxIndex;
        } else if (step > 0 && currentIndex > maxIndex ) {
          currentIndex = 0;
        }

        self
          .data('currentIndex', currentIndex)
          .find('li:first').animate(
            {'margin-left': -currentIndex*self.width()},
            opt.period,
            function(){
              if (!self.data('entered')) {
                self.trigger('mouseleave');
              }
            }
          );
      })
      .on('click', '.prev', function(event){
        event.preventDefault();
        self.trigger('move', [-1]);
        console.log(self.width());
      })
      .on('click', '.next', function(event){
        event.preventDefault();
        self.trigger('move', [1]);
        console.log(self.width());
      })
      .on('click', '.stop', function(event){
        clearTimeout(self.data('timer'));
        self.data('entered', true);
      })
      .on('mouseleave', function(event){
        var timer = setTimeout(function(){
          self.trigger('move', [1]);
        }, 1000);

        self.data('timer', timer);
        self.data('entered', false);
      })
      .trigger('mouseleave');
  };
})(window.jQuery);
/**
 * @author JOO
 */
$(function() {

  // 모바일 메뉴 클릭 시
  $('.toggle-menu').on('click', function(e) {
    var $this = $(this);
    $this.toggleClass('active');
  });

  // 초기 페이지 로딩
  loadURL('home.html', $('#content'), $('.menu li').eq(0).children());

  // 메뉴링크 클릭 시 페이지 로드
  $(document).on('click', '.menu a', function(e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    loadURL($this.attr('href'), $('#content'), $this);
  });

  function loadURL(url, container, item) {
    // 페이지 호출
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'html',
      cache: true,
      beforeSend: function() {
        // console.log('beforeSend');
        container.html('<h1><i class="fa fa-cog fa-spin"></i>로딩중..</h1>');

        if (container[0] === $("#content")[0]) {
          $("html").animate({
            scrollTop: 0
          }, "fast");
        }
      },
      complete: function() {
        // console.log('complete');
      },
      success: function(data) {
        // console.log('success');
        container.css({
          opacity: '0.0'
        }).delay(500).html(data).animate({
          opacity: '1.0'
        }, 300);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        // console.log('error');
        container.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning"></i>페이지를 찾을 수 없습니다.</h4>');
      },
      async: false
    });

    // 부모 li요소에 'active' 클래스 추가(외 다른 li요소에서는 제거)
    $('.menu li').removeClass('active');
    item.parent().addClass('active');

    // 모바일용 메뉴 타이틀 표시
    $('.title').text( item.text() );
    $('.toggle-menu').removeClass('active');
  }

});