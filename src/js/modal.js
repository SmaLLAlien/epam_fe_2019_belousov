(function ($) {
  const modalObj = {
    createModal(type, title, buttons) {
      this.modalDiv = $('<div class="modal"></div>');
      const modalClose = $('<span class="modal__close">&times;</span>');
      this.modalDiv.append(modalClose);
      const modalContent = $('<div class="modal__content"></div>');
      const modalBody = $(`<div class="modal__body">${title}</div>`);
      const modalFooter = $('<div class="modal__footer"></div>');
      modalContent.append(modalBody);
      modalContent.append(modalFooter);
      this.modalDiv.append(modalContent);

      switch (type) {
        case 'error': modalBody.addClass('modal__body--error');
          break;
        case 'success': modalBody.addClass('modal__body--success');
          break;
      }

      $(buttons).each((index, value) => {
        const btn = $(`<button type="button" class="modal__btn">${value}</button>`);
        btn.addClass(`modal__btn-${value}`);
        modalFooter.append(btn);
      });

      this.buildMarkUp(this.modalDiv);
    },
    buildMarkUp(content) {
      this.wrapperModal = $('<div class="modal-wrapper"> </div>');
      this.wrapperModal.append(content);

      const body = $('body');
      body.append(this.wrapperModal);
      body.addClass('modalOpen'); // prevent opening two modal
      body.css('overflow', 'hidden'); // stop scroll
      const scrollTop = $(window).scrollTop();
      this.wrapperModal.animate({top: `${scrollTop}`});
      $('.wrapper').css('filter', 'blur(5px)');

      this.eventsHandler();
    },
    closeModal() {
      const self = this;
      this.modalDiv.slideUp(200, () => {
        self.wrapperModal.off('click');
        self.wrapperModal.remove();
        $('.wrapper').css('filter', 'blur(0px)');
        $('body').css('overflow', 'auto'); // allow scroll
        $('body').removeClass('modalOpen');
      });
    },
    confirmed() {
      // eslint-disable-next-line no-console
      console.log('Approved');
      this.closeModal();
    },
    canceled() {
      // eslint-disable-next-line no-console
      console.log('Canceled');
      this.closeModal();
    },
    escClose(event) {
      if (event.key === 'Escape') {
        this.closeModal();
        $(document).off('keyup', $.proxy(this.escClose, this));
      }
    },
    eventsHandler() {
      this.wrapperModal.on('click', 'span.modal__close', this.closeModal.bind(this));
      const self = this;
      this.wrapperModal.click(function (event) { // click only on modal wrapper
        const div = event.target;
        if (div === this) {
          self.closeModal();
        }
      });
      $(document).on('keyup', $.proxy(this.escClose, this));

      if ($('.modal__btn-cancel').length >= 1) {
        this.wrapperModal.on('click', 'button.modal__btn-cancel', this.canceled.bind(this));
      }
      if ($('.modal__btn-ok').length >= 1) {
        this.wrapperModal.on('click', 'button.modal__btn-ok', this.confirmed.bind(this));
      }
    },

  };

  $.fn.modal = function (type, title, buttons) {
    if (!$('body').hasClass('modalOpen')) {
      modalObj.createModal(type, title, buttons);
    }
  };
// eslint-disable-next-line no-undef
})(jQuery);
