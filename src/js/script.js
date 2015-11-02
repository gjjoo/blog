/**
 * @author JOO
 */
$(function() {

  // 스크롤시 메뉴 고정
  // $("#navigation").sticky({ topSpacing: 0 });

  // 모바일 메뉴 클릭 시
  $('.toggle-menu').on('click', function(e) {
    var $this = $(this);
    $this.toggleClass('active');
  });

  // 메뉴링크 클릭 시 페이지 로드
  $(document).on('click', '.menu a', function(e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    loadURL($this.attr('href'), $('#content'));

    $('.menu li').removeClass('active');
    $this.parent().addClass('active');

    $('.title').text( $this.text() );
    $('.toggle-menu').removeClass('active');

    function loadURL(url, container) {
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
    }
  });

});