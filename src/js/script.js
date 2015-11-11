/**
 * @author JOO
 */
$(function() {

  // 그리드 표시
  $(window).on('keydown', function(e) {
    var key = e.keyCode || e.which;
    if (key === 71 && e.shiftKey) {
      $('#wrap').toggleClass('grid');
    }
  });

  // 모바일 메뉴 클릭 시
  $('.toggle-menu').on('click', function(e) {
    var $this = $(this);
    $this.toggleClass('active');
  });

  // 초기 페이지 로딩
  loadURL('home.html', $('#content'), $('.menu li').eq(0).children());

  // 메뉴링크 클릭 시 페이지 로드
  $(document).on('click', 'a', function(e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    var href = $this.attr('href');
    if (href !== '#' && href.substring(0, 1) === '/') {
      loadURL($this.attr('href'), $('#content'), $this);
    }
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
        container.html('<h4 style="display:block; padding:50px 0; text-align:center"><i class="fa fa-warning"></i>페이지를 찾을 수 없습니다.</h4>');
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