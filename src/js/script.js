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
    $('.menu').toggle();
  });

});